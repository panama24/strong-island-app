import React from 'react';
import { withApollo } from 'react-apollo';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as authClient from '../utils/auth-client';
import { getToken, handleLoginResponse, handleLogoutResponse } from '../utils/auth';
import { useAsync } from '../utils/use-async';
import { useBootstrapAppData } from '../utils/bootstrap';

const Loader = () => <>Loading...</>;
const ME_QUERY = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      username
      email
      password
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      user {
        id
        email
        password
        username
      }
      token
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      id
      email
      password
      username
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      email
      password
      username
    }
  }
`;

const AuthContext = React.createContext();
const initialState = { user: null, error: null, isLoggedIn: false };
let AuthProvider = (props) => {
  const [userData, setUserData] = React.useState();

  React.useEffect(() => {
    getMe();
  }, [setUserData]);

  // getUser
  const [getMe, { data: getUserData, error: getUserError, loading: getUserLoading }] = useLazyQuery(ME_QUERY,
    { variables: { token: getToken() },
    onCompleted({ getUser }) {
      setUserData({ user: getUser, error: getUserError, isLoggedIn: true });
    }
  });

  // login
  const [login, { data: loginData, error: loginError }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      handleLoginResponse(login.token);
      setUserData({ user: login, error: loginError, isLoggedIn: true });
    }
  });

  // logout
  const [logout, { data: logoutData, error: logoutError }] = useMutation(LOGOUT_MUTATION, {
    onCompleted({ logout }) {
      handleLogoutResponse();
      setUserData({ user: null, error: logoutError, isLoggedIn: false });
    }
  });

  // signup
  const [signup, { data: signupData, error: signupError, loading: signupLoading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signup }) {
      handleLogoutResponse();
      setUserData({ user: null, error: signupError, isLoggedIn: false });
    }
  });

  const user = userData ? userData.user : null;

  const value = React.useMemo(() => ({ user, login, logout, signup }), [userData]);
  return <AuthContext.Provider value={value} {...props} />;
};

AuthProvider = withApollo(AuthProvider);

const useAuth = () => {
 const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }

  return context;
};

export { AuthProvider, useAuth };

