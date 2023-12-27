import Login from "@/components/authentication/molecules/login";
import Register from "@/components/authentication/molecules/register";
import { AuthState } from "@/components/authentication/utils/types";
import {
  authStateAtom,
  isAuthenticatedAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PagesURL } from "./utils/consts";

export default function Authentication() {
  const [authState] = useRecoilState<AuthState>(authStateAtom);
  const [isAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(PagesURL.DASHBOARD);
  });

  const renderAuthState = () => {
    return authState === AuthState.REGISTER ? <Register /> : <Login />;
  };
  return <>{renderAuthState()}</>;
}
