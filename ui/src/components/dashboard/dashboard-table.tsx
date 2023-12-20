import { DataTable } from "./data-table";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/constants/clients/types";

interface DashboardTableProps {
  columns: ColumnDef<Client>[];
  data: Client[];
}

const DashboardTable = ({ columns, data }: DashboardTableProps) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardTable;
