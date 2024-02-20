import { Formiz, useForm, useFormFields } from "@formiz/core";
import { isRequired, isNotEmptyString } from "@formiz/validations";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import InputWithLabel from "../common/forms/input-with-label";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  selectLanguageOptions,
  selectCurrencyOptions,
  valueToLabelCurrency,
  valueToLabelLanguage,
  SelectLanguageOptions,
  SelectCurrencyOptions,
} from "./utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { CreateUserOrganization } from "../authentication/core/authentication.service";
import { userDetailsAtom } from "../authentication/utils/authentication.recoil";
import { Header } from "../common/header/header";
import { Button } from "../ui/button";
import Logo from "../common/navigation/atoms/logo";

export const InitialSettings = () => {
  const [userDetails] = useRecoilState(userDetailsAtom);
  const initialSettingsForm = useForm();
  const { dictionary } = useContext(LanguageContext);
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>(SelectLanguageOptions.en);
  const [currency, setCurrency] = useState<string>(SelectCurrencyOptions.USD);

  const values = useFormFields({
    connect: initialSettingsForm,
    selector: (field) => field.value,
  });

  const { data, loadData, error, dataCode, isLoading } = useAxios({
    fetchFn: CreateUserOrganization,
    paramsOfFetch: {
      userId: userDetails?.id,
      body: {
        organizationLogo: file,
        name: values.name,
        language,
        currency,
        logoName: values.logoName,
      },
    },
  });

  const resetForm = () => {
    initialSettingsForm.reset({ only: ["values"] });
    setFile(null);
    setLanguage(SelectLanguageOptions.en);
    setCurrency(SelectCurrencyOptions.USD);
  };

  const handleSubmit = async () => {
    if (initialSettingsForm.isValid && file && language && currency) {
      await loadData();
    }
  };

  console.log(data);

  // {
  //     "organizationLogo": "string",
  //     "organization": {
  //       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       "name": "string",
  //       "language": "string",
  //       "currency": "string",
  //       "logoName": "string"
  //     }
  //   }
  return (
    <div className="h-screen w-screen">
      <div className="p-4">
        <Logo />
        <Header title={"Initial Settings"} />
      </div>
      <div className="m-4 p-4 bg-secondary rounded-md">
        <div className="p-4 bg-background">
          <p>Initial Settings</p>
          <Formiz connect={initialSettingsForm}>
            <div className="flex gap-4">
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.OrganizationName}
                  type={"text"}
                  name={"name"}
                  required={dictionary.FieldCannotBeEmpty}
                  validations={[
                    {
                      handler: isRequired() && isNotEmptyString(),
                      message: `${dictionary.InvalidName}`,
                    },
                  ]}
                />
              </div>
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.OrganizationLogoName}
                  type={"text"}
                  name={"logoName"}
                  required={dictionary.FieldCannotBeEmpty}
                  validations={[
                    {
                      handler: isRequired() && isNotEmptyString(),
                      message: `${dictionary.InvalidAmount}`,
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="col-span-4 w-full pb-4">
                <Select
                  onValueChange={(e: any) => setLanguage(e)}
                  defaultValue={language}
                >
                  <Label>{dictionary.Language}</Label>
                  <SelectTrigger>
                    <SelectValue placeholder={dictionary.Language} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectLanguageOptions.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {valueToLabelLanguage(option, dictionary)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 w-full">
                <Label>{dictionary.OrganizationLogo}</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="col-span-4 w-full pb-4">
                <Select
                  onValueChange={(e: any) => setCurrency(e)}
                  defaultValue={currency}
                >
                  <Label>{dictionary.Currency}</Label>
                  <SelectTrigger>
                    <SelectValue placeholder={dictionary.Currency} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectCurrencyOptions.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {valueToLabelCurrency(option, dictionary)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 w-full">
                <Label>{dictionary.AddMembers}</Label>
              </div>
            </div>
          </Formiz>
          <div className="flex gap-4 justify-end">
            <Button onClick={resetForm} variant={"outline"}>
              {dictionary.Reset}
            </Button>
            <Button onClick={handleSubmit}>{dictionary.Submit}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
