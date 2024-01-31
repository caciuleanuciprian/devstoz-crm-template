import Page from "@/components/common/page";
import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header";
import { LanguageContext } from "@/i18n/language-context";

const Reports = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.REPORTS);
  }, []);
  return (
    <>
      <div className="h-full bg-secondary pr-4">
        <Header title={dictionary.Reports} />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Reports</div>
        </div>
      </div>
    </>
  );
};

export default Reports;
