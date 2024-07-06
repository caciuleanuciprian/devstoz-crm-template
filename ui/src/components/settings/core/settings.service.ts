import { ORGANIZATION_URL, ROLES_URL, USERS_URL } from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const UpdateUserOrganization = async ({
  body,
  organizationId,
}: {
  userId: string;
  body: any;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.patch(
      `${ORGANIZATION_URL}/${organizationId}`,
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
  body,
  organizationId,
}: {
  userId: string;
  body: any;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.put(
      `${ORGANIZATION_URL}/${organizationId}/logo`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const AddMember = async ({
  adminId,
  body,
}: {
  adminId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.put(`${ROLES_URL}/${adminId}`, body, {
      headers: {
        Authorization:
          //@ts-ignore
          "Bearer " + localStorage.getItem("idToken").replace(/['"]+/g, ""),
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetMembers = async ({
  adminId,
  organizationId,
}: {
  adminId: string;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.get(
      `${ROLES_URL}/${organizationId}/${adminId}`,
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
