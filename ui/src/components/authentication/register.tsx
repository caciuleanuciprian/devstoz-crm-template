import { AuthState } from "@/constants/authentication/types";
import AuthBackground from "./auth-background";
import RegisterForm from "./register-form";
import AuthButton from "./auth-button";
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
