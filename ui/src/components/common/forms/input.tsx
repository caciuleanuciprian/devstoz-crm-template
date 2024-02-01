import { cn } from "@/lib/utils";
import { useField, FieldProps } from "@formiz/core";
import { AlertCircle } from "lucide-react";

type MyFieldProps<FormattedValue> = FieldProps<string, FormattedValue>;

export const InputField = <FormattedValue = string,>(
  props: MyFieldProps<FormattedValue> | any
) => {
  const { value, setValue, isValid, errorMessage } = useField(props);
  const {
    id,
    name,
    placeholder = "",
    type = "text",
    autoCapitalize = "none",
    autoComplete = "false",
    autoCorrect = "false",
    disabled = false,
    defaultValue,
  } = props;
  return (
    <div className="flex flex-col gap-1 min-h-[56px] w-full">
      <input
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
        )}
        id={id}
        value={value ?? ""}
        placeholder={placeholder}
        type={type}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
      />
      {!isValid && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
