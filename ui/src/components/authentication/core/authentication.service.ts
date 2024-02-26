import { ORGANIZATION_URL, USERS_URL } from "@/lib/axios/consts";
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

export const GetUserOrganizations = async ({
  userId,
}: {
  userId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = axios.get(`${USERS_URL}/${userId}/organizations`, {
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

export const CreateUserOrganization = async ({
  body,
}: {
  userId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  console.log(body);
  try {
    const response: any = axios.post(`${ORGANIZATION_URL}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
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
