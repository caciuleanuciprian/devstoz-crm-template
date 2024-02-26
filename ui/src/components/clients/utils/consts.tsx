import {
  ArrowDownCircle,
  ArrowUpCircle,
  Building2,
  User,
  UserCog,
} from "lucide-react";
import {
  isEmail,
  isMaxLength,
  isMinLength,
  isNotEmptyString,
  isNumber,
  isRequired,
} from "@formiz/validations";

export enum ClientType {
  SRL = "SRL",
  PFA = "PFA",
  PF = "PF",
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  RECURRING_EXPENSE = "RECURRING_EXPENSE",
}

export const selectClientTypeOptions = [
  ClientType.SRL,
  ClientType.PFA,
  ClientType.PF,
];

export const selectTransactionsTypeOptions = [
  TransactionType.INCOME,
  TransactionType.EXPENSE,
  TransactionType.RECURRING_EXPENSE,
];

export const valueToLabelClientType = (option: string, dictionary: any) => {
  switch (option) {
    case ClientType.SRL:
      return dictionary.SRL;
    case ClientType.PFA:
      return dictionary.PFA;
    case ClientType.PF:
      return dictionary.PF;
    default:
      return option;
  }
};

export const iconToLabelClientType = (
  option: string,
  className: string = "mr-2 h-4 w-4 text-muted-foreground/70"
) => {
  switch (option) {
    case ClientType.SRL:
      return <Building2 className={className} />;
    case ClientType.PFA:
      return <UserCog className={className} />;
    case ClientType.PF:
      return <User className={className} />;
    default:
      return option;
  }
};

export const valueToLabelTransactionType = (
  option: string,
  dictionary: any
) => {
  switch (option) {
    case TransactionType.INCOME:
      return dictionary.Income;
    case TransactionType.EXPENSE:
      return dictionary.Expense;
    case TransactionType.RECURRING_EXPENSE:
      return dictionary.RecurringExpense;
    default:
      return option;
  }
};

export const valueToLabelTabelTransactionType = (
  option: string,
  dictionary: any
) => {
  switch (option) {
    case TransactionType.INCOME:
      return (
        <div className="flex items-center gap-2">
          <ArrowUpCircle className="h-[1.2rem] w-[1.2rem] text-green-500" />
          {dictionary.Income}
        </div>
      );
    case TransactionType.EXPENSE:
      return (
        <div className="flex items-center gap-2">
          <ArrowDownCircle className="h-[1.2rem] w-[1.2rem] text-destructive" />
          {dictionary.Expense}
        </div>
      );
    case TransactionType.RECURRING_EXPENSE:
      return (
        <div className="flex items-center gap-2">
          <ArrowDownCircle className="h-[1.2rem] w-[1.2rem] text-destructive" />
          {dictionary.RecurringExpense}
        </div>
      );
    default:
      return option;
  }
};

export const formatData = (data: any) => {
  return data.split("T")[0];
};

export const renderFormFields = (dictionary: any, isLoading: boolean) => {
  return [
    {
      label: dictionary.Name,
      isLoading: isLoading,
      type: "text",
      name: "name",
      required: dictionary.FieldCannotBeEmpty,
      validations: [
        {
          handler: isRequired() && isNotEmptyString(),
          message: `${dictionary.InvalidName}`,
        },
      ],
    },
    {
      label: dictionary.Address,
      isLoading: isLoading,
      type: "text",
      name: "address",
      required: dictionary.FieldCannotBeEmpty,
      validations: [
        {
          handler: isRequired() && isNotEmptyString(),
          message: `${dictionary.InvalidAddress}`,
        },
      ],
    },
    {
      label: dictionary.Phone,
      isLoading: isLoading,
      type: "phone",
      name: "telephone",
      required: dictionary.FieldCannotBeEmpty,
      validations: [
        {
          handler: isRequired() && isNumber(),
          message: `${dictionary.InvalidPhone}`,
        },
        {
          handler: isMaxLength(10),
          message: `${dictionary.InvalidPhoneLength}`,
        },
        {
          handler: isMinLength(10),
          message: `${dictionary.InvalidPhoneLength}`,
        },
      ],
    },
    {
      label: dictionary.Email,
      isLoading: isLoading,
      type: "email",
      name: "email",
      required: dictionary.FieldCannotBeEmpty,
      validations: [
        {
          handler: isRequired() && isEmail(),
          message: `${dictionary.InvalidEmail}`,
        },
      ],
    },
    {
      label: dictionary.Type,
      isLoading: isLoading,
      type: "select",
      name: "type",
      placeholder: dictionary.Type,
      options: selectClientTypeOptions,
    },
  ];
};
