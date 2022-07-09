import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './pages';
import './index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
