import { getToken } from 'firebase/messaging';
import type { PostNotificationTokenDTO } from './dto';
import { apiClient } from '@/shared/api/apiClient';
import { messaging } from '@/shared/config/firebase/firebase';

export const notificationService = {
  registerFCMToken: async (): Promise<string | null> => {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') return null;

      const notificationToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      return notificationToken;
    } catch (error) {
      console.error('FCM 토큰 등록 실패:', error);
      return null;
    }
  },
  PostNotificationToken: async ({ notificationToken }: PostNotificationTokenDTO): Promise<void> => {
    try {
      await apiClient.post<void>({
        url: '/login/notification',
        data: {
          notificationToken,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
