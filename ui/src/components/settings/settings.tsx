import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header/header";
import { LanguageContext } from "@/i18n/language-context";
import { SettingsOrganizationDetails } from "./molecules/settings-organization-details";
import { SettingsMembersSection } from "./molecules/settings-members-section";

const Settings = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.SETTINGS);
  }, []);

  return (
    <div className="px-4 md:px-8 pb-4">
      <Header title={dictionary.Settings} />
      <div className="flex flex-col gap-4 mt-4 ">
        <div className="flex gap-4 xs:flex-col">
          <SettingsOrganizationDetails />
          {/* <SettingsOrganizationLogo /> */}
        </div>
        <div className="flex w-full gap-4 xs:flex-col">
          <SettingsMembersSection />
        </div>
      </div>
    </div>
  );
};

export default Settings;
