import SearchBar from "@/components/ui-custom/search-bar";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

import Page from "@/components/ui-custom/page";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import {
  ClientsMockedData,
  InfoCardDataMocked1,
  InfoCardDataMocked2,
} from "@/constants/clients/clients";
import ResponsiveBarChart from "@/components/charts/responsive-bar-chart";
import { ArrowRight, Trash, User2 } from "lucide-react";
import InfoCard from "@/components/ui-custom/info-card";
import { ColumnDef } from "@tanstack/react-table";
import { Client, ClientAddress } from "@/constants/clients/types";
import { Modal } from "@/components/ui-custom/modal";
import { LanguageContext } from "@/i18n/language-context";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/table/pagination";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);
  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  const columns: ColumnDef<Client>[] = [
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
      cell: ({ row }) => {
        const obj: ClientAddress = row.getValue("address");
        return <div>{`${obj.street}, ${obj.number}`}</div>;
      },
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
      id: "actions",
      cell: ({ row }) => {
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
              title={"Delete client"}
              description={
                "Are you sure you want to delete this client? You cannot recover a deleted client."
              }
              confirmTxt={"Delete"}
              cancelTxt={"Cancel"}
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

  return (
    <Page>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full rounded-lg flex-col gap-4">
          <div className="flex h-[45vh] overflow-auto w-full bg-background rounded-lg flex-col">
            <div className=" flex h-full p-4 gap-4 w-full bg-background">
              <ResponsiveBarChart />
              <div className="flex h-full w-[50%] flex-wrap overflow-auto items-center gap-2">
                <InfoCard
                  icon={<User2 className="h-[2rem] w-[2rem] " />}
                  data={InfoCardDataMocked1}
                />
                <InfoCard
                  icon={<User2 className="h-[2rem] w-[2rem]" />}
                  data={InfoCardDataMocked2}
                  currencySymbol="$"
                />
              </div>
            </div>
          </div>
          <div className="flex h-full overflow-auto w-full bg-background rounded-lg flex-col pb-2 justify-end">
            <div className="h-full">
              <DashboardTable columns={columns} data={ClientsMockedData} />
            </div>
            <TablePagination
              pages={[]}
              activePage={1}
              nextPage={() => {}}
              prevPage={() => {}}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
