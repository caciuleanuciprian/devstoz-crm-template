import { ORGANIZATION_URL, ROLES_URL, USERS_URL } from "@/lib/axios/consts";
import {
  authHeader,
  DefaultErrorResult,
  handleError,
} from "@/lib/axios/helpers";
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
          ...authHeader,
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
          ...authHeader,
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
        ...authHeader,
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetMembers = async ({
  organizationId,
}: {
  adminId: string;
  organizationId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.get(
      `${ORGANIZATION_URL}/${organizationId}/members`,
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
