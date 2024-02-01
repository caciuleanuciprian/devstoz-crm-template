import { CLIENTS_URL } from "@/lib/axios/consts";
import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const AddClient = async ({
  userId,
  body,
}: {
  userId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.post(`${CLIENTS_URL}`, {
      userId,
      ...body,
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const DeleteClient = async ({
  clientId,
}: {
  clientId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.delete(`${CLIENTS_URL}/${clientId}`);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetClient = async ({
  clientId,
}: {
  clientId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    console.log(clientId);
    const response: any = await axios.get(`${CLIENTS_URL}/${clientId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
