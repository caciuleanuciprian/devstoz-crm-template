import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export const GetClients = async ({
  userId,
}: {
  userId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}/clients`
    );
    console.log(response);
    return response;
  } catch (error) {
    return handleError(error);
  }
};
