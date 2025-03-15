import { localStorageEffect } from "@/lib/recoil/persistAtom";
import { atom } from "recoil";
import { UserDetails, UserOrganization } from "./types";

export const idTokenAtom = atom({
  key: "idToken",
  default: null as string | null,
  effects: [localStorageEffect("idToken")],
});

export const userDetailsAtom = atom({
  key: "userDetails",
  default: null as UserDetails | null,
});

export const selectedOrganizationAtom = atom({
  key: "selectedOrganization",
  default: null as UserOrganization | null,
});

export const isDemoAtom = atom({
  key: "isDemo",
  default: false,
  effects: [localStorageEffect("isDemo")],
});
