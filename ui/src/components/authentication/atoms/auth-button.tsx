import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { AuthState } from "@/components/authentication/utils/types";
import { authStateAtom } from "@/components/authentication/utils/authentication.recoil";

interface AuthButtonProps {
  state: AuthState;
  label: string;
}

const AuthButton = ({ state, label }: AuthButtonProps) => {
  const [, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  return (
    <Button
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8 z-10"
      )}
      onClick={() => setAuthState(state)}
    >
      {label}
    </Button>
  );
};

export default AuthButton;
