import { GetGoogleAuth } from "@/components/authentication/core/authentication.service";
import { idTokenAtom } from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import { FRONT_END_BASE_URL } from "@/lib/axios/consts";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const OauthRedirectPage = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const { dictionary } = useContext(LanguageContext);

  const [, setIdToken] = useRecoilState(idTokenAtom);

  const { data } = useAxios({
    fetchFn: GetGoogleAuth,
    paramsOfFetch: {
      code: queryParameters.get("code"),
      grant_type: "authorization_code",
      redirect_uri: `${FRONT_END_BASE_URL}${PagesURL.OAUTH2_REDIRECT}`,
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (data) {
      setIdToken(data.id_token);
      location.href = `${FRONT_END_BASE_URL}${PagesURL.DASHBOARD}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div>{dictionary.Redirecting}</div>;
};
