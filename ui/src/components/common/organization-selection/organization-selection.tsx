import { useRecoilState } from "recoil";
import { Loader } from "../loader";
import {
  selectedOrganizationAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import useAxios from "@/lib/axios/useAxios";
import { GetUserOrganizations } from "@/components/authentication/core/authentication.service";
import { useContext, useEffect } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { useNavigate } from "react-router-dom";
import { PagesURL } from "@/components/authentication/utils/consts";
import { AxiosStatusCode } from "@/lib/axios/helpers";

export const OrganizationSelection = () => {
  const [userDetails] = useRecoilState(userDetailsAtom);
  const [, setSelectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const { dictionary } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleSelectOrganization = (organization: any) => {
    setSelectedOrganization(organization);
    navigate(PagesURL.DASHBOARD);
  };

  const { data, error, isLoading } = useAxios({
    fetchFn: GetUserOrganizations,
    paramsOfFetch: {
      userId: userDetails?.id,
    },
    loadOnMount: true,
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {isLoading && (
        <div className="flex flex-col">
          <Loader />
          <p>{dictionary.LoadingOrganizations}</p>
        </div>
      )}
      {error && <div>Error</div>}
      {data && data.length > 0 && !isLoading && (
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {data.map((organization: any) => (
            <div
              key={organization.id}
              className="bg-secondary text-2xl w-60 h-60 flex justify-center items-center rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:shadow-xl"
              onClick={() => handleSelectOrganization(organization)}
            >
              <p>{organization.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
