import Page from "@/components/common/page";
import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import LanguageSelector from "@/components/settings/atoms/language-selector";
import { Header } from "../common/header";
import { LanguageContext } from "@/i18n/language-context";

const Settings = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);
  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.SETTINGS);
  }, []);
  return (
    <>
      <div className="h-full bg-secondary pr-4">
        <Header title={dictionary.Settings} />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Settings</div>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Settings;
