import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);
  return isRouteErrorResponse(error) ? (
    <div>{error.data}</div>
  ) : 
  <div>Something went wrong</div>
};

export default ErrorPage;