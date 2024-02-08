import { atom } from "recoil";

export const fileAtom = atom({
  key: "file",
  default: null as File | null,
});

export const transactionTypeSelectAtom = atom({
  key: "transactionTypeSelect",
  default: null as string | null,
});
