import React, { useState, createContext, useContext } from "react";
import { dictionaryList, languageOptions } from "./languages";

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: "en",
  dictionary: dictionaryList.en,
});

// it provides the language context to app
export function LanguageProvider({ children }: any) {
  const defaultLanguage = window.localStorage.getItem("rcml-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "en");

  const provider = {
    userLanguage,
    //@ts-ignore
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected: string) => {
      const newLanguage = languageOptions[selected] ? selected : "en";
      setUserLanguage(newLanguage);
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
