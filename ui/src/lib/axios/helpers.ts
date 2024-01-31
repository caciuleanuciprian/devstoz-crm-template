import axios, { AxiosResponse } from "axios";

export enum AxiosStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
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
