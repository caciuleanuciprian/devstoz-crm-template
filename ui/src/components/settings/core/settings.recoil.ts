import {
  SelectCurrencyOptions,
  SelectLanguageOptions,
} from "@/components/initial-settings/utils/consts";
import { atom } from "recoil";

export const organizationLogoAtom = atom({
  key: "organizationLogo",
  default: null as any,
});

export const settingsLanguageAtom = atom({
  key: "settingsLanguage",
  default: null as string | null,
});

export const settingsCurrencyAtom = atom({
  key: "settingsCurrency",
  default: null as string | null,
});
