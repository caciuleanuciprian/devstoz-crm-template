import DashboardHeader from "@/components/dashboard/molecules/dashboard-header";
import Page from "@/components/common/page";
import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import LanguageSelector from "@/components/settings/atoms/language-selector";

const Settings = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.SETTINGS);
  }, []);
  return (
    <>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Settings</div>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Settings;
