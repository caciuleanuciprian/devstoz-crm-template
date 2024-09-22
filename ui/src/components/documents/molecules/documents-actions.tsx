import { shouldRefetchAtom } from "@/components/clients/list/utils/clients.recoil";
import { Modal } from "@/components/common/modal";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { Trash, Download } from "lucide-react";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { DeleteDocument, GetDocumentFile } from "../core/documents.service";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";

interface DocumentsActionsProps {
  document_id: string;
  document_name: string;
}

export const DocumentsActions = ({
  document_id,
  document_name,
}: DocumentsActionsProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  const { error, dataCode, loadData, isLoading } = useAxios({
    fetchFn: DeleteDocument,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      documentId: document_id,
    },
  });

  const handleDelete = async () => {
    await loadData();
  };

  const {
    data: documentFileData,
    error: documentFileError,
    dataCode: documentFileDataCode,
    isLoading: documentFileIsLoading,
    loadData: loadDocumentFile,
  } = useAxios({
    fetchFn: GetDocumentFile,
    paramsOfFetch: {
      documentId: document_id,
      organizationId: selectedOrganization?.id,
    },
  });

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = document_name;
    const URL = window.URL || window.webkitURL;
    link.href = URL.createObjectURL(documentFileData);
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleDownload = async () => {
    await loadDocumentFile();
  };

  useEffect(() => {
    if (documentFileDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({
        variant: "default",
        title: dictionary.StartingFileDownload,
        duration: 500,
      });
      handleDownloadFile();
    } else if (documentFileError) {
      toast({ variant: "destructive", title: dictionary.GenericError });
    }
  }, [documentFileDataCode, documentFileError]);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_204_NO_CONTENT) {
      toast({
        variant: "success",
        title: dictionary.TransactionDeletedSuccesfully,
      });
      setShouldRefetch(true);
    } else if (error) {
      toast({ variant: "destructive", title: dictionary.GenericError });
    }
  }, [dataCode, error]);

  return (
    <div className="flex justify-end items-center gap-2">
      <Modal
        trigger={
          <Button className="text-center" size={"xs"} variant="ghost">
            <Trash className="h-[1.2rem] w-[1.2rem] text-destructive" />
          </Button>
        }
        title={dictionary.DeleteDocument}
        description={dictionary.DeleteDocumentConfirmation}
        confirmTxt={dictionary.Delete}
        cancelTxt={dictionary.Cancel}
        onConfirm={handleDelete}
        isLoading={false}
        isDelete
      />
      <Button size={"xs"} variant="ghost" onClick={handleDownload}>
        {documentFileIsLoading ? (
          <Loader className={"h-[1.2rem] w-[1.2rem]"} />
        ) : (
          <Download className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
};
