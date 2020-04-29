import React from "react";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

import { toAmrap } from "./utils/amrap";

const App = () => {
  const { user } = useAuth();
  const timeDomain = 15;
  console.log(toAmrap(timeDomain));
  return (
    <React.Suspense fallback={<Loader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
