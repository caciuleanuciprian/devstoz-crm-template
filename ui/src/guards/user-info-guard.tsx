import { GetUserByEmail } from "@/components/authentication/core/authentication.service";
import {
  idTokenAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Loader } from "@/components/common/loader";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const UserInfoGuard = ({ children }: any) => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [idToken, setIdToken] = useRecoilState(idTokenAtom);
  const { dictionary } = useContext(LanguageContext);
  const navigate = useNavigate();

  const { data, loadData, error, dataCode } = useAxios({
    fetchFn: GetUserByEmail,
    paramsOfFetch: {
      email: (jwtDecode(idToken as string) as { email: string }).email,
    },
  });

  useEffect(() => {
    if (idToken && !userDetails) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  useEffect(() => {
    if (data) {
      setUserDetails(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_401_UNAUTHORIZED || error) {
      navigate(PagesURL.AUTHENTICATION);
      toast({ title: dictionary.UserDetailsError, variant: "destructive" });
      setIdToken(null);
      setUserDetails(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCode, error]);

  return (
    <>
      {!userDetails ? (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
          <Loader />
          <p>{dictionary.LoadingUserDetails}</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};
