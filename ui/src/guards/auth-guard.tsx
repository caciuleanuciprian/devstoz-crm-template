import {
  idTokenAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Loader } from "@/components/common/loader";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const [idToken] = useRecoilState(idTokenAtom);
  const [, setUserDetails] = useRecoilState(userDetailsAtom);
  const navigate = useNavigate();
  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    if (!idToken) {
      setUserDetails(null);
      navigate(PagesURL.AUTHENTICATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!idToken ? (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
          <Loader />
          <p>{dictionary.LoadingAuthentication}</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthGuard;
