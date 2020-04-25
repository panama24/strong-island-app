import React from "react";
import { useForm } from "../useForm";
import { loginSchema, signupSchema } from "./schema";

const AUTHFORM = {
  Login: "login",
  Signup: "signup",
};

const formatValues = (state) =>
  Object.keys(state).map((k) => ({
    [k]: state[k].value,
  }));

const errorStyle = {
  color: "red",
  fontSize: "11px",
};

const AuthForm = ({ mutation, title }) => {
  const onSubmitCB = () => mutation({ variables: formatValues(state) });
  const { disable, onChangeHandler, onSubmitHandler, state } = useForm(
    title.toLowerCase() === AUTHFORM.Login ? loginSchema : signupSchema,
    onSubmitCB
  );

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={onSubmitHandler}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={(e) => onChangeHandler(e)}
          value={state.username.value}
        />
        {state.username.error && (
          <span style={errorStyle}>{state.username.error}</span>
        )}
        <label>Email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => onChangeHandler(e)}
          value={state.email.value}
          placeholder="example@example.com"
        />
        {state.email.error && (
          <span style={errorStyle}>{state.email.error}</span>
        )}
        <label>Password:</label>
        <input
          type="text"
          name="password"
          onChange={(e) => onChangeHandler(e)}
          value={state.password.value}
          placeholder="Hello123!"
        />
        {state.password.error && (
          <span style={errorStyle}>{state.password.error}</span>
        )}
        {title.toLowerCase() === AUTHFORM.Login && (
          <a href="#">Forgot password?</a>
        )}
        <button disabled={disable}>Submit</button>
      </form>
    </div>
  );
};

export { AuthForm };
