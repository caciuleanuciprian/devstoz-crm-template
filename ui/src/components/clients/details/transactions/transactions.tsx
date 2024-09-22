import { TransactionsHeader } from "./atoms/transactions-header";
import { TransactionsTable } from "./molecules/transactions-table";

export const Transactions = () => {
  return (
    <div className="bg-secondary p-4 h-full flex flex-col gap-4 rounded-md">
      <TransactionsHeader />
      <div className="flex flex-col w-full h-full p-4 pb-0 rounded-md justify-between bg-background">
        <div className="flex flex-col gap-4">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};
