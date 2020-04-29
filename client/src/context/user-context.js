import React from "react";
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from "apollo-boost";

/*
const ALL_USERS = gql`
  {
    getUsers {
      id
      username
    }
  }
`;
*/

const UserContext = React.createContext();

const UserProvider = (props) => {
  if (false) {
    return <>Loading...</>;
  }

  return <UserContext.Provider value={{}} {...props} />;
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
