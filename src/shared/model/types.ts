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
  type: 'DM' | 'CALL_OFFER' | 'CALL_ANSWER' | 'CALL_ICE' | 'CALL_END';
  data: ChatMessage | SendMessage | UpdateMessage | WebRTCSignalData; // DELETE operation 일때는 ChatMessage 사용
}

export interface WebRTCSignalData {
  fromUserId: number;
  toUserId: number;
  fromUserName: string;
  // offer나 answer일때는 description이 있음
  description?: RTCSessionDescription;
  // ICE candidate일때는 candidate가 있음
  candidate?: RTCIceCandidate;
}

export interface WebRTCSignalMessage extends WebSocketMessage {
  type: 'CALL_OFFER' | 'CALL_ANSWER' | 'CALL_ICE' | 'CALL_END';
  data: WebRTCSignalData;
}

export interface UPdateCHMEssage {
  content: string;
}

export interface CHWebSocketMessage {
  operation: 'SEND' | 'UPDATE' | 'DELETE';
  type: 'CHANNEL';
}
