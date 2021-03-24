export interface Channel {
    active: boolean;
    channelType: number;
    createdAt: string;
    id: any;
    name: string;
    path: string;
    image?: string;
}

export const ChannelEnum = {
    Radio: 1,
    TV: 2,
};

export interface ChannelType {
  id: number;
  label: string;
}

export interface ActiveValues {
  id: boolean;
  name: string;
}

export interface ChannelPaginate {
  result: Channel[];
  pageIndex: number;
  pageSize: number;
  total: number;
}
