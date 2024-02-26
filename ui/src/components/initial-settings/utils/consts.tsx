export enum SelectLanguageOptions {
  en = "en",
  ro = "ro",
}

export enum SelectCurrencyOptions {
  RON = "RON",
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

export const selectLanguageOptions = [
  SelectLanguageOptions.en,
  SelectLanguageOptions.ro,
];

export const selectCurrencyOptions = [
  SelectCurrencyOptions.RON,
  SelectCurrencyOptions.EUR,
  SelectCurrencyOptions.USD,
  SelectCurrencyOptions.GBP,
];

export enum SelectCurrencySymbolOptions {
  RON = "lei",
  EUR = "€",
  USD = "$",
  GBP = "£",
}

export const valueToLabelLanguage = (value: string, dictionary: any) => {
  switch (value) {
    case "en":
      return dictionary.English;
    case "ro":
      return dictionary.Romanian;
    default:
      return "";
  }
};

export const valueToLabelCurrency = (value: string, dictionary: any) => {
  switch (value) {
    case "RON":
      return dictionary.RON;
    case "EUR":
      return dictionary.EUR;
    case "USD":
      return dictionary.USD;
    case "GBP":
      return dictionary.GBP;
    default:
      return "";
  }
};

export const valueToLabelCurrencySymbol = (value: string) => {
  switch (value) {
    case SelectCurrencyOptions.RON:
      return SelectCurrencySymbolOptions.RON;
    case SelectCurrencyOptions.EUR:
      return SelectCurrencySymbolOptions.EUR;
    case SelectCurrencyOptions.USD:
      return SelectCurrencySymbolOptions.USD;
    case SelectCurrencyOptions.GBP:
      return SelectCurrencySymbolOptions.GBP;
    default:
      return SelectCurrencySymbolOptions.USD;
  }
};

export enum SelectRoleOptions {
  Administrator = "Administrator",
  Member = "Member",
}

export const selectRoleOptions = [
  SelectRoleOptions.Administrator,
  SelectRoleOptions.Member,
];

export const valueToLabelRole = (value: string, dictionary: any) => {
  switch (value) {
    case SelectRoleOptions.Administrator:
      return dictionary.Administrator;
    case SelectRoleOptions.Member:
      return dictionary.Member;
    default:
      return "";
  }
};
