import { useRouteError } from "react-router-dom";

interface RouterErrorProps {
  statusText: string;
  message: string;
}

const Error = () => {
  const error = useRouteError() as RouterErrorProps;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default Error;
