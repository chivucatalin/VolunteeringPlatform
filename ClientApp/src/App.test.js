import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
    <MemoryRouter>
      <App />
    </MemoryRouter>
    </Provider>);
  await new Promise(resolve => setTimeout(resolve, 1000));
});

