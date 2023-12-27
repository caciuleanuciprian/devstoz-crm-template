import { isAuthenticatedAtom } from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState<boolean>(isAuthenticatedAtom);

  // Should be refactored to check if auth cookie is present and not only if localstorage has true property

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PagesURL.DASHBOARD);
    } else {
      navigate(PagesURL.AUTHENTICATION);
    }
  }, []);

  return <>{!isAuthenticated ? null : children}</>;
};

export default AuthGuard;
