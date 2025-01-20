import './App.css';
import { RouterProvider } from './providers/RouterProvider';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <RouterProvider />
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
