export interface Message {
  // type: 'SEND' | 'RECEIVE';
  profileImageUrl: string;
  channelId: number;
  id: string;
  content: string;
  userId: number;
  name: string;
  createdAt: string;
  updated: boolean;
}
