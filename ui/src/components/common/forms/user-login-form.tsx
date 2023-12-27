import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import { InputField } from "./input";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { toast } from "../../ui/use-toast";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit?: () => void;
}

export function UserLoginForm({
  className,
  onSubmit,
  ...props
}: UserLoginFormProps) {
  const { dictionary } = useContext(LanguageContext);
  const form = useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const values = useFormFields({
    connect: form,
    selector: (field) => field.value,
  });

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log(values);
    // BE request for auth token

    setTimeout(() => {
      setIsLoading(false);
      toast({ variant: "destructive", description: dictionary.GenericError });
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Formiz connect={form} autoForm>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {dictionary.Email}
            </Label>
            <InputField
              id="email"
              name="email"
              placeholder={dictionary.Email}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              validations={[
                {
                  handler: (value: string) => value.includes("@"),
                  message: `${dictionary.InvalidEmail}`,
                },
              ]}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {dictionary.Password}
            </Label>
            <InputField
              id="password"
              name="password"
              placeholder={dictionary.Password}
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {dictionary.SignIn}
          </Button>
        </div>
      </Formiz>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {dictionary.OrSignInWith}
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        {dictionary.Google}
      </Button>
    </div>
  );
}
