import InputWithLabel from "@/components/common/forms/input-with-label";
import TextareaWithLabel from "@/components/common/forms/textarea-with-label";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import { isNotEmptyString, isRequired } from "@formiz/validations";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostEmail } from "../core/clients.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadFiles } from "@/components/common/settings/molecules/upload-image";

type EmailFormProps = {
  email: string;
  clientName: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EmailForm = ({
  email,
  clientName,
  open = false,
  setOpen,
}: EmailFormProps) => {
  const { dictionary } = useContext(LanguageContext);
  const [files, setFiles] = useState<File[] | null>(null);
  const emailForm = useForm({
    initialValues: {
      subject: "",
      to: email,
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
        clientName: clientName,
        files: files,
      },
    },
  });

  useEffect(() => {
    setFiles(null);
  }, [open]);

  useEffect(() => {
    // TODO: Change to 201 when BE supports it
    if (dataCode === AxiosStatusCode.CODE_200_OK) {
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
      <DialogContent
        className="max-w-[350px] md:max-w-[500px] max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
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
            <UploadFiles
              files={files}
              setFiles={setFiles}
              isReadonly={false}
              accept={{}}
            />
          </Formiz>
        </DialogHeader>
        <DialogFooter className="gap-2">
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
            disabled={isLoading || !emailForm.isValid}
            className="text-xs flex items-center px-8"
          >
            {isLoading ? <Loader /> : dictionary.SendEmail}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
