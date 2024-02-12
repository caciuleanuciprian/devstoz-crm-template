import { Link } from "react-router-dom";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface LoginFormProps {
  onClick: () => void;
}

const LoginForm = ({ onClick }: LoginFormProps) => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center gap-8 sm:w-[350px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dictionary.SignIn}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dictionary.SignInWithGoogleDescription}
          </p>
        </div>

        <div className="grid gap-4">
          <Button variant="outline" type="button" onClick={onClick}>
            <Icons.google className="mr-2 h-4 w-4" />
            {dictionary.SignInWith} {dictionary.Google}
          </Button>
          <p className="flex justify-center gap-4 text-center text-sm text-muted-foreground">
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              {dictionary.Tos}
            </Link>
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              {dictionary.Privacy}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
