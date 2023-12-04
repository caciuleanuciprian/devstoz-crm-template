import { atom } from "recoil";
import { localStorageEffect } from "./persistAtom";

export const atomExample = atom({
  key: "atomExampleWhatever",
  default: "",
  effects: [localStorageEffect("atomExampleLocalStorage")],
});
