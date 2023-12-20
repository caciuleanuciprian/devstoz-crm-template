import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { AuthState } from "@/constants/authentication/types";
import { authStateAtom } from "@/lib/recoil/authentication.recoil";

interface AuthButtonProps {
  label: string;
  linkTo: AuthState;
}
/**
 * AuthButton Props
 *
 * @param {string} label - The text on the button.
 * @param {AuthState} linkTo - The state in which the screen should transition to.
 */

const AuthButton = ({ label, linkTo }: AuthButtonProps) => {
  const [, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  return (
    <Button
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8 z-10"
      )}
      onClick={() => setAuthState(linkTo)}
    >
      {label}
    </Button>
  );
};

export default AuthButton;
