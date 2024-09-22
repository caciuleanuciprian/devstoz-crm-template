import InputWithLabel from "@/components/common/forms/input-with-label";
import TextareaWithLabel from "@/components/common/forms/textarea-with-label";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import { isNotEmptyString, isRequired } from "@formiz/validations";
import { useContext, useEffect, useState } from "react";
import { PostEmail } from "../core/clients.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmailFormProps = {
  email: string;
};

export const EmailForm = ({ email }: EmailFormProps) => {
  const [open, setOpen] = useState(false);

  const { dictionary } = useContext(LanguageContext);
  const emailForm = useForm({
    initialValues: {
      subject: "",
      email: email,
      message: "",
    },
  });
  const values = useFormFields({
    connect: emailForm,
    selector: (field) => field.value,
  });

  const { error, loadData, dataCode, isLoading } = useAxios({
    fetchFn: PostEmail,
    paramsOfFetch: {
      body: {
        ...values,
      },
    },
  });

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_201_CREATED) {
      toast({ title: dictionary.PostEmailSuccess, variant: "success" });
    } else if (error) {
      toast({ title: dictionary.PostEmailError, variant: "destructive" });
    }
  }, [dataCode, error]);

  const handleSubmit = async () => {
    await loadData();
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <Mail className="h-[1.2rem] w-[1.2rem] mr-2" />
          <p>{dictionary.SendEmail}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dictionary.SendEmail}</DialogTitle>
          <DialogDescription>
            {dictionary.SendEmailDescription}
          </DialogDescription>
          <Formiz connect={emailForm}>
            <InputWithLabel
              label={dictionary.Subject}
              type={"text"}
              name={"subject"}
              required={dictionary.FieldCannotBeEmpty}
              validations={[
                {
                  handler: isRequired() && isNotEmptyString(),
                  message: `${dictionary.InvalidSubject}`,
                },
                {
                  handler: isNotEmptyString(),
                  message: `${dictionary.InvalidSubject}`,
                },
              ]}
            />
            <InputWithLabel
              label={dictionary.To}
              type={"text"}
              name={"to"}
              required={dictionary.FieldCannotBeEmpty}
              defaultValue={email}
              isDisabled
            />
            <TextareaWithLabel
              label={dictionary.EmailMessage}
              name="message"
              placeholder={dictionary.EmailMessagePlaceholder}
            />
          </Formiz>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              onClick={onCancel}
              type="button"
              className="text-xs flex items-center px-8"
            >
              {dictionary.Cancel}
            </Button>
          </DialogClose>
          <Button
            variant={"default"}
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
            className="text-xs flex items-center px-8"
          >
            {isLoading ? <Loader /> : dictionary.SendEmail}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
