import { ClientsMockedData } from "@/constants/clients/clients";
import { Client } from "@/constants/clients/types";
import Pagination from "../pagination";
import TableDropDownMenu from "../table-dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";

const DashboardTable = () => {
  const tableHeader = [
    { name: "ID", className: "w-[100px]" },
    { name: "Name" },
    { name: "Address" },
    { name: "Phone" },
    { name: "Email" },
    { name: "", className: "w-[50px]" },
  ];
  return (
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
            <TableCell>{client.phone}</TableCell>
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
  );
};

export default DashboardTable;
