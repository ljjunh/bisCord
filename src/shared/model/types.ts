export interface User {
  id: number;
  name: string;
  email: string;
  profileImageURL: string;
  loginStatus: LoginStatus;
  description: string;
}

export interface Server {
  serverUri: string;
  channels: [];
}
export interface Channel {
  channelId: number;
  name: string;
}

export type LoginStatus = 'ONLINE' | 'OFFLINE' | 'AWAY' | 'BUSY';

export interface ChatMessage {
  chatId: string;
  recipientId: number;
  userId: number;
}

export interface SendMessage extends ChatMessage {
  content: string;
  createdAt: string;
  name: string;
  profileImageUrl: string | null;
  recipientName: string;
  updated: boolean;
}

export interface UpdateMessage extends ChatMessage {
  content: string;
}

export interface WebSocketMessage {
  operation: 'SEND' | 'UPDATE' | 'DELETE';
  type: 'DM';
  data: ChatMessage | SendMessage | UpdateMessage; // DELETE operation 일때는 ChatMessage 사용
}

export interface UPdateCHMEssage {
  content: string;
}

export interface CHWebSocketMessage {
  operation: 'SEND' | 'UPDATE' | 'DELETE';
  type: 'CHANNEL';
}
