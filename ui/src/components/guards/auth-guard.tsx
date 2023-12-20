import { isAuthenticatedAtom } from "@/lib/recoil/authentication.recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return <>{!isAuthenticated ? null : children}</>;
};

export default AuthGuard;
