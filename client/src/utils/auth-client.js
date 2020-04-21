// api-client;
const localStorageKey = '__fatcamp__';

const client = async (endpoint, { body, ...customConfig } = {}) => {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = {'content-type': 'application/json'};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  console.log(process.env.REACT_APP_API_URL, endpoint);
  return window
    .fetch(`http://localhost:8000/graphql/${endpoint}`, config)
    .then(async res => {
      if (res.status === 401) {
        logout()
        // refresh the page for them
        window.location.assign(window.location);
        return;
      }

      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

const logout = () => {
  // do I need to clear apollo cache??
  window.localStorage.removeItem(localStorageKey);
};

// auth-client
const handleUserResponse = (token) => window.localStorage.setItem(localStorageKey, token);

const getUser = () => {
  const token = getToken();
  if (!token) {
    return null;
    // return Promise.resolve(null);
  }

  // me
  return client('currentUser').then(data => data.user);
};

const login = ({ email, password, username }) => {
  console.log(email, password);
  return client('login', { body: {
    email,
    password,
    username,
  }}).then(handleUserResponse);
};

const signup = ({ email, password }) => {
  return client('signup', {
    email,
    password,
  }).then(handleUserResponse);
};

const getToken = () => window.localStorage.getItem(localStorageKey);

const isLoggedIn = () => Boolean(getToken());

export {
  getToken,
  getUser,
  isLoggedIn,
  login,
  logout,
  signup,
};
