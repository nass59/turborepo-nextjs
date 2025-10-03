import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@workspace/design-system/components/ui/button';

export const SiteHeaderAuth = () => (
  <ul
    aria-label="Authentication buttons"
    className="flex w-max shrink-0 items-center divide-x px-4"
    data-a11y="authentication-buttons"
  >
    <li>
      <SignedOut>
        <div className="flex gap-2">
          <SignUpButton>
            <Button size="sm" variant="outline">
              Sign up
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button size="sm">Sign in</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </li>
    <li>
      <SignedIn>
        <p>TODO</p>
      </SignedIn>
    </li>
  </ul>
);
