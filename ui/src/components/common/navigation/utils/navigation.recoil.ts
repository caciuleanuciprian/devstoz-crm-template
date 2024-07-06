import { localStorageEffect } from "@/lib/recoil/persistAtom";
import { atom } from "recoil";

export const activeNavTabAtom = atom({
  key: "activeNavTabAtom",
  default: 0,
});

export const expandedNavBarAtom = atom({
  key: "expandedNavBarAtom",
  default: true,
  effects: [localStorageEffect("expandedNavBar")],
});
