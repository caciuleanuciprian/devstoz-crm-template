export interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  actions: any;
}

export interface InfoCardType {
  id: number;
  label: string;
  amount: number;
  pastAmount: number;
}

export interface ClientInputProps {
  label: string;
  isLoading?: boolean;
  type: string;
  name: string;
  validations?: any;
  placeholder?: string;
  options?: string[];
  isDisabled?: boolean;
  defaultValue?: string;
}

export interface ClientFormProps {
  fields?: string[];
  initialValues: {};
  sheetProps: SheetProps;
}

export interface SheetProps {
  trigger: string | React.FC | any;
  title: string;
  description: string;
  submitTxt: string;
}
