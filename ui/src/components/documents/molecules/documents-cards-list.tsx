import { useContext } from "react";
import { DocumentsForm } from "./documents-form";
import { LanguageContext } from "@/i18n/language-context";

export const DocumentsCardsList = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <>
      <p className="font-medium text-md sm:text-lg">
        {dictionary.GenerateDocument}
      </p>
      <div className="flex bg-background rounded-md p-4 flex-col gap-4 ">
        <div className=" w-full flex gap-2 flex-wrap justify-between">
          <DocumentsForm />
        </div>
      </div>
    </>
  );
};
