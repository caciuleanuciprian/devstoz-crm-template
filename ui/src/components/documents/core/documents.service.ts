import {
  DOCUMENTS_URL,
  DOCUMENTS_URL_TEMP,
  ORGANIZATION_PREFIX,
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
      `${DOCUMENTS_URL_TEMP}?${params.toString()}`,
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
      `${DOCUMENTS_URL}${ORGANIZATION_PREFIX}?${params.toString()}`,
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
      `${DOCUMENTS_URL}${ORGANIZATION_PREFIX}?${params.toString()}`,
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
