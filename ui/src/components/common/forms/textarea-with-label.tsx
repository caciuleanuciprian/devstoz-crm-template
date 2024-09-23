import { TextareaWithLabelProps } from "@/components/clients/list/utils/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputTextarea } from "./input";

const TextareaWithLabel = ({
  label,
  isLoading,
  name,
  isDisabled,
  defaultValue,
  placeholder,
}: TextareaWithLabelProps) => {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
      <div className="col-span-3 align-middle">
        <InputTextarea
          id={name}
          name={name}
          autoCapitalize="none"
          autoComplete={name}
          autoCorrect="off"
          disabled={isLoading || isDisabled}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="resize-none h-[250px]"
        />
      </div>
    </div>
  );
};

export default TextareaWithLabel;
