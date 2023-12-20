import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardTable from "@/components/dashboard/dashboard-table";
import Navigation from "@/components/navigation/navigation";
import Page from "@/components/ui-custom/page";
import Pagination from "@/components/table/pagination";
import SearchBar from "@/components/ui-custom/search-bar";
import { Table } from "@/components/ui/table";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import LanguageSelector from "@/components/settings/language-selector";

const Settings = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.SETTINGS);
  }, []);
  return (
    <Page>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Settings</div>
          <LanguageSelector />
        </div>
      </div>
    </Page>
  );
};

export default Settings;
