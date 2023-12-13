import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Mail, MoreHorizontal, Trash } from "lucide-react";
import Dropdown from "../dropdown";
import { Client, ClientAddress } from "@/constants/clients/types";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const obj: ClientAddress = row.getValue("address");
      return <div>{`${obj.street}, ${obj.number}`}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="text-right">
          <Dropdown
            icon={<MoreHorizontal />}
            menus={[
              {
                label: "Actions",
                items: [
                  { name: "View", icon: <ArrowRight /> },
                  {
                    name: "Send email",
                    icon: <Mail />,
                    separator: true,
                  },
                  { name: "Delete", icon: <Trash /> },
                ],
              },
            ]}
          />
        </div>
      );
    },
  },
];
