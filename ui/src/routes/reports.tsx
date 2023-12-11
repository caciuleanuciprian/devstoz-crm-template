import Navigation from "@/components/navigation";
import Page from "@/components/page";
import SearchBar from "@/components/search-bar";
import { Table } from "@/components/ui/table";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Reports = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.REPORTS);
  }, []);
  return (
    <Page>
      <SearchBar />
      <Table />
    </Page>
  );
};

export default Reports;
