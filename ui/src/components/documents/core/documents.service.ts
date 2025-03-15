import {
  BASE_URL_AUTHORIZED,
  PDF_PREFIX,
  ORGANIZATION_URL,
  PDF_URL,
} from "@/lib/axios/consts";
import {
  authHeader,
  DefaultErrorResult,
  handleError,
} from "@/lib/axios/helpers";
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
          ...authHeader,
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
  page,
  size,
}: {
  organizationId: string;
  page: number;
  size: number;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    page: `${page}`,
    size: `${size}`,
  });
  try {
    const response: any = await axios.get(
      `${ORGANIZATION_URL}/${organizationId}/documents?${params}`,
      {
        headers: {
          ...authHeader,
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
  body: { file: File };
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.post(
      `${ORGANIZATION_URL}/${organizationId}/documents`,
      {
        file: body.file,
        name: body.file.name,
        type: "TYPE1",
      },
      {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          ...authHeader,
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetDocumentFile = async ({
  organizationId,
  documentId,
}: {
  organizationId: string;
  documentId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.get(
      `${ORGANIZATION_URL}/${organizationId}/documents/${documentId}`,
      {
        responseType: "blob",
        headers: {
          ...authHeader,
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const DeleteDocument = async ({
  organizationId,
  documentId,
}: {
  organizationId: string;
  documentId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.delete(
      `${ORGANIZATION_URL}/${organizationId}/documents/${documentId}`,
      {
        headers: {
          ...authHeader,
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetAvailablePDFs = async ({
  organizationId,
}: {
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    organizationId: organizationId,
  });
  try {
    const response: any = await axios.get(`${PDF_URL}?${params}`, {
      headers: {
        ...authHeader,
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetAvailablePDF = async ({
  organizationId,
  name,
}: {
  organizationId: string;
  name: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    organizationId: organizationId,
  });
  try {
    const response: any = await axios.get(`${PDF_URL}/${name}?${params}`, {
      headers: {
        ...authHeader,
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};
