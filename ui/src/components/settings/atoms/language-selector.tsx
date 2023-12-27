import { LanguageContext } from "@/i18n/language-context";
import { languageOptions } from "@/i18n/languages";
import { ReactNode, useContext } from "react";

export default function LanguageSelector() {
  const handleLanguageChange = (e: any) => userLanguageChange(e.target.value);

  const { userLanguage, userLanguageChange }: any = useContext(LanguageContext);

  return (
    <select
      onChange={handleLanguageChange}
      value={userLanguage}
      className="text-slate-500"
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name as ReactNode}
        </option>
      ))}
    </select>
  );
}
