const localStorageKey = '__fatcamp__';

const getToken = () => window.localStorage.getItem(localStorageKey);
const isLoggedIn = () => Boolean(getToken());
const handleLoginResponse = (token) => window.localStorage.setItem(localStorageKey, token);

export {
  getToken,
  handleLoginResponse,
  isLoggedIn,
};
