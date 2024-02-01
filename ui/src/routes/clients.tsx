import Clients from "@/components/clients/clients";
import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import Page from "@/components/common/page";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const ClientsPage = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.CLIENTS);
  }, []);

  return (
    <Page>
      <Clients />
    </Page>
  );
};

export default ClientsPage;
