import { atom } from "recoil";

export const shouldRefetchAtom = atom({
  key: "shouldRefetch",
  default: false,
});
