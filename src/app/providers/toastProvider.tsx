import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactElement } from 'react';

const TOAST_CONFIG = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
} as const;

type ToastProviderProps = {
  children: ReactElement;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer {...TOAST_CONFIG} />
    </>
  );
};
