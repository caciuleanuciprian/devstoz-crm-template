import Navigation from "@/components/navigation";
import SearchBar from "@/components/search-bar";
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
    <>
      <Navigation />
      <div>
        <SearchBar />
        <Table />
      </div>
    </>
  );
};

export default Clients;
