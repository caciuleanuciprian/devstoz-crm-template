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
