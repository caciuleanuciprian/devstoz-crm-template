import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";
import DocumentsList from "./molecules/documents-list";
import { DocumentsCardsList } from "./molecules/documents-cards-list";

const Documents = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8 pb-4">
      <Header title={dictionary.Documents} />
      <div className="flex min-h-[85vh] py-4 flex-col gap-4">
        <div className="flex bg-secondary rounded-md p-4 flex-col gap-4 ">
          <DocumentsCardsList />
        </div>
        <div className="flex bg-secondary rounded-md p-4 flex-col gap-4 ">
          <DocumentsList />
        </div>
      </div>
    </div>
  );
};

export default Documents;
