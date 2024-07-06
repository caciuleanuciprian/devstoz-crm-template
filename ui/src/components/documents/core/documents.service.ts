import { DOCUMENTS_URL } from "@/lib/axios/consts";
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
      `${DOCUMENTS_URL}?${params.toString()}`,
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
