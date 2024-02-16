import { GetUserOrganizations } from "@/components/authentication/core/authentication.service";
import {
  idTokenAtom,
  selectedOrganizationAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Loader } from "@/components/common/loader";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { FRONT_END_BASE_URL } from "@/lib/axios/consts";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const InitialSettingsGuard = ({ children }: any) => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [idToken, setIdToken] = useRecoilState(idTokenAtom);
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    selectedOrganizationAtom
  );
  const { dictionary } = useContext(LanguageContext);

  const { data, loadData, error, dataCode } = useAxios({
    fetchFn: GetUserOrganizations,
    paramsOfFetch: {
      userId: userDetails?.id,
    },
  });

  useEffect(() => {
    if (idToken && userDetails && !selectedOrganization) {
      loadData();
    }
  }, [idToken, userDetails, selectedOrganization]);

  useEffect(() => {
    if (data) {
      if (data.length < 1) {
        location.href = `${FRONT_END_BASE_URL}${PagesURL.INITIAL_SETTINGS}`;
      } else if (data.length > 1) {
        location.href = `${FRONT_END_BASE_URL}${PagesURL.ORGANIZATION_SELECTION}`;
      } else if (data.length === 1) {
        setSelectedOrganization(data[0]);
      }
    } else if (dataCode === AxiosStatusCode.CODE_401_UNAUTHORIZED || error) {
      location.href = `${FRONT_END_BASE_URL}${PagesURL.AUTHENTICATION}`;
      setIdToken(null);
      setUserDetails(null);
      setSelectedOrganization(null);
      toast({ title: dictionary.UserDetailsError, variant: "destructive" });
    }
  }, [data]);

  return (
    <>
      {!selectedOrganization ? (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
          <Loader />
          <p>Loading Initial Settings</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};
