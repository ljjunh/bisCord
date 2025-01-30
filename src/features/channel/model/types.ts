export interface Message {
  type: 'SEND' | 'RECEIVE';
  id: string;
  content: string;
  userId: number;
  name: string;
  createdAt: string;
  updated: boolean;
}
