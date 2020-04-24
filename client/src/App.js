import React from "react";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

const App = () => {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
