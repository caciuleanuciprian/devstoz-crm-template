import { authHeader } from "./../../../lib/axios/helpers";
import { DEMO_AUTH_URL, ORGANIZATION_URL, USERS_URL } from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const GetGoogleAuth = async ({
  code,
  redirect_uri,
  grant_type,
  client_id,
  client_secret,
}: {
  code: string;
  redirect_uri: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: grant_type,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
        },
      }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.get(`${USERS_URL}?email=${email}`, {
      headers: {
        ...authHeader,
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetUserOrganizations = async ({
  userId,
}: {
  userId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.get(`${USERS_URL}/${userId}/organizations`, {
      headers: {
        ...authHeader,
      },
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const CreateUserOrganization = async ({
  body,
}: {
  userId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.post(
      `${ORGANIZATION_URL}`,
      { ...body, organizationLogo: null },
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

export const PostOTPCode = async ({
  email,
}: {
  email: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.post(`${DEMO_AUTH_URL}/codes`, {
      email: email,
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const PostOTPToken = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.post(`${DEMO_AUTH_URL}/token`, {
      email: email,
      code: code,
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};
