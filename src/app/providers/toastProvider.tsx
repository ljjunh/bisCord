import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactElement } from 'react';
import { toastConfig } from '@/shared/config/toast';

type ToastProviderProps = {
  children: ReactElement;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer {...toastConfig} />
    </>
  );
};
