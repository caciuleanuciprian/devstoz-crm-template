import { useEffect, useState } from "react";
import { AxiosResponse, AxiosHeaders } from "axios";

type ExpectedResponse = AxiosResponse | any;

interface useAxiosProps {
  fetchFn: (paramsOfFetch: any) => Promise<ExpectedResponse | any>;
  paramsOfFetch: object;
  loadOnMount?: boolean;
}

const useAxios = ({
  loadOnMount = false,
  fetchFn,
  paramsOfFetch,
}: useAxiosProps) => {
  const [data, setData] = useState<ExpectedResponse | null>(null);
  const [response, setResponse] = useState<ExpectedResponse>(null);
  const [headers, setHeaders] = useState<AxiosHeaders>();
  const [error, setError] = useState(null);
  const [dataCode, setDataCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (overwriteParams?: object) => {
    setIsLoading(true);
    setError(null);
    setDataCode(null);

    const params = {
      ...paramsOfFetch,
      ...overwriteParams,
    };

    try {
      const response: any = await fetchFn(params);
      setResponse(response);
      !response.error
        ? (setData(response?.data), setDataCode(response.status))
        : (setError(response.error), setDataCode(response.code));
      setHeaders(response.headers);
      setIsLoading(false);
      return response;
    } catch (error: any) {
      setError(error);
      setDataCode(error.status);
      setIsLoading(false);
      return error;
    }
  };

  useEffect(() => {
    loadOnMount && loadData();
  }, []);

  return {
    data,
    response,
    headers,
    error,
    dataCode,
    isLoading,
    loadData,
  };
};

export default useAxios;
