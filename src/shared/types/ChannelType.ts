export interface IServerDatas {
  id: number;
  serverName: string;
  serverImage: string;
  serverChannelList: IChannelTypes[];
}

export interface IChannelTypes {
  id: number;
  name: string;
  list: IChannelItem[];
}
export interface IChannelItem {
  id: number;
  name: string;
}
