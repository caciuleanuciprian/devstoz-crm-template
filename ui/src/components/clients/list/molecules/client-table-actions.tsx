import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { Trash, ArrowRight, Mail, MoreHorizontal, Archive } from "lucide-react";
import { useContext, useEffect } from "react";
import { DeleteClient } from "../../core/clients.service";
import { useNavigate } from "react-router-dom";
import { CLIENTS_PREFIX } from "@/lib/axios/consts";
import { toast } from "@/components/ui/use-toast";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { shouldRefetchAtom } from "../../utils/clients.recoil";
import { useRecoilState } from "recoil";
import Dropdown from "@/components/common/dropdown";

interface ClientTableActionsProps {
  id: string;
}

export const ClientTableActions = ({ id }: ClientTableActionsProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const navigate = useNavigate();

  const {
    data: deleteClientData,
    error: deleteClientError,
    dataCode: deleteClientDataCode,
    isLoading: deleteClientIsLoading,
    loadData: deleteClient,
  } = useAxios({
    fetchFn: DeleteClient,
    paramsOfFetch: { clientId: id },
  });

  const handleDelete = () => {
    deleteClient();
  };

  const navigateToClientDetails = () => {
    navigate(`${CLIENTS_PREFIX}/${id}`);
  };

  useEffect(() => {
    if (
      deleteClientData &&
      deleteClientDataCode === AxiosStatusCode.CODE_200_OK
    ) {
      toast({ title: dictionary.ClientRemovedSuccesfully, variant: "success" });
      setShouldRefetch(true);
    } else if (deleteClientError) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [deleteClientData]);
  return (
    <div className="flex justify-end items-center">
      <Dropdown
        icon={<MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />}
        menus={[
          {
            label: "Actions",
            items: [
              {
                name: "View",
                icon: <ArrowRight className="h-[1.2rem] w-[1.2rem]" />,
                onClick: () => navigateToClientDetails(),
              },
              {
                name: "Send email",
                icon: <Mail className="h-[1.2rem] w-[1.2rem] mr-2" />,
                onClick: () => console.log("send email"),
              },
              {
                name: "Archive",
                icon: <Archive className="h-[1.2rem] w-[1.2rem] mr-2" />,
                separator: true,

                onClick: () => console.log("archive"),
              },
              {
                name: (
                  <Modal
                    trigger={
                      <div className="flex items-center">
                        <Trash className="h-[1.2rem] w-[1.2rem] mr-2 text-destructive" />
                        <p className="text-destructive">{dictionary.Delete}</p>
                      </div>
                    }
                    title={dictionary.DeleteClient}
                    description={dictionary.DeleteClientConfirmation}
                    confirmTxt={dictionary.Delete}
                    cancelTxt={dictionary.Cancel}
                    onConfirm={handleDelete}
                    isDisabled={deleteClientIsLoading}
                  />
                ),
                onClick: (e) => e.preventDefault(),
              },
            ],
          },
        ]}
      />
    </div>
  );
};
