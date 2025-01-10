export const path = {
  signin: "/signin",
  signup: "/signup",
  directmessage: "/directmessage/*",
  channels: "/channels/*",
  channel_id: (id: number) => `/channels/${id}`,
};
