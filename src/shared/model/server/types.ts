export interface Server {
  name: string;
  serverUri: string;
  serverImageURL?: string | null;
  serverChannelList?: Channel[];
}

export interface Channel {
  id: string;
  name: string;
}
