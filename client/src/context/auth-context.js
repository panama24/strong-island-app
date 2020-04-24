import React from 'react';
import { withApollo } from 'react-apollo';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { getToken, handleLoginResponse, handleLogoutResponse } from '../utils/auth';

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
let AuthProvider = (props) => {
  const [userData, setUserData] = React.useState();

  React.useEffect(() => {
    getMe();
  }, []);

  // getUser
  const [getMe, meData] = useLazyQuery(ME_QUERY,
    { variables: { token: getToken() },
    onCompleted({ getUser }) {
      setUserData({
        user: getUser,
        error: meData.error,
        loading: meData.loading,
        isLoggedIn: true
      });
    }
  });

  // login
  const [login, loginData] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      handleLoginResponse(login.token);
      setUserData({
        error: loginData.error,
        isLoggedIn: true,
        loading: loginData.loading,
        user: login,
      });
    }
  });

  // logout
  const [logout, logoutData] = useMutation(LOGOUT_MUTATION, {
    onCompleted({ logout }) {
      handleLogoutResponse();
      setUserData({
        user: null,
        error: logoutData.error,
        isLoggedIn: false,
        loading: false,
      });
    }
  });

  // signup
  const [signup, signupData] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signup }) {
      handleLogoutResponse();
      setUserData({
        user: null,
        error: signupData.error,
        isLoggedIn: false,
        loading: signupData.loading,
      });
    }
  });

  const error = userData ? userData.error : null;
  const loading = userData ? userData.loading : false;
  const user = userData ? userData.user : null;

  const value = React.useMemo(() => ({
        error,
        loading,
        login,
        logout,
        signup,
        user,
  }), [
    error,
    loading,
    login,
    logout,
    signup,
    user,
  ]);

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

