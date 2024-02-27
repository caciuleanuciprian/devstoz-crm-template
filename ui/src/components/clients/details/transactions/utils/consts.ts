// export const TransactionsTableHeaders = [
//   { id: "icon", label: dictionary.FileType, size: 10 },
//   { id: "name", label: dictionary.Name, size: 20 },
//   { id: "amount", label: dictionary.Amount, size: 15 },
//   { id: "transactionType", component: <FilterableTableHeader />, size: 20 },
//   { id: "fileName", label: dictionary.FileName, size: 15 },
//   { id: "actions", label: dictionary.Actions, alignRight: true, size: 20 },
// ];

export const transactionHeaders = (dictionary: any, component?: any) => {
  return [
    { id: "icon", label: dictionary.FileType, size: 10 },
    { id: "name", label: dictionary.Name, size: 20 },
    { id: "amount", label: dictionary.Amount, size: 15 },
    { id: "transactionType", component: component, size: 20 },
    { id: "fileName", label: dictionary.FileName, size: 15 },
    { id: "actions", label: dictionary.Actions, alignRight: true, size: 20 },
  ];
};
