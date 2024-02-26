import { useForm, useFormFields } from "@formiz/core";
import { SelectLanguageOptions, SelectCurrencyOptions } from "./utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CreateUserOrganization } from "../authentication/core/authentication.service";
import { selectedOrganizationAtom } from "../authentication/utils/authentication.recoil";
import { Button } from "../ui/button";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "../ui/use-toast";
import { InitialSettingsForm } from "./molecules/initial-settings-form";
import {
  initialSettingsCurrencyAtom,
  initialSettingsLanguageAtom,
} from "./core/initial-settings.recoil";
import { useNavigate } from "react-router-dom";
import { PagesURL } from "../authentication/utils/consts";
import { Loader } from "../common/loader";

export const InitialSettings = () => {
  const initialSettingsForm = useForm();
  const [file, setFile] = useState<File | null>(null);
  const { dictionary, userLanguageChange }: any = useContext(LanguageContext);
  const [, setSelectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const navigate = useNavigate();

  const [selectedCurrency, setSelectedCurrency] = useRecoilState(
    initialSettingsCurrencyAtom
  );
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(
    initialSettingsLanguageAtom
  );

  const values = useFormFields({
    connect: initialSettingsForm,
    selector: (field) => field.value,
  });

  const { data, loadData, error, dataCode, isLoading } = useAxios({
    fetchFn: CreateUserOrganization,
    paramsOfFetch: {
      body: {
        organizationLogo: file,
        name: values.name,
        language: selectedLanguage,
        currency: selectedCurrency,
        logoName: file?.name,
      },
    },
  });

  const resetForm = () => {
    initialSettingsForm.reset({ only: ["values"] });
    setFile(null);
    setSelectedLanguage(SelectLanguageOptions.en);
    setSelectedCurrency(SelectCurrencyOptions.USD);
  };

  const handleSubmit = async () => {
    if (
      initialSettingsForm.isValid &&
      file &&
      selectedLanguage &&
      selectedCurrency
    ) {
      await loadData();
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedOrganization(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_201_CREATED) {
      toast({ title: dictionary.OrganizationCreated, variant: "success" });
      setSelectedOrganization(data);
      userLanguageChange(data.language);
      navigate(PagesURL.DASHBOARD);
    } else if (dataCode === AxiosStatusCode.CODE_401_UNAUTHORIZED) {
      toast({ title: dictionary.UserDetailsError, variant: "destructive" });
      navigate(PagesURL.AUTHENTICATION);
    } else if (error) {
      toast({
        title: dictionary.OrganizationCreateError,
        variant: "destructive",
      });
      resetForm();
    }
  }, [dataCode, error]);

  // const {
  //   data: updatedOrganization,
  //   loadData: updateOrganization,
  //   error: updatedError,
  //   dataCode: updatedDataCode,
  //   isLoading: updatedIsLoading,
  // } = useAxios({
  //   fetchFn: UpdateUserOrganization,
  //   paramsOfFetch: {
  //     userId: userDetails?.id,
  //     body: {
  //       name: values.name,
  //       language,
  //       currency,
  //       logoName: values.logoName,
  //     },
  //     organizationId: selectedOrganization?.id,
  //   },
  // });

  // const handleUpdate = async () => {
  //   await updateOrganization();
  //   setIsReadonly(true);
  // };

  // useEffect(() => {
  //   if (selectedOrganization) {
  //     initialSettingsForm.setValues({
  //       name: selectedOrganization.name,
  //       logoName: selectedOrganization.logoName,
  //     });
  //     setLanguage(selectedOrganization.language);
  //     setCurrency(selectedOrganization.currency);
  //   }
  // }, [data, updatedOrganization]);

  // useEffect(() => {
  //   if (updatedOrganization) {
  //     setSelectedOrganization(updatedOrganization);
  //   }
  // }, [updatedOrganization]);

  // useEffect(() => {
  //   if (updatedDataCode === AxiosStatusCode.CODE_200_OK) {
  //     toast({ title: dictionary.OrganizationUpdated, variant: "success" });
  //   } else if (updatedError) {
  //     toast({
  //       title: dictionary.OrganizationUpdateError,
  //       variant: "destructive",
  //     });
  //     resetForm();
  //   }
  // }, [updatedDataCode, updatedError]);

  return (
    <>
      <div className="my-4 p-4 bg-secondary rounded-md">
        <div className="p-4 bg-background rounded-md">
          <InitialSettingsForm
            form={initialSettingsForm}
            file={file}
            setFile={setFile}
            isReadonly={isLoading}
          />
          <div className="flex gap-4 justify-end">
            <Button
              onClick={resetForm}
              variant={"outline"}
              disabled={isLoading}
            >
              {dictionary.Reset}
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <Loader /> : dictionary.Submit}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
