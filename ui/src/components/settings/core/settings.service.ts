import { USERS_URL } from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const UpdateUserOrganization = async ({
  userId,
  body,
  organizationId,
}: {
  userId: string;
  body: any;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  console.log(body);
  try {
    const response: any = axios.put(
      `${USERS_URL}/${userId}/organizations/${organizationId}`,
      body,
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

export const UpdateOrganizationLogo = async ({
  userId,
  body,
  organizationId,
}: {
  userId: string;
  body: any;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  console.log(body);
  try {
    const response: any = axios.put(
      `${USERS_URL}/${userId}/organizations/${organizationId}`,
      body,
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
