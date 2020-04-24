import React from 'react';
import { useAuth } from './context/auth-context';

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
    setValues(initialValues);
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

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      AuthenticatedApp
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const UnauthenticatedApp = () => {
  const { loading, login, signup } = useAuth();

  if (loading) {
    return <Loader />;
  }

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
  return (
    <React.Suspense fallback={<Loader />}>
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </React.Suspense>
  );
}

export { App };
