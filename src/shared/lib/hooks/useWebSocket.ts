import { useEffect } from 'react';
import { useAuthStore } from '../../model/store/authStore';
import { useSocketStore } from '../../model/store/socketStore';

export const useWebSocket = () => {
  const token = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?.id);

  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (token && userId) {
      connect(token, userId);
    }

    return () => {
      disconnect();
    };
  }, [token, userId]);
};
