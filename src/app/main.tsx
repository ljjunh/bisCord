import App from '../pages/App';
import './index.css';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
