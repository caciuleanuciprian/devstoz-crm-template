import { getIcon } from "@/components/clients/details/transactions/utils/consts";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";
import { Upload, X } from "lucide-react";
import { useContext } from "react";
import Dropzone from "react-dropzone";

interface UploadImageProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isReadonly: boolean;
  accept?: any;
}

export const UploadImage = ({
  file,
  setFile,
  isReadonly,
  accept = { "image/*": [".jpg", ".jpeg", ".png"] },
}: UploadImageProps) => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <Label>{dictionary.UploadFile}</Label>
      <Card className="border-dashed">
        <CardContent className="p-0">
          <div className="h-48 flex justify-center items-center">
            <Dropzone
              maxFiles={1}
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
              disabled={isReadonly}
              accept={accept}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`w-full h-full flex justify-center items-center ${
                    isReadonly
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col justify-center items-center gap-2 ">
                    {file ? (
                      <>
                        <div className="flex justify-center flex-col items-center gap-2">
                          <div className="relative">
                            {file.type.includes("image") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="organization logo"
                                className="w-32 h-32 relative rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-32 w-32 bg-secondary flex justify-center items-center rounded-md">
                                <div className="flex justify-center items-center flex-wrap flex-col gap-2">
                                  {getIcon(file.name)}
                                  <p className="text-xs">{file.name}</p>
                                </div>
                              </div>
                            )}

                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFile(null);
                              }}
                              className="absolute -top-3 -right-3 bg-red-500 cursor-pointer rounded-lg p-1 "
                            >
                              <X className="h-[1.2rem] w-[1.2rem]" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {dictionary.OnlyOneFile}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload />
                        <p className="text-xs text-muted-foreground">
                          {dictionary.DragAndDrop}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

type UploadFilesProps = {
  files: File[] | null;
  setFiles: (file: File[] | null) => void;
  isReadonly: boolean;
  accept: any;
};

export const UploadFiles = ({
  files,
  setFiles,
  isReadonly,
  accept = {},
}: UploadFilesProps) => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <Label>{dictionary.UploadFile}</Label>
      <Card className="border-dashed">
        <CardContent className="p-0">
          <div className="p-4 flex justify-center items-center">
            <Dropzone
              onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
              disabled={isReadonly}
              accept={accept}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`w-full h-full flex justify-center items-center ${
                    isReadonly
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="max-h-60 flex flex-col justify-center w-full items-center gap-2 overflow-auto">
                    {files && files.length > 0 ? (
                      files.map((file, index) => (
                        <div className="bg-secondary flex justify-between items-center flex-wrap rounded-md p-2 gap-2 w-full">
                          <div className="flex justify-center items-center gap-2">
                            {getIcon(file.name)}
                            <p className="text-xs">{file.name}</p>
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const filteredArr = files.filter(
                                (_el, idx) => idx !== index
                              );
                              setFiles(filteredArr);
                            }}
                            className="bg-red-500 cursor-pointer rounded-lg p-1 "
                          >
                            <X className="h-[1.2rem] w-[1.2rem]" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <Upload />
                        <p className="text-xs text-muted-foreground text-center">
                          {dictionary.DragAndDrop}
                        </p>
                        <p className="text-xs text-muted-foreground italic text-center">
                          {dictionary.MaxFileSize}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
