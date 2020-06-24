import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  Component: any;
  path: string;
  exact?: boolean;
  isAuthenticated: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({ Component, path, exact = false, isAuthenticated, redirectPath }: Props): JSX.Element => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        isAuthenticated ? (
          Component
        ) : (
          <Redirect
            to={{ pathname: redirectPath, state: { message: 'Please log in to view this page', requestedPath: path } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
