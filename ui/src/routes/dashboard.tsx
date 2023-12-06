import Navigation from "@/components/navigation";
import SearchBar from "@/components/search-bar";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientsMockedData } from "@/constants/clients/clients";
import { Client } from "@/constants/clients/types";
import Pagination from "@/components/pagination";
import TableDropDownMenu from "@/components/table-dropdown-menu";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  const tableHeader = [
    { name: "ID", className: "w-[100px]" },
    { name: "Name" },
    { name: "Address" },
    { name: "Phone" },
    { name: "Email" },
    { name: "", className: "w-[50px]" },
  ];

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <>
      <Navigation />
      <div>
        {/* <SearchBar /> */}
        <div className="flex w-full h-full px-4 mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeader.map((header, index) => (
                  <TableHead
                    key={`${header.name}-${index}`}
                    className={header.className}
                  >
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ClientsMockedData.map((client: Client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{`${client.address.street}, ${client.address.number}`}</TableCell>
                  <TableCell>{client.phone}</TableCell>{" "}
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-right">
                    <TableDropDownMenu />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <Pagination />
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
