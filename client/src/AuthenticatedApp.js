import React from "react";
import { useAuth } from "./context/auth-context";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      AuthenticatedApp
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export { AuthenticatedApp };
