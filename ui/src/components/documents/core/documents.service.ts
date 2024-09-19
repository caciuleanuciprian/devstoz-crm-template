import {
  BASE_URL_AUTHORIZED,
  ORGANIZATION_PREFIX,
  ORGANIZATION_URL,
} from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const ExportPDF = async ({
  organizationId,
  body,
}: {
  organizationId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    organizationId: organizationId,
  });
  try {
    const response: any = await axios.post(
      `${BASE_URL_AUTHORIZED}/pdfs?${params.toString()}`,
      {
        ...body,
      },
      {
        responseType: "arraybuffer",
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + localStorage.getItem("idToken").replace(/['"]+/g, ""),
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetOrganizationsDocuments = async ({
  organizationId,
}: {
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    organizationId: organizationId,
  });
  try {
    const response: any = await axios.get(
      `${ORGANIZATION_URL}/${organizationId}/documents`,
      {
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + localStorage.getItem("idToken").replace(/['"]+/g, ""),
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const UploadOrganizationsDocuments = async ({
  organizationId,
  body,
}: {
  organizationId: string;
  body: { name: string; type: string; file: File };
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    organizationId: organizationId,
  });
  try {
    const response: any = await axios.post(
      `${ORGANIZATION_URL}/${organizationId}/documents`,
      body,
      {
        responseType: "blob",
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + localStorage.getItem("idToken").replace(/['"]+/g, ""),
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};
