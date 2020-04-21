import React from 'react';

const STATUS = {
  Error: 'error',
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
};

const initialState = { status: STATUS.Idle, data: null, error: null };
const useAsync = () => {
  const [{ data, error, status }, setState] = React.useReducer((s, a) => ({ ...s, ...a }), initialState);

  const run = React.useCallback((promise) => {
    if (!promise || !promise.then) {
      throw new Error (
        `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
      );
    }

    setState({ status: STATUS.Loading });
    return promise.then(
      data => {
        setState({ data, status: STATUS.Success });
        return data;
      },
      error => {
        setState({ error, status: STATUS.Error });
        return error;
      },
    );
  },
    [setState]
  );

  const setData = React.useCallback(data => setState({ data }), [setState]);
  const setError = React.useCallback(error => setState({ error }), [setState]);
  const reset = React.useCallback(() => setState(initialState), [setState]);

  return {
    isError: status === STATUS.Error,
    isIdle: status === STATUS.Idle,
    isLoading: status === STATUS.Loading,
    isSuccess: status === STATUS.Success,

    data,
    error,
    reset,
    run,
    setData,
    setError,
    status,
  };
};

export { useAsync };
