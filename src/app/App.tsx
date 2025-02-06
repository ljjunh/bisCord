import { useModalStore } from '@/shared/model/modalStore';
import { CallNotificationModal } from '@/features/directMessage/ui/CallNotificationModal';
import { useWebSocket } from '@/shared/lib/useWebSocket';
import './App.css';
import { Router } from './Router';
import { DetectorProvider } from './providers/detectorProvider';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';

function App() {
  useWebSocket();
  const modalType = useModalStore((state) => state.type);

  return (
    <QueryProvider>
      <ToastProvider>
        <DetectorProvider>
          {modalType === 'CALL_NOTIFICATION' && <CallNotificationModal />}
          <Router />
        </DetectorProvider>
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
