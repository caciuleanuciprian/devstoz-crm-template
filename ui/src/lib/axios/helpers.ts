import axios, { AxiosResponse } from "axios";

export enum AxiosStatusCode {
  CODE_200_OK = 200,
  CODE_201_CREATED = 201,
  CODE_202_ACCEPTED = 202,
  CODE_204_NO_CONTENT = 204,
  CODE_400_BAD_REQUEST = 400,
  CODE_401_UNAUTHORIZED = 401,
  CODE_403_FORBIDDEN = 403,
  CODE_404_NOT_FOUND = 404,
  CODE_500_INTERNAL_SERVER_ERROR = 500,
  CODE_503_SERVICE_UNAVAILABLE = 503,
}

export interface DefaultErrorResult {
  error: unknown;
  code?: number;
}

export type ErrorRes = {
  type: "error";
};

type ErrorResponse = DefaultErrorResult &
  ErrorRes & {
    result?: AxiosResponse<any, any> | unknown | undefined;
  };

export const handleError = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    return {
      error: error.message,
      code: error.response?.status,
      result: error.response,
      type: "error",
    };
  } else {
    return {
      error,
      result: null,
      type: "error",
    };
  }
};
