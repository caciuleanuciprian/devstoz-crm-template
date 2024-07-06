import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";
import { DocumentsForm } from "./molecules/documents-form";

const Documents = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8 pb-4">
      <Header title={dictionary.Documents} />
      <div className="flex h-[85vh] py-4 flex-col gap-4">
        <div className="flex bg-secondary rounded-md p-4 flex-col gap-4 ">
          <p className="font-semibold text-lg">{dictionary.GenerateDocument}</p>
          <div className="flex flex-col w-full justify-between rounded-md bg-background">
            <DocumentsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
