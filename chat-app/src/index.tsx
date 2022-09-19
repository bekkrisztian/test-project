import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
    // <React.StrictMode>
    // </React.StrictMode>
);
