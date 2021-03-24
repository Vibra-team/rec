export interface Campaign {
    id?: number;
    idChannel: number;
    name: string;
    author?: string;
    active: boolean;
    createdAt?: string;
    socialMedias: Array<any>;
    thumbnail?: string;
}
