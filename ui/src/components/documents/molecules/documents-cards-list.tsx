import { useContext } from "react";
import { DocumentsForm } from "./documents-form";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { GetAvailablePDFs } from "../core/documents.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { LoadingDocumentCard } from "../atoms/document-card";

export const DocumentsCardsList = () => {
  const { dictionary } = useContext(LanguageContext);
  const [organization] = useRecoilState(selectedOrganizationAtom);

  const { data, isLoading } = useAxios({
    fetchFn: GetAvailablePDFs,
    paramsOfFetch: {
      organizationId: organization?.id,
    },
    loadOnMount: true,
  });

  return (
    <>
      <p className="font-medium text-md sm:text-lg">
        {dictionary.GenerateDocument}
      </p>
      <div className="flex bg-background rounded-md p-4 flex-col gap-4 ">
        <div className=" w-full flex gap-2 overflow-auto">
          {isLoading && <LoadingDocumentCard />}
          {!isLoading &&
            data?.map((document: string, index: number) => (
              <DocumentsForm
                key={`${document}-${index}`}
                documentName={document}
              />
            ))}
        </div>
      </div>
    </>
  );
};
