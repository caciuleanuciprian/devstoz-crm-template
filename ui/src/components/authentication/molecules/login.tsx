import LoginForm from "../cells/login-form";
import AuthBackground from "../atoms/auth-background";
import AuthButton from "../atoms/auth-button";
import { AuthState } from "@/components/authentication/utils/types";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

const Login = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="grid animate-fade-in container relative h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthButton state={AuthState.REGISTER} label={dictionary.Register} />
      <LoginForm />
      <AuthBackground />
    </div>
  );
};

export default Login;
