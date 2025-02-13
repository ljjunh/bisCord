export const USER_ENDPOINT = {
  GET_USER: '/user',
  GET_USERS: '/user/users',
  GET_OTHER_USER: (userId: number) => `/user/${userId}`,
  PUT_USER: '/user',
  POST_IMAGE: '/image',
  GET_IMAGE: '/image',
  POST_USER_STATUS: '/user/status',
} as const;

export const AUTH_ENDPOINT = {
  SIGN_UP: '/signup',
  SIGN_IN: '/login',
  SIGN_OUT: '/login/logout',
  WITHDRAW: '/user',
  SOCIAL_SIGN_IN: '/login/code',
  REFRESH: '/api/login/refresh',
} as const;

export const CHANNEL_ENDPOINT = {
  GET_ALL_MESSAGE: (channelId: number) => `/chat/channel/${channelId}`,
  POST_SEND_MESSAGE: (channelId: number) => `/chat/channel/${channelId}`,
  DELETE_MESSAGE: (channelId: number) => `/chat/channel/${channelId}`,
  EDIT_MESSAGE: (channelId: number) => `/chat/channel/${channelId}`,
} as const;

export const DIRECT_MESSAGE_ENDPOINT = {
  GET_DM: (otherUserId: number) => `/chat/dm/${otherUserId}`,
  POST_DM: (recipientId: number) => `/chat/dm/${recipientId}`,
  DELETE_DM: (recipientId: number, chatId: string) => `chat/dm/${recipientId}/chat/${chatId}`,
  PATCH_DM: (recipientId: number, chatId: string) => `chat/dm/${recipientId}/chat/${chatId}`,
  GET_DM_ROOMS: '/dm',
  DELETE_DM_ROOM: (recipientId: number) => `/dm/${recipientId}`,
  POST_DM_ROOM: (recipientId: number) => `/dm/${recipientId}`,
} as const;

export const FRIEND_ENDPOINT = {
  GET_FRIENDS: '/user/friends',
  POST_FRIEND_REQUEST: (invitedUserId: number) => `/friendship/${invitedUserId}`,
  POST_FRIEND_ACCEPT: (invitingUserId: number) => `/friendship/${invitingUserId}/accept`,
  POST_FRIEND_DECLINE: (userId: number) => `/friendship/${userId}/decline`,
} as const;

export const SERVER_ENDPOINT = {
  GET_SERVERS: '/user/servers',
  CREATE_SERVER: '/server',
  GET_SERVER: (serverUri: string) => `/server/${serverUri}`,
  GET_CHANNELS: (serverUri: string) => `/server/${serverUri}/channel`,
  CREATE_CHANNEL: (serverUri: string) => `/server/${serverUri}/channel`,
  UPDATE_SERVER: (serverUri: string) => `/server/${serverUri}`,
  DELETE_SERVER: (serverUri: string) => `/server/${serverUri}`,
  DELETE_CHANNEL: (channelId: number) => `/chat/channel/${channelId}`,
  GET_SERVER_MEMBERS: (serverUri: string) => `/server/${serverUri}/server-user`,
  POST_INVITE_SERVER: (serverUri: string) => `/server/${serverUri}/invite`,
  POST_JOIN_SERVER: (inviteKey: string) => `/server/join/${inviteKey}`,
  POST_IMAGE: '/image',
  GET_IMAGE_URL: '/image',
  POST_DM: (recipientId: number) => `/chat/dm/${recipientId}`,
  POST_DM_ROOM: (recipientId: number) => `/dm/${recipientId}`,
} as const;
