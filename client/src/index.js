import React from 'react';
import { render } from 'react-dom';
import { AppProviders } from './context/AppProviders';
import { App } from './App';

render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
