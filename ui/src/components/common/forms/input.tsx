import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { LanguageContext } from "@/i18n/language-context";
import { cn } from "@/lib/utils";
import { useField, FieldProps } from "@formiz/core";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { useContext } from "react";
import { format } from "date-fns";

type MyFieldProps<FormattedValue> = FieldProps<string, FormattedValue>;

export const InputField = <FormattedValue = string,>(
  props: MyFieldProps<FormattedValue> | any
) => {
  const { value, setValue, isValid, errorMessage, isPristine } =
    useField(props);
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
    required,
  } = props;

  return (
    <div className="flex flex-col gap-1 min-h-[56px] w-full">
      <input
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
        )}
        id={id}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        type={type}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
        required={required}
      />
      {!isValid && !isPristine && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const InputTextarea = <FormattedValue = string,>(
  props: MyFieldProps<FormattedValue> | any
) => {
  const { value, setValue, isValid, errorMessage, isPristine } =
    useField(props);
  const {
    id,
    name,
    placeholder = "",
    autoCapitalize = "none",
    autoComplete = "false",
    autoCorrect = "false",
    disabled = false,
    defaultValue,
    required,
  } = props;

  return (
    <div className="flex flex-col gap-1 min-h-[56px] w-full">
      <Textarea
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
        )}
        id={id}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
        required={required}
      />
      {!isValid && !isPristine && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const InputCheckbox = <FormattedValue = boolean,>(
  props: MyFieldProps<FormattedValue> | any
) => {
  const { value, setValue, isValid, errorMessage, isPristine } =
    useField(props);
  const {
    id,
    name,
    autoCapitalize = "none",
    autoCorrect = "false",
    disabled = false,
    defaultValue,
    required,
  } = props;

  return (
    <>
      <Checkbox
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900"
        )}
        id={id}
        name={name}
        value={value || false}
        checked={value || false}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        disabled={disabled}
        onCheckedChange={(checked) => setValue(checked)}
        defaultValue={defaultValue}
        required={required}
      />
      {!isValid && !isPristine && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </>
  );
};

export const DatePickerField = <FormattedValue = string,>(
  props: MyFieldProps<FormattedValue> | any
) => {
  const { value, setValue, isValid, errorMessage, isPristine } =
    useField(props);
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
    required,
    full,
    dateFormat = "MMM yyyy",
  } = props;
  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <div>
        <input
          className={cn(
            "w-0 h-0 overflow-hidden absolute top-0 left-0 opacity-0 pointer-events-none"
          )}
          id={id}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          type={type}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          disabled={disabled}
          onChange={(e) =>
            setValue(format(new Date(e.target.value), dateFormat))
          }
          defaultValue={defaultValue}
          required={required}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outlineSecondary"}
              className={cn(
                `${
                  full ? "w-full" : "w-[200px] md:w-[280px]"
                } justify-start text-left font-normal border-input`,
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(value, dateFormat)
              ) : (
                <span>{dictionary.PickADate}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={setValue}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {!isValid && !isPristine && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};
