import './App.css';
import { Router } from './Router';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
