import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from './store'

import App from './App';
import reportWebVitals from './reportWebVitals';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
