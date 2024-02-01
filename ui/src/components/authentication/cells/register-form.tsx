import { Link } from "react-router-dom";
import { UserRegisterForm } from "@/components/authentication/molecules/user-register-form";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";

const RegisterForm = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dictionary.CreateAnAccount}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dictionary.EnterEmailBelow}
          </p>
        </div>
        <UserRegisterForm />
        <p className="flex justify-center gap-4 text-center text-sm text-muted-foreground">
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            {dictionary.Tos}{" "}
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
  );
};
export default RegisterForm;
