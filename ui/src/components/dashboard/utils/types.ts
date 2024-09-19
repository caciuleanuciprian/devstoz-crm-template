export type DropdownMenuItemProps = {
  name?: any;
  icon?: any;
  separator?: boolean;
  onClick?: (params?: any) => void;
  component?: any;
} | null;

export type DropdownMenuProps = {
  label?: string;
  items: DropdownMenuItemProps[];
  fn?: (params?: any) => void;
};

export interface MonthlyReportResponse {
  numberOfClients: number;
  numberOfTransactions: number;
  totalIncome: number;
  totalExpenses: number;
}
