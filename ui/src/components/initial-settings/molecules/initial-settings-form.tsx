import InputWithLabel from "@/components/common/forms/input-with-label";
import { Formiz } from "@formiz/core";
import { isRequired, isNotEmptyString } from "@formiz/validations";
import { selectCurrencyOptions, valueToLabelCurrency } from "../utils/consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { Label } from "@/components/ui/label";

import { useRecoilState } from "recoil";
import { initialSettingsCurrencyAtom } from "../core/initial-settings.recoil";

interface InitialSettingsFormProps {
  form: any;
  isReadonly: boolean;
}

export const InitialSettingsForm = ({
  form,
  isReadonly,
}: InitialSettingsFormProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [selectedCurrency, setSelectedCurrency] = useRecoilState(
    initialSettingsCurrencyAtom
  );

  return (
    <Formiz connect={form}>
      <div className="flex w-full h-full gap-4">
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="col-span-4 w-full h-full">
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
              isDisabled={isReadonly}
            />
            <div className="col-span-4 w-full pb-5">
              <Select
                onValueChange={(e: any) => setSelectedCurrency(e)}
                value={selectedCurrency}
                disabled={isReadonly}
              >
                <Label>{dictionary.Currency}</Label>
                <SelectTrigger className="h-9">
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
          </div>
        </div>
      </div>
    </Formiz>
  );
};
