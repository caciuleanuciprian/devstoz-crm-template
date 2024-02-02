import {
  CLIENTS_PREFIX,
  CLIENTS_URL,
  TRANSACTIONS_PREFIX,
  TRANSACTIONS_URL,
} from "@/lib/axios/consts";
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
    const response: any = await axios.get(`${CLIENTS_URL}/${clientId}`);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const UpdateClient = async ({
  clientId,
  body,
}: {
  clientId: string;
  body: any;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.put(`${CLIENTS_URL}/${clientId}`, {
      clientId,
      ...body,
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const GetTransactions = async ({
  clientId,
  page = 0,
  size = 10,
}: {
  clientId: string;
  page: number;
  size: number;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  try {
    const response: any = await axios.get(
      `${CLIENTS_URL}/${clientId}${TRANSACTIONS_PREFIX}?${params.toString()}`
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const DeleteTransaction = async ({
  transactionId,
}: {
  transactionId: string;
}): Promise<any | DefaultErrorResult | AxiosResponse<any, any>> => {
  try {
    const response: any = await axios.delete(
      `${TRANSACTIONS_URL}/${transactionId}`
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};
