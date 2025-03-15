import { Formiz, useForm, useFormFields } from "@formiz/core";
import { ExportPDF, GetAvailablePDF } from "../core/documents.service";
import useAxios from "@/lib/axios/useAxios";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import InputWithLabel from "@/components/common/forms/input-with-label";
import { isNotEmptyString, isRequired } from "@formiz/validations";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "@/components/ui/use-toast";
import { CheckboxInputWithText } from "@/components/common/forms/checkbox-with-text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DocumentCard } from "../atoms/document-card";
import TextareaWithLabel from "@/components/common/forms/textarea-with-label";
import DatePickerWithLabel from "@/components/common/forms/datepicker-with-label";
import { format } from "date-fns";

const dateFormat = "dd/MM/yyyy";

type SupportedFormTypes =
  | "text"
  | "number"
  | "textarea"
  | "checkbox"
  | "radiobox"
  | "date";

const typeOrder = [
  "text",
  "number",
  "textarea",
  "checkbox",
  "radiobox",
  "date",
];

export const DocumentsForm = ({ documentName }: { documentName: string }) => {
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const { dictionary } = useContext(LanguageContext);
  const [open, setOpen] = useState<boolean>(false);

  const pdfForm = useForm({
    initialValues: {},
  });

  const { data: pdfData2, isLoading: pdfIsLoading } = useAxios({
    fetchFn: GetAvailablePDF,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      name: documentName,
    },
    loadOnMount: true,
  });

  const pdfData = pdfData2 && Object.keys(pdfData2); // TODO: REMOVE THIS AFTER BE FIX

  const pdfFields: { id: string; type: SupportedFormTypes; value: string }[] =
    pdfData?.map((field: string) => {
      const splitField = field.split("_");
      return {
        id: field,
        type: splitField[0] as SupportedFormTypes,
        value: splitField[1],
      };
    });

  const values = useFormFields({
    connect: pdfForm,
    selector: (field) => field.value,
  });

  // TODO: Refactor this
  const buildPayload = (fields: any) => {
    const obj = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value instanceof Date) {
        //@ts-ignore
        obj[key] = format(new Date(value), dateFormat);
      } else {
        //@ts-ignore
        obj[key] = value;
      }
    }

    return { ...obj, "pdf-type": documentName };
  };

  const { data, error, isLoading, loadData, dataCode } = useAxios({
    fetchFn: ExportPDF,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      body: buildPayload(values),
    },
  });

  const handleSubmit = () => {
    loadData();
  };

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = `${documentName}.pdf`;
    const URL = window.URL || window.webkitURL;
    link.href = URL.createObjectURL(new Blob([data]));
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    pdfForm.reset();
  };

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ title: dictionary.ExportPDFSuccess, variant: "success" });
      handleDownloadFile();
    } else if (error) {
      toast({ title: dictionary.ExportPDFError, variant: "destructive" });
    }
  }, [dataCode, error]);

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DocumentCard
          title={documentName}
          file_type=".pdf"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[350px] md:max-w-[500px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{dictionary.GenerateDocument}</DialogTitle>
          <div className="flex w-full pt-2 flex-col rounded-md gap-2">
            <Formiz connect={pdfForm}>
              {(pdfFields?.length === 0 || !pdfFields) && !pdfIsLoading && (
                <div>{dictionary.NoFieldsAvailable}</div>
              )}
              {pdfFields &&
                pdfFields.length > 0 &&
                pdfFields
                  ?.sort(
                    (a, b) =>
                      typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
                  )
                  .map((field) => {
                    switch (field.type) {
                      case "text":
                        return (
                          <InputWithLabel
                            key={field.id}
                            label={dictionary.FirstName}
                            type={"text"}
                            name={field.value || "text"}
                            required={dictionary.FieldCannotBeEmpty}
                            validations={[
                              {
                                handler: isRequired() && isNotEmptyString(),
                              },
                            ]}
                          />
                        );
                        break;
                      case "number":
                        return (
                          <InputWithLabel
                            key={field.id}
                            label={dictionary.FirstName}
                            type={"number"}
                            name={field.value || "number"}
                            required={dictionary.FieldCannotBeEmpty}
                            validations={[
                              {
                                handler: isRequired() && isNotEmptyString(),
                              },
                            ]}
                          />
                        );
                        break;
                      case "textarea":
                        return (
                          <TextareaWithLabel
                            key={field.id}
                            label={dictionary.Date}
                            name={field.value || "textarea"}
                          />
                        );
                        break;
                      case "checkbox":
                        return (
                          <CheckboxInputWithText
                            key={field.id}
                            name={field.value || "checkbox"}
                            label={field.value}
                          />
                        );
                        break;
                      case "radiobox":
                        break;
                      case "date":
                        return (
                          <DatePickerWithLabel
                            key={field.id}
                            label={dictionary.Date}
                            type={"date"}
                            name={field.value || "date"}
                            required={dictionary.FieldCannotBeEmpty}
                            full
                            dateFormat={dateFormat}
                          />
                        );
                        break;
                      default:
                        break;
                    }
                  })}
            </Formiz>
          </div>
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
            disabled={isLoading || !pdfForm.isValid}
            className="text-xs flex items-center px-8"
          >
            {isLoading ? <Loader /> : dictionary.GenerateDocument}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
