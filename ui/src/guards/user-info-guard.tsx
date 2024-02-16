import { GetUserByEmail } from "@/components/authentication/core/authentication.service";
import {
  idTokenAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Loader } from "@/components/common/loader";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { FRONT_END_BASE_URL } from "@/lib/axios/consts";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const UserInfoGuard = ({ children }: any) => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [idToken, setIdToken] = useRecoilState(idTokenAtom);
  const { dictionary } = useContext(LanguageContext);

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
  }, [idToken]);

  useEffect(() => {
    if (data) {
      setUserDetails(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_401_UNAUTHORIZED || error) {
      location.href = `${FRONT_END_BASE_URL}${PagesURL.AUTHENTICATION}`;
      setIdToken(null);
      setUserDetails(null);
      toast({ title: dictionary.UserDetailsError, variant: "destructive" });
    }
  }, [dataCode, error]);

  return (
    <>
      {!userDetails ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <Loader />
          <p>Loading User Info</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};