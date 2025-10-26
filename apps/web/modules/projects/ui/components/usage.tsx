"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@workspace/design-system/components/ui/button";
import { formatDuration, intervalToDuration } from "date-fns";
import { CrownIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
	points: number;
	msBeforeNext: number;
};

export const Usage = ({ points, msBeforeNext }: Props) => {
	const { has } = useAuth();
	const hasProAccess = has?.({ plan: "pro" });

	const resetTime = useMemo(() => {
		try {
			return formatDuration(
				intervalToDuration({
					start: new Date(),
					end: new Date(Date.now() + msBeforeNext),
				}),
				{ format: ["months", "days", "hours"] },
			);
		} catch {
			return "unknown";
		}
	}, [msBeforeNext]);

	return (
		<div className="rounded-t-xl border border-b-0 bg-background p-2.5">
			<div className="flex items-center gap-x-2">
				<div>
					<p className="text-sm">
						{points} {hasProAccess ? "" : "free"} credits remaining
					</p>
					<p className="text-muted-foreground text-xs">Resets in {resetTime}</p>
				</div>
				{!hasProAccess && (
					<Button asChild className="ml-auto" size="sm" variant="tertiary">
						<Link href="/pricing">
							<CrownIcon /> Upgrade
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
};
