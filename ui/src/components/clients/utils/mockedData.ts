import { Client, InfoCardType } from "./types";

export const ClientsMockedData: Client[] = [
  {
    id: 0,
    name: "John Snow",
    address: "Rozelor 6",
    phone: "+4075123123",
    email: "john.snow@gmail.com",
    type: "Individual",
  },

  {
    id: 1,
    name: "Rose Gilbert",
    address: "Rozelor 6",
    phone: "+4074523534",
    email: "rose.gilbert@gmail.com",
    type: "Individual",
  },

  {
    id: 2,
    name: "Anne Hill",
    address: "Rozelor 6",
    phone: "+4072859352",
    email: "anne.hill@gmail.com",
    type: "Individual",
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
