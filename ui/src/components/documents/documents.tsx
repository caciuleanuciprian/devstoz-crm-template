import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";

const Documents = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8 pb-4">
      <Header title={dictionary.Documents} />
    </div>
  );
};

export default Documents;
