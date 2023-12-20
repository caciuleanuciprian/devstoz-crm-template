import { useRecoilState } from "recoil";
import { AuthState } from "@/constants/authentication/types";
import { authStateAtom } from "@/lib/recoil/authentication.recoil";
import AuthBackground from "./auth-background";
import RegisterForm from "./register-form";
import AuthButton from "./auth-button";

const Register = () => {
  const [, stateAuthState] = useRecoilState<AuthState>(authStateAtom);

  return (
    <div className="animate-fade-in container relative hidden h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthButton label={AuthState.REGISTER} linkTo={AuthState.LOGIN} />
      <AuthBackground />
      <RegisterForm />
    </div>
  );
};

export default Register;
