import './App.css';
import { Router } from './Router';
import { DetectorProvider } from './providers/detectorProvider';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <DetectorProvider>
          <Router />
        </DetectorProvider>
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
