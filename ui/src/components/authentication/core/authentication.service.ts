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
