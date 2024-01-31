import { ClientForm } from "@/components/clients/molecules/client-form";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, Trash, ArrowRight } from "lucide-react";

export const renderColumnsWithTranslations = (dictionary: any) => {
  return [
    {
      accessorKey: "id",
      header: dictionary.ID,
    },
    {
      accessorKey: "name",
      header: dictionary.Name,
    },
    {
      accessorKey: "address",
      header: dictionary.Address,
    },
    {
      accessorKey: "phone",
      header: dictionary.Phone,
    },
    {
      accessorKey: "email",
      header: dictionary.Email,
    },
    {
      accessorKey: "type",
      header: dictionary.Type,
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const client = row.original;

        return (
          <div className="flex justify-end gap-1">
            <Modal
              trigger={
                <div className="flex">
                  <Button size={"xs"} variant={"ghost"}>
                    <Trash className="h-[1.2rem] w-[1.2rem] cursor-pointer text-destructive" />
                  </Button>
                </div>
              }
              title={dictionary.DeleteClient}
              description={dictionary.DeleteClientConfirmation}
              confirmTxt={dictionary.Delete}
              cancelTxt={dictionary.Cancel}
              onConfirm={() => {
                console.log("deleted!");
              }}
              onCancel={() => {
                console.log("canceld!");
              }}
              isDelete
            />
            <Button size={"xs"} variant={"ghost"}>
              <ArrowRight className="h-[1.2rem] w-[1.2rem]  cursor-pointer" />
            </Button>

            {/* <Dropdown
                  icon={<MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />}
                  menus={[
                    {
                      label: "Actions",
                      items: [
                        {
                          name: "View",
                          icon: <ArrowRight className="h-[1.2rem] w-[1.2rem]" />,
                          onClick: () => console.log("navigate to client page"),
                        },
                        {
                          name: "Send email",
                          icon: <Mail />,
                          separator: true,
                          onClick: () => console.log("send email"),
                        },
                        {
                          name: (
                            <Modal
                              trigger={
                                <div className="flex">
                                  <Trash className="h-[1.2rem] w-[1.2rem] mr-2" />
                                  {"Delete"}
                                </div>
                              }
                              title={"Delete client"}
                              description={
                                "Are you sure you want to delete this client? You cannot recover a deleted client."
                              }
                              confirmTxt={"Delete"}
                              cancelTxt={"Cancel"}
                              onConfirm={() => {
                                console.log("deleted!!!");
                              }}
                              onCancel={() => {
                                console.log("canceld!!!!!");
                              }}
                            />
                          ),
                          onClick: (e) => e.preventDefault(),
                        },
                      ],
                    },
                  ]}
                /> */}
          </div>
        );
      },
    },
  ];
};
