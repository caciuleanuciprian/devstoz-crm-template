import SearchBar from "@/components/common/search-bar";
import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DashboardHeader from "../dashboard/molecules/dashboard-header";

const Clients = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.CLIENTS);
  }, []);

  return (
    <>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Clients</div>
        </div>
      </div>
    </>
  );
};

export default Clients;
