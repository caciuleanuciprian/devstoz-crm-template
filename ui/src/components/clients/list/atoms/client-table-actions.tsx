import { Modal } from "@/components/common/modal";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { Trash, ArrowRight, Mail, MoreHorizontal, Archive } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ArchiveClient, DeleteClient } from "../../core/clients.service";
import { useNavigate } from "react-router-dom";
import { CLIENTS_PREFIX } from "@/lib/axios/consts";
import { toast } from "@/components/ui/use-toast";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { shouldRefetchAtom } from "../utils/clients.recoil";
import { useRecoilState } from "recoil";
import Dropdown from "@/components/common/dropdown";
import { EmailForm } from "../../email/email-form";

interface ClientTableActionsProps {
  id: string;
  isArchived?: boolean;
  email?: string;
}

export const ClientTableActions = ({
  id,
  isArchived,
  email,
}: ClientTableActionsProps) => {
  const { dictionary } = useContext(LanguageContext);
  const [emailOpen, setEmailOpen] = useState<boolean>(false);

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const navigate = useNavigate();

  const {
    error: deleteClientError,
    dataCode: deleteClientDataCode,
    loadData: deleteClient,
    isLoading: deleteIsLoading,
  } = useAxios({
    fetchFn: DeleteClient,
    paramsOfFetch: { clientId: id },
  });

  const {
    error: archiveClientError,
    dataCode: archiveClientDataCode,
    loadData: archiveClientLoadData,
    isLoading: archiveIsLoading,
  } = useAxios({
    fetchFn: ArchiveClient,
    paramsOfFetch: {
      clientId: id,
    },
  });

  const handleDelete = async () => {
    await deleteClient();
  };

  const handleArchive = async () => {
    await archiveClientLoadData();
  };

  const navigateToClientDetails = () => {
    navigate(`${CLIENTS_PREFIX}/${id}`);
  };

  useEffect(() => {
    if (deleteClientDataCode === AxiosStatusCode.CODE_204_NO_CONTENT) {
      toast({ title: dictionary.ClientRemovedSuccesfully, variant: "success" });
      setShouldRefetch(true);
    } else if (deleteClientError) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [deleteClientDataCode, deleteClientError]);

  useEffect(() => {
    if (archiveClientDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ title: dictionary.ArchiveClientSuccess, variant: "success" });
      setShouldRefetch(true);
    } else if (archiveClientError) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [archiveClientDataCode, archiveClientError]);
  return (
    <div className="flex justify-end items-center">
      <Dropdown
        icon={<MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />}
        menus={[
          {
            label: dictionary.Actions,
            items: [
              {
                name: dictionary.View,
                icon: <ArrowRight className="h-[1.2rem] w-[1.2rem]" />,
                onClick: () => {
                  navigateToClientDetails();
                },
              },
              {
                name: dictionary.SendEmail,
                icon: <Mail className="h-[1.2rem] w-[1.2rem]" />,
                onClick: (e) => {
                  e.preventDefault();
                  setEmailOpen(true);
                },
                separator: isArchived,
              },
              !isArchived
                ? {
                    name: (
                      <Modal
                        trigger={
                          <div className="flex items-center">
                            <Archive className="h-[1.2rem] w-[1.2rem] mr-2" />
                            <p>{dictionary.Archive}</p>
                          </div>
                        }
                        title={dictionary.ArchiveClient}
                        description={dictionary.ArchiveClientConfirmation}
                        confirmTxt={dictionary.Archive}
                        cancelTxt={dictionary.Cancel}
                        onConfirm={handleArchive}
                        isLoading={archiveIsLoading}
                      />
                    ),
                    onClick: (e) => e.preventDefault(),
                    separator: true,
                  }
                : null,
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
                    isDelete
                    isLoading={deleteIsLoading}
                  />
                ),
                onClick: (e) => e.preventDefault(),
              },
            ],
          },
        ]}
      />
      <EmailForm email={email ?? ""} open={emailOpen} setOpen={setEmailOpen} />
    </div>
  );
};
