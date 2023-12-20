import { Client, InfoCardType } from "./types";

export const ClientsMockedData: Client[] = [
  {
    id: 0,
    name: "John Snow",
    address: {
      street: "Rozelor",
      number: 6,
    },
    phone: "+4075123123",
    email: "john.snow@gmail.com",
  },

  {
    id: 1,
    name: "Rose Gilbert",
    address: {
      street: "Trandafirilor",
      number: 6,
    },
    phone: "+4074523534",
    email: "rose.gilbert@gmail.com",
  },

  {
    id: 2,
    name: "Anne Hill",
    address: {
      street: "Panselutelor",
      number: 6,
    },
    phone: "+4072859352",
    email: "anne.hill@gmail.com",
  },
];

export const InfoCardDataMocked1: InfoCardType = {
  id: 0,
  label: "New Customers", // Should rethink this after BE schema is implemented
  amount: 9126,
  pastAmount: 1543,
};

export const InfoCardDataMocked2: InfoCardType = {
  id: 1,
  label: "New Sales", // Should rethink this after BE schema is implemented
  amount: 5690,
  pastAmount: 2460,
};
