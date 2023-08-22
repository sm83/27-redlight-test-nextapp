'use client';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from '../store/index';

export default function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
