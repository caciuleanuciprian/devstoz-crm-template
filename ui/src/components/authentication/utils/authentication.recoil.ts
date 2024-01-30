import { AuthState } from "@/components/authentication/utils/types";
import { atom } from "recoil";

export const authStateAtom = atom({
  key: "authStateAtom",
  default: AuthState.REGISTER,
});

export const isAuthenticatedAtom = atom({
  key: "isAuthenticatedAtom",
  default: true,
});
