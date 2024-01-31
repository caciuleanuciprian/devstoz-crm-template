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
