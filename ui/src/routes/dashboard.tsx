import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import Page from "@/components/common/page";
import Dashboard from "@/components/dashboard/dashboard";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const DashboardPage = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <Page>
      <Dashboard />
    </Page>
  );
};

export default DashboardPage;
