import { Suspense, lazy } from 'react';
import { useModalStore } from '@/shared/model/store/modalStore';
import { useWebSocket } from '@/shared/lib/hooks/useWebSocket';
import { MODAL } from '@/shared/model/constants/modal';
import './App.css';
import { Router } from './Router';
import { DetectorProvider } from './providers/detectorProvider';
import { QueryProvider } from './providers/queryProvider';
import { ToastProvider } from './providers/toastProvider';

const CallNotificationModal = lazy(
  () => import('@/features/directMessage/ui/CallNotificationModal'),
);

function App() {
  useWebSocket();
  const modalType = useModalStore((state) => state.type);

  return (
    <QueryProvider>
      <ToastProvider>
        <DetectorProvider>
          <Suspense fallback={<CallNotificationModal />}>
            {modalType === MODAL.CALL_NOTIFICATION && <CallNotificationModal />}
          </Suspense>
          <Router />
        </DetectorProvider>
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
