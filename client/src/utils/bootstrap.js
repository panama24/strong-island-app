import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as auth from './auth-client'
import { getToken } from '../utils/auth';

const ME_QUERY = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      username
      email
      password
    }
  }
`;

const useMeQuery = (token) => {
  const [getMe, { data, error, loading }] = useLazyQuery(ME_QUERY, { variables: { token } });
  return {
    getMe,
    user: data?.getUser,
    error,
    loading,
  };
};

const useBootstrapAppData = () => {
  const [appData, setAppData] = React.useState({ user: null });

  const { getMe } = useMeQuery();
  if (auth.isLoggedIn()) {
    const token = getToken();
    const { user } = getMe(token);
    setAppData({ user });
  }

  return appData;
};

export { useBootstrapAppData };
