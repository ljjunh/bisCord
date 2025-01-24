import createActivityDetector from 'activity-detector';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/shared/model/authStore';
import { LOGIN_STATUS } from '@/entities/user/model/constants';

interface DetectorProviderProps {
  children: ReactNode;
}

const IDLE_TIMEOUT = 30 * 60 * 1000;

export const DetectorProvider = ({ children }: DetectorProviderProps) => {
  const { setLoginStatus } = useAuthStore.getState();

  useEffect(() => {
    const detector = createActivityDetector({
      timeToIdle: IDLE_TIMEOUT,
    });

    detector.on('active', () => {
      setLoginStatus(LOGIN_STATUS.ONLINE);
    });

    detector.on('idle', () => {
      setLoginStatus(LOGIN_STATUS.AWAY);
    });

    return () => detector.stop();
  }, [setLoginStatus]);

  return <>{children}</>;
};
