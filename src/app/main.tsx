import App from '../pages/App';
import './index.css';
import { QueryProvider } from './providers';
import { queryClient } from '@/shared/api';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider client={queryClient}>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
