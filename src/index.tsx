import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './theme/element-#048F74/index.css';
import 'normalize.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/css/dw-common.css';
import './assets/css/dw-element-style-override.css';
import 'animate.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 