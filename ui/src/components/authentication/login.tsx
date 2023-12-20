import LoginForm from "./login-form";
import AuthBackground from "./auth-background";
import AuthButton from "./auth-button";
import { AuthState } from "@/constants/authentication/types";

const Login = () => {
  return (
    <div className="animate-fade-in container relative hidden h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthButton label={AuthState.LOGIN} linkTo={AuthState.REGISTER} />
      <LoginForm />
      <AuthBackground />
    </div>
  );
};

export default Login;
