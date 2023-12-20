import Login from "@/components/authentication/login";
import Register from "@/components/authentication/register";
import { AuthState } from "@/constants/authentication/types";
import { authStateAtom } from "@/lib/recoil/authentication.recoil";
import { useRecoilState } from "recoil";

export default function Authentication() {
  const [authState, stateAuthState] = useRecoilState<AuthState>(authStateAtom);

  const renderAuthState = () => {
    return authState === AuthState.REGISTER ? <Register /> : <Login />;
  };
  return <>{renderAuthState()}</>;
}
