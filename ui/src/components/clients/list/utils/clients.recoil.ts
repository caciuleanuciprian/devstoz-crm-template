import { atom } from "recoil";

export const shouldRefetchAtom = atom({
  key: "shouldRefetch",
  default: false,
});

export const filterTableByAtom = atom({
  key: "filterTableBy",
  default: null as unknown as any | null,
});

export const searchValueAtom = atom({
  key: "searchValue",
  default: null as string | null,
});

export const totalClientsAtom = atom({
  key: "totalClients",
  default: null as number | any | null,
});

export const totalPagesAtom = atom({
  key: "totalPages",
  default: 0 as number,
});

export const currentPageAtom = atom({
  key: "currentPage",
  default: 0 as number,
});
