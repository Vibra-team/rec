export interface SocialMidia {
  id?: number;
  name: string;
  active: boolean;
  credential: string;
  socialMedia: number;
}

export interface ResultPaginate {
  result: SocialMidia[];
  pageIndex: number;
  pageSize: number;
  total: number;
}
