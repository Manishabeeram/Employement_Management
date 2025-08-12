import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The Provider makes the Redux store available to all child components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
