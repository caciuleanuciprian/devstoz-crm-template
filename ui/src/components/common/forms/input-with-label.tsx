import { InputWithLabelProps } from "@/components/clients/list/utils/types";
import { InputField } from "@/components/common/forms/input";
import { Label } from "@/components/ui/label";

const InputWithLabel = ({
  label,
  isLoading,
  type,
  name,
  validations,
  isDisabled,
  defaultValue,
  required,
}: InputWithLabelProps) => {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
      <div className="col-span-3 align-middle">
        <InputField
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
        />
      </div>
    </div>
  );
};

export default InputWithLabel;
