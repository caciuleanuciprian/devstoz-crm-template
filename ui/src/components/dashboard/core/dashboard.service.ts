import { DefaultErrorResult, handleError } from "@/lib/axios/helpers";
import axios, { AxiosResponse } from "axios";

export const GetClients = async ({
  userId,
  page = 0,
  size = 10,
}: {
  userId: string;
  page: number;
  size: number;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  try {
    const response: any = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/users/${userId}/clients?${params.toString()}`
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetArchivedClients = async ({
  userId,
  page = 0,
  size = 10,
}: {
  userId: string;
  page: number;
  size: number;
  active: boolean;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    active: "false",
  });

  try {
    const response: any = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/users/${userId}/clients?${params.toString()}`
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};
