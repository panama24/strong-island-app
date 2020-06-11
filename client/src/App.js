import React from "react";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

import { toGenerateWorkout } from "./utils/generateWorkout";

const App = () => {
  const { user } = useAuth();
  const timeDomain = 40;
  React.useEffect(() => {
    console.log(toGenerateWorkout(timeDomain));
  }, []);
  return (
    <React.Suspense fallback={<Loader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
