import { AuthState } from "@/constants/authentication/types";
import { atom } from "recoil";

export const authStateAtom = atom({
  key: "authStateAtom",
  default: AuthState.REGISTER,
});

export const isAuthenticatedAtom = atom({
  key: "isAuthenticatedAtom",
  default: false,
});
