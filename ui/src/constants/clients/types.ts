export interface Client {
  id: number;
  name: string;
  address: ClientAddress;
  phone: string;
  email: string;
}

export interface ClientAddress {
  street: string;
  number: number;
}

export interface InfoCardType {
  id: number;
  label: string;
  amount: number;
  pastAmount: number;
}
