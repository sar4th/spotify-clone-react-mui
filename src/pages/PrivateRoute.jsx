import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Function to extract access token from the URL query parameters
    const getAccessTokenFromQueryParams = () => {
      const search = window.location.search.substring(1);
      const urlParams = new URLSearchParams(search);
      return urlParams.get("code");
    };

    // Get the access code from the query parameters
    const accessCode = getAccessTokenFromQueryParams();

    if (accessCode) {
      navigate("/dashboard");
    }
    // You can add further logic here based on the access code, e.g., exchange it for the access token
  }, [navigate]);

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
