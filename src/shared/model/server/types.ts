export interface Server {
  id: string;
  name: string;
  serverUrl?: string;
  serverChannelList?: Channel[];
}

export interface Channel {
  id: string;
  name: string;
}
