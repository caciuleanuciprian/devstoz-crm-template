import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LanguageSelector from "@/components/settings/atoms/language-selector";
import { Header } from "../common/header/header";
import { LanguageContext } from "@/i18n/language-context";
import { SettingsOrganizationDetails } from "./molecules/settings-organization-details";
import { SettingsOrganizationLogo } from "./molecules/settings-organization-logo";
import { SettingsMembersSection } from "./molecules/settings-members-section";
import { Slot } from "./atoms/slot";

const Settings = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.SETTINGS);
  }, []);

  return (
    <div className="px-8 pb-4">
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
