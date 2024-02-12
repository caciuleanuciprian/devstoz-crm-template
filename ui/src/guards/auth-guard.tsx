import { idTokenAtom } from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const [idToken] = useRecoilState(idTokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!idToken) {
      navigate(PagesURL.AUTHENTICATION);
    }
  }, []);

  return <>{!idToken ? null : children}</>;
};

export default AuthGuard;
