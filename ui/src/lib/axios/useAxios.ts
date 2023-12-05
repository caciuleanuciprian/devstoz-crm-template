import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

/**
 * Generic T - represents the data returned from API request.
 *
 * Generic D - represents the body data of the Axios
 * request (usually does not exist in GET method).
 *
 * @param {boolean=} manual - represents either if the request should
 * be triggered on mount or manually (on function call).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAxios = <T, D = any>(
  axiosParams: AxiosRequestConfig<D>,
  manual: boolean = false
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | unknown>();
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef(new AbortController());
  const cancelRequest = () => {
    controllerRef.current.abort();
  };

  const fetchData = async (params: AxiosRequestConfig<D>) => {
    try {
      const result = await axios.request<T>({
        ...params,
        signal: controllerRef.current.signal,
      });
      setResponse(result.data);
    } catch (err: AxiosError | unknown) {
      if (axios.isAxiosError(err)) {
        setError(err);
        // this will narrow the type :)
        // Access to config, request, and response
      } else {
        setError(err);
        // Just a stock error
      }
    } finally {
      setLoading(false);
    }
  };

  !manual
    ? useEffect(() => {
        fetchData(axiosParams);
      }, [])
    : "";

  return { cancelRequest, response, error, loading, fetchData };
};

// Usage example:
//
// const params = {
//   method: "POST",
//   url: "/posts",
//   headers: { accept: "*/*" },
//   data: {
//     userId: 1,
//     id: 19392,
//     title: "title",
//     body: "Sample text",
//   },
// };
//
// const { response, loading, error, fetchData } = useAxios(params, true);
