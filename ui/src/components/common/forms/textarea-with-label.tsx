import { TextareaWithLabelProps } from "@/components/clients/list/utils/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          autoCapitalize="none"
          autoComplete={name}
          autoCorrect="off"
          disabled={isLoading || isDisabled}
          defaultValue={defaultValue}
          className="resize-none h-[250px]"
        />
      </div>
    </div>
  );
};

export default TextareaWithLabel;
