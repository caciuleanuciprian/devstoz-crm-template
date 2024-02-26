import React, { useState, createContext, useContext, useEffect } from "react";
import { dictionaryList, languageOptions } from "./languages";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { useRecoilState } from "recoil";
import { UserOrganization } from "@/components/authentication/utils/types";

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: "en",
  dictionary: dictionaryList.en,
});

// it provides the language context to app
export function LanguageProvider({ children }: any) {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    selectedOrganizationAtom
  );
  const defaultLanguage =
    selectedOrganization?.language || window.localStorage.getItem("rcml-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "en");

  const provider = {
    userLanguage,
    //@ts-ignore
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected: string) => {
      const newLanguage = languageOptions[selected] ? selected : "en";
      setUserLanguage(newLanguage);
      setSelectedOrganization({
        ...(selectedOrganization as UserOrganization),
        language: newLanguage,
      });
      window.localStorage.setItem("rcml-lang", newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}

// get text according to id & current language
export function Text({ tid }: any) {
  const languageContext = useContext(LanguageContext);

  //@ts-ignore
  return languageContext.dictionary[tid] || tid;
}
