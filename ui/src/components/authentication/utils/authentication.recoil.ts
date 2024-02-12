import { localStorageEffect } from "@/lib/recoil/persistAtom";
import { atom } from "recoil";

export const idTokenAtom = atom({
  key: "idToken",
  default: null as string | null,
  effects: [localStorageEffect("idToken")],
});
