import React from "react";
import { AuthForm } from "./components/forms/AuthForm";
import { Loader } from "./components/Loader";
import { useAuth } from "./context/auth-context";

const UnauthenticatedApp = () => {
  const { loading, login, signup } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <AuthForm mutation={login} title="Login" />
      <AuthForm mutation={signup} title="Signup" />
    </div>
  );
};

export { UnauthenticatedApp };
