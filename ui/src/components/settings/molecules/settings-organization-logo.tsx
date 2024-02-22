import { UploadImage } from "@/components/common/settings/molecules/upload-image";
import { Slot } from "../atoms/slot";
import { organizationLogoAtom } from "../core/settings.recoil";
import { useRecoilState } from "recoil";
import { useContext, useEffect, useState } from "react";
import {
  selectedOrganizationAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import useAxios from "@/lib/axios/useAxios";
import { UpdateOrganizationLogo } from "../core/settings.service";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { LanguageContext } from "@/i18n/language-context";

interface SettingsOrganizationLogoProps {
  isReadonly: boolean;
}

export const SettingsOrganizationLogo = () => {
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const [userDetails] = useRecoilState(userDetailsAtom);
  const [file, setFile] = useRecoilState(organizationLogoAtom);
  const [isReadonly, setIsReadonly] = useState(true);
  const { dictionary } = useContext(LanguageContext);

  const {
    data: logoUpdateDate,
    loadData: logoUpdate,
    error: logoUpdateError,
    dataCode: logoUpdateDataCode,
    isLoading: logoUpdateIsLoading,
  } = useAxios({
    fetchFn: UpdateOrganizationLogo,
    paramsOfFetch: {
      userId: userDetails?.id,
      organizationId: selectedOrganization?.id,
    },
  });

  const handleUpdate = async () => {
    await logoUpdate();
  };

  const resetForm = () => {
    setFile(selectedOrganization?.logo);
    setIsReadonly(true);
  };

  useEffect(() => {
    if (selectedOrganization) {
      setFile(selectedOrganization.logo);
    }
  }, []);

  return (
    <Slot>
      <div className="col-span-4 bg-background p-4 rounded-md w-full h-full">
        <UploadImage isReadonly={true} file={file} setFile={setFile} />

        <div className="flex gap-4 justify-end mt-6">
          {isReadonly ? (
            <>
              <Button
                onClick={() => setIsReadonly(false)}
                variant={"outline"}
                disabled={logoUpdateIsLoading}
              >
                {dictionary.Edit}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={resetForm}
                variant={"outline"}
                disabled={logoUpdateIsLoading}
              >
                {dictionary.Cancel}
              </Button>
              <Button onClick={handleUpdate} disabled={logoUpdateIsLoading}>
                {logoUpdateIsLoading ? <Loader /> : dictionary.Submit}
              </Button>
            </>
          )}
        </div>
      </div>
    </Slot>
  );
};
