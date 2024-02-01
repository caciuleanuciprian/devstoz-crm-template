import { ClientInputProps } from "@/components/clients/utils/types";
import { InputField } from "@/components/common/forms/input";
import { Label } from "@/components/ui/label";

const ClientInput = ({
  label,
  isLoading,
  type,
  name,
  validations,
  isDisabled,
  defaultValue,
}: ClientInputProps) => {
  return (
    <div>
      <Label htmlFor="name" className="text-sm">
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
        />
      </div>
    </div>
  );
};

export default ClientInput;
