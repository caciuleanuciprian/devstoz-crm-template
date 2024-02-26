import { ORGANIZATION_URL } from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const GetClients = async ({
  organizationId,
  page = 0,
  size = 10,
  active,
  clientType,
  nameSearchText = "",
}: {
  organizationId: string;
  page: number;
  size: number;
  active: boolean;
  clientType?: string;
  nameSearchText?: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  console.log(organizationId);
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (nameSearchText) {
    params.append("nameSearchText", nameSearchText);
  }

  if (active !== null && active !== undefined) {
    params.append("active", active.toString());
  }

  if (clientType) {
    params.append("clientType", clientType);
  }

  try {
    const response: any = await axios.get(
      `${ORGANIZATION_URL}/${organizationId}/clients?${params.toString()}`,
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
