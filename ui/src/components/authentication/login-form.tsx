import { Link } from "react-router-dom";
import { UserLoginForm } from "@/components/forms/user-login-form";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

const LoginForm = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dictionary.SignIn}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dictionary.EnterEmailBelow}
          </p>
        </div>
        <UserLoginForm />
        <p className=" text-center text-sm text-muted-foreground">
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            {dictionary.ForgotPassword}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
