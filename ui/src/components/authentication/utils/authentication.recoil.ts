import { localStorageEffect } from "@/lib/recoil/persistAtom";
import { atom } from "recoil";

interface UserDetails {
  email: string;
  name: string;
  id: string;
  clients: string[];
  roles: string[];
}

interface UserOrganization {
  id: string;
  name: string;
  language: string;
  currency: string;
  logoName: string;
  logo: File;
}

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
