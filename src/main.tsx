import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/globals.scss';
import App from './App.tsx';
import '../src/app/styles/globals.scss';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
