import { AuthState } from "@/components/authentication/utils/types";
import AuthBackground from "../atoms/auth-background";
import RegisterForm from "../cells/register-form";
import AuthButton from "../atoms/auth-button";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";

const Register = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="grid animate-fade-in container relative h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthButton state={AuthState.LOGIN} label={dictionary.Login} />
      <AuthBackground />
      <RegisterForm />
    </div>
  );
};

export default Register;
