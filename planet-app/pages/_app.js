import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function PlanetApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default PlanetApp;
