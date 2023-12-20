import Navigation from "@/components/navigation/navigation";
import Page from "@/components/ui-custom/page";
import SearchBar from "@/components/ui-custom/search-bar";
import { Table } from "@/components/ui/table";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Clients = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.CLIENTS);
  }, []);

  return (
    <Page>
      <SearchBar />
      <Table />
    </Page>
  );
};

export default Clients;
