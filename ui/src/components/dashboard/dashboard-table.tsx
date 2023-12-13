import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ClientsMockedData } from "@/constants/clients/clients";

const DashboardTable = () => {
  return (
    <div className="h-full">
      <DataTable columns={columns} data={ClientsMockedData} />
    </div>
  );
};

export default DashboardTable;
