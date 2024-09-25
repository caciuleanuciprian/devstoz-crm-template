export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  RECURRING_EXPENSE = "RECURRING_EXPENSE",
}

export enum FileExtensions {
  PDF = "pdf",
  DOC = "doc",
  DOCX = "docx",
  XLS = "xls",
  XLSX = "xlsx",
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
}

export interface TransactionObject {
  id: string;
  name: string;
  amount: number;
  fileNames: string;
  transactionType: string;
}

export interface TransactionProps {
  transaction: TransactionObject;
}

export interface TransactionsProps {
  transactions: TransactionObject[];
}
