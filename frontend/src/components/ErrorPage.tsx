import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  // console.error(error);
  return isRouteErrorResponse(error) ? (
    <div>This page doesn't exist </div>
  ) : 
  <div>Something went wrong</div>
};

export default ErrorPage;