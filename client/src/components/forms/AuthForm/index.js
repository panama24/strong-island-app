import React from "react";
import { useForm } from "../useForm";
import { loginSchema, signupSchema } from "./schema";

const AUTHFORM = {
  Login: "login",
  Signup: "signup",
};

/*
state = {
  email: { error: '', value: ''},
  password: { error: '', value: ''},
  username: { error: '', value: ''},
}
*/

const formatValues = (state) =>
  Object.keys(state).map((k) => ({
    [k]: state[k].value,
  }));

const errorStyle = {
  color: "red",
  fontSize: "13px",
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
          onChange={onChangeHandler}
          value={state.username.value}
        />
        {state.username.error && (
          <span style={errorStyle}>{state.username.error}</span>
        )}
        <label>Email:</label>
        <input
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={state.email.value}
        />
        {state.email.error && (
          <span style={errorStyle}>{state.email.error}</span>
        )}
        <label>Password:</label>
        <input
          type="text"
          name="password"
          onChange={onChangeHandler}
          value={state.password.value}
        />
        {state.password.error && (
          <span style={errorStyle}>{state.password.error}</span>
        )}
        <button disabled={disable}>Submit</button>
      </form>
    </div>
  );
};

export { AuthForm };
