# Bug Manifest — Practice 4

## Bug 1: tRPC auth middleware silently skips authentication check

- **Category:** Security
- **Severity:** Critical
- **File:** apps/web/trpc/init.ts
- **Line:** ~21
- **Description:** The `isAuthed` middleware no longer throws `TRPCError({ code: "UNAUTHORIZED" })` when `ctx.clerkUserId` is null. Instead it falls through and sets `userId` to an empty string `""`. Any unauthenticated caller can invoke every `protectedProcedure` endpoint — they will just operate as if they are a user with an empty ID, which will silently return no data rather than rejecting the request. The security boundary is completely broken.
- **How to find it:** Read `trpc/init.ts` and notice the `isAuthed` middleware has no guard clause. Compare `protectedProcedure` definition — it uses `isAuthed` but `isAuthed` never throws. Also check that all tRPC procedures use `protectedProcedure` without any additional auth enforcement.
- **Fix:** Restore the guard inside `isAuthed`:
  ```ts
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User is not authenticated" });
  }
  return next({ ctx: { auth: { userId: ctx.clerkUserId } } });
  ```

---

## Bug 2: tRPC route exposed as a public route in Clerk middleware

- **Category:** Security
- **Severity:** High
- **File:** apps/web/middleware.ts
- **Line:** ~9
- **Description:** `/trpc(.*)` was added to the `isPublicRoute` matcher. Clerk's middleware will therefore never call `auth.protect()` on any tRPC request, meaning Clerk session validation is skipped at the edge for all tRPC traffic. Combined with Bug 1, this creates a completely open API surface. Even independently, it means Clerk's rate-limiting and bot-protection features do not apply to the tRPC endpoint.
- **How to find it:** Read `middleware.ts` and audit the `isPublicRoute` array. The tRPC adapter is already mounted at `/api/trpc` — which is already covered by the `/api(.*)` entry. A separate `/trpc(.*)` entry is redundant and suspicious. Check the `config.matcher` at the bottom — it explicitly includes `/(api|trpc)(.*)` for middleware to run, making the public-route bypass meaningful.
- **Fix:** Remove `"/trpc(.*)"` from the `isPublicRoute` array.

---

## Bug 3: User ID logged to console in usage utility (sensitive data leak)

- **Category:** Security
- **Severity:** Medium
- **File:** apps/web/modules/usage/utils/usage.ts
- **Line:** ~33
- **Description:** A `console.log` statement emits the authenticated user's Clerk `userId` on every credit consumption event. In production this surfaces in structured logs (e.g., Vercel, Datadog) where PII/internal identifiers should never appear in plaintext. This also violates SOC 2 / GDPR logging requirements.
- **How to find it:** Search for `console.log` in server-side utility files. The log line reads `[usage] consuming credits for user: ${userId}` — the userId is a Clerk internal identifier and qualifies as sensitive account data.
- **Fix:** Remove the `console.log` line entirely, or replace with a structured logger that redacts PII fields.

---

## Bug 4: Unbounded database query — no `take` limit on message history fetch

- **Category:** Performance
- **Severity:** High
- **File:** apps/web/inngest/functions.ts
- **Line:** ~51
- **Description:** The Inngest function that drives the AI code agent fetches all messages for a project with no `take` limit. A long-lived project could accumulate thousands of messages, causing this query to load the full history into memory on every agent run. This will spike database read latency, increase memory pressure in the Inngest worker, and eventually cause timeouts or OOM crashes under normal usage.
- **How to find it:** Look at `prisma.message.findMany` calls. The constant `MAX_MESSAGES_PER_QUERY = 10` is defined at the top of the file but is no longer used in the query — the `take` field was removed. The constant being defined but unused is the tell.
- **Fix:** Restore `take: MAX_MESSAGES_PER_QUERY` in the `findMany` call:
  ```ts
  const messages = await prisma.message.findMany({
    where: { projectId: event.data.projectId },
    orderBy: { createdAt: "desc" },
    take: MAX_MESSAGES_PER_QUERY,
  });
  ```

---

## Bug 5: N+1 query in `projects.getAll` tRPC procedure

- **Category:** Performance
- **Severity:** High
- **File:** apps/web/modules/projects/server/procedures.ts
- **Line:** ~35
- **Description:** `projects.getAll` fetches all projects for a user then issues one additional `prisma.message.findMany` query **per project** inside `Promise.all`. A user with 50 projects triggers 51 database round-trips per page load. This could be solved with a single join using `include: { messages: { take: 1, orderBy: { createdAt: "desc" } } }` directly in the initial query.
- **How to find it:** Look for `Promise.all` wrapping a `.map` that contains a `prisma.*` call — the classic N+1 pattern. Also note that `getMany` (the procedure right below) performs the same base query but without the N+1 overhead, suggesting `getAll` was separately and unnecessarily modified.
- **Fix:** Use Prisma's `include` to fetch the latest message in a single query:
  ```ts
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.project.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: { take: 1, orderBy: { createdAt: "desc" } },
      },
    });
  }),
  ```

---

## Bug 6: Missing error handling in `messages.create` — unhandled rate-limit rejection

- **Category:** Reliability
- **Severity:** High
- **File:** apps/web/modules/messages/server/procedures.ts
- **Line:** ~52
- **Description:** The try/catch around `consumeCredits()` was removed. When a user exceeds their usage quota, `rate-limiter-flexible` throws a `RateLimiterRes` error (not a standard `Error` instance). Without the catch block, this propagates as an unhandled internal server error instead of returning a proper `TOO_MANY_REQUESTS` tRPC response. The client receives a generic 500, cannot distinguish rate-limiting from other failures, and cannot display a meaningful message to the user.
- **How to find it:** Compare `messages/server/procedures.ts` with `projects/server/procedures.ts`. The `create` mutation in projects still has the try/catch around `consumeCredits()`, but messages does not — inconsistency between sibling files is a red flag. Also note `consumeCredits` is documented to throw on quota exhaustion.
- **Fix:** Wrap `consumeCredits()` in a try/catch matching the pattern in `projects/server/procedures.ts`:
  ```ts
  try {
    await consumeCredits();
  } catch (error) {
    if (error instanceof Error) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Something went wrong" });
    }
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "You have exceeded your usage limits." });
  }
  ```

---

## Bug 7: Zod input validation weakened on `projects.getOne` — empty string ID accepted

- **Category:** Reliability
- **Severity:** Medium
- **File:** apps/web/modules/projects/server/procedures.ts
- **Line:** ~13
- **Description:** The `.min(1, { message: "Id is required" })` constraint was removed from the `id` field in `projects.getOne`. An empty string `""` now passes validation and reaches `prisma.project.findUnique`. Prisma will execute a real database query with `WHERE id = ''`, find no result, and return a `NOT_FOUND` error — but the real problem is that the invalid input is never caught at the boundary. This could also be exploited to probe for timing differences or cause unexpected behavior in UUID-specific database indexes.
- **How to find it:** Compare validation schemas across procedures. `messages.getMany` validates `projectId` with `.min(1)`, `messages.create` validates both fields with `.min(1)`, but `projects.getOne` only uses `.string()` with no length constraint. The inconsistency stands out immediately in a cross-file review.
- **Fix:** Restore the minimum length constraint:
  ```ts
  id: z.string().min(1, { message: "Id is required" }),
  ```

---

## Bug 8: TypeScript `strict` mode disabled in base tsconfig

- **Category:** Developer Tooling
- **Severity:** High
- **File:** packages/typescript-config/base.json
- **Line:** ~17
- **Description:** `"strict": false` disables the entire TypeScript strict mode umbrella, which encompasses `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, and `noImplicitAny`. Without these, `null`/`undefined` are assignable to any type, implicit `any` parameters go unchecked, and an entire class of runtime errors become invisible to the compiler. The individual flags (`strictNullChecks`, `noImplicitAny`, etc.) listed below `strict` are redundant overrides — setting `strict: false` overrides them all to false regardless.
- **How to find it:** Open `packages/typescript-config/base.json`. The `strict` flag is the first thing to check in any TypeScript config audit. Note the contradiction: `strict: false` is set on line 17, but `strictNullChecks: true`, `noImplicitAny: true`, etc. are listed beneath it — these are overrides that would only matter if `strict` were not present. With `strict: false`, these individual flags are not automatically false, but the cognitive expectation that "strict is on" is violated at the umbrella level. Actually: individual `strictNullChecks: true` **does** re-enable that specific check even when `strict: false`. The deeper issue is that `strictFunctionTypes`, `strictBindCallApply`, and `strictPropertyInitialization` are silently disabled.
- **Fix:** Set `"strict": true` to restore the full strict umbrella.
