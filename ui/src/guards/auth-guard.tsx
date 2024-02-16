import {
  idTokenAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Loader } from "@/components/common/loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const [idToken] = useRecoilState(idTokenAtom);
  const [, setUserDetails] = useRecoilState(userDetailsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!idToken) {
      setUserDetails(null);
      navigate(PagesURL.AUTHENTICATION);
    }
  }, []);

  return (
    <>
      {!idToken ? (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
          <Loader />
          <p>Loading Authenticated User</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthGuard;
