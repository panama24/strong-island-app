import React from "react";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

import {
  workout,
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
} from "./mockData";

const App = () => {
  const { user } = useAuth();

  console.log(
    gymnasticMovements,
    monostructuralMovements,
    weightliftingMovements
  );
  return (
    <React.Suspense fallback={<Loader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
