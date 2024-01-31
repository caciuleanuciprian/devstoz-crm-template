export const renderFormFields = (dictionary: any, isLoading: boolean) => {
  return [
    {
      label: dictionary.Name,
      isLoading: isLoading,
      type: "text",
      name: "name",
    },
    {
      label: dictionary.Address,
      isLoading: isLoading,
      type: "text",
      name: "address",
    },
    {
      label: dictionary.Phone,
      isLoading: isLoading,
      type: "phone",
      name: "telephone",
      validations: [
        {
          handler: (value: string) =>
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
              value
            ),
          message: `${dictionary.InvalidPhoneNumber}`,
        },
      ],
    },
    {
      label: dictionary.Email,
      isLoading: isLoading,
      type: "email",
      name: "email",
      validations: [
        {
          handler: (value: string) => value.includes("@"),
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
      options: ["COMPANY", "PERSON"],
    },
  ];
};
