import { Label } from "@/components/ui/label";
import { DatePickerField } from "./input";
import { InputWithLabelProps } from "@/components/clients/list/utils/types";

const DatePickerWithLabel = ({
  label,
  isLoading,
  type,
  name,
  validations,
  isDisabled,
  defaultValue,
  required,
  dateFormat,
  full,
}: InputWithLabelProps & {
  dateFormat?: string;
  full?: boolean;
}) => {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
      <div className="col-span-3 align-middle">
        <DatePickerField
          id={name}
          name={name}
          placeholder={label}
          type={type}
          autoCapitalize="none"
          autoComplete={name}
          autoCorrect="off"
          disabled={isLoading || isDisabled}
          validations={validations}
          defaultValue={defaultValue}
          required={required}
          dateFormat={dateFormat}
          full={full}
        />
      </div>
    </div>
  );
};

export default DatePickerWithLabel;
