import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useAuth } from './context/auth-context';
import { handleLoginResponse, isLoggedIn } from './utils/auth';
import { useBootstrapAppData } from './utils/bootstrap';

const initialValues = { email: '', password: '', username: '' };
const AuthForm = ({ onSubmit }) => {
  const [values, setValues] = React.useState(initialValues);

  const handleChange = (e) => setValues({
    ...values,
    [e.target.name]: e.target.value,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit({ variables: values })
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Username:</label>
      <input
        type='text'
        name='username'
        onChange={handleChange}
        value={values.username || ''}
      />
      <label>Email:</label>
      <input
        type='text'
        name='email'
        onChange={handleChange}
        value={values.email || ''}
      />
      <label>Password:</label>
      <input
        type='text'
        name='password'
        onChange={handleChange}
        value={values.password || ''}
      />
      <button>Submit</button>
    </form>
  );
};

const AuthenticatedApp = () => <>AuthenticatedApp </>

const UnauthenticatedApp = () => {
  const { login, signup } = useAuth();
  return (
    <div>
      <div>
        <p>Login</p>
        <AuthForm onSubmit={login} />
      </div>
      <div>
        <p>Signup</p>
        <AuthForm onSubmit={signup} />
      </div>
    </div>
  );
};

const Loader = () => <>Loading...</>;
const App = () => {
  const { user } = useAuth();
  console.log('***********:', user);
  return (
    <React.Suspense fallback={<Loader />}>
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </React.Suspense>
  );
}

export { App };
