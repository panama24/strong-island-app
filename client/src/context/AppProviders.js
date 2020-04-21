import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

const localStorageKey = '__fatcamp__';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: (operation) => {
    const token = localStorage.getItem(localStorageKey);
    operation.setContext({
      headers: {
        authorization: token,
      }
    });
  },
});

const AppProviders = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AuthProvider>
          <UserProvider>
            { children }
          </UserProvider>
        </AuthProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export { AppProviders };
