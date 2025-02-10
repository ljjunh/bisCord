import createActivityDetector from 'activity-detector';
import { ReactNode, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/model/store/authStore';
import { useDetectorStore } from '@/shared/model/store/detectorStore';
import { userQueries } from '@/features/user/api/queries';
import { LOGIN_STATUS } from '@/entities/user/model/constants';

interface DetectorProviderProps {
  children: ReactNode;
}

const IDLE_TIMEOUT = 30 * 60 * 1000;

export const DetectorProvider = ({ children }: DetectorProviderProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setDetector } = useDetectorStore();

  const { setLoginStatus } = useAuthStore.getState();

  const { mutate } = useMutation({
    ...userQueries.postUserStatus,
    onSuccess: (_, variables) => {
      setLoginStatus(variables.status);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const detector = createActivityDetector({
      timeToIdle: IDLE_TIMEOUT,
    });
    setDetector(detector);

    detector.on('active', () => {
      mutate({ status: LOGIN_STATUS.ONLINE });
    });

    detector.on('idle', () => {
      mutate({ status: LOGIN_STATUS.AWAY });
    });

    return () => detector.stop();
  }, [mutate, isAuthenticated]);

  return <>{children}</>;
};
