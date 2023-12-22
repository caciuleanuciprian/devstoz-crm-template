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

export interface ClientInputProps {
  label: string;
  isLoading: boolean;
  type: string;
  name: string;
  validations?: any;
}

export interface ClientFormProps {
  fields: string[];
  initialValues: {};
  sheetProps: SheetProps;
}

export interface SheetProps {
  trigger: string | React.FC | any;
  title: string;
  description: string;
  submitTxt: string;
}
