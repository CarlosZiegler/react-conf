import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import { useSession } from "../../hooks";
import React, { PropsWithChildren } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const RequireAuth = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useSession();

  if (!user) {
    return (
      <Navigate to={routes.app.login} state={{ from: location }} replace />
    );
  }

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
