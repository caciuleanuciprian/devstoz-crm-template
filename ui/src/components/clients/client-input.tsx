import { ClientInputProps } from "@/constants/clients/types";
import { InputField } from "@/components/forms/input";
import { Label } from "@/components/ui/label";

const ClientInput = ({
  label,
  isLoading,
  type,
  name,
  validations,
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
          disabled={isLoading}
          validations={validations}
        />
      </div>
    </div>
  );
};

export default ClientInput;
