import { atom } from "recoil";
import { SelectLanguageOptions, SelectCurrencyOptions } from "../utils/consts";

export const initialSettingsLanguageAtom = atom({
  key: "initialSettingsLanguage",
  default: SelectLanguageOptions.en,
});

export const initialSettingsCurrencyAtom = atom({
  key: "initialSettingsCurrency",
  default: SelectCurrencyOptions.USD,
});
