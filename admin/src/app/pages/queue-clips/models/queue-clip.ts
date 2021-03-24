export interface QueueClip {
    title: string,
    description: string,
    tags: string,
    thumbnail: string,
    status: number,
    cuts: Array<any>,
    id: number,
    createdAt: string,
    author: string,
    length: string;
    size: string;
    socialMedias: Array<SocialMediaQueue>;
}

export interface SocialMediaQueue {
    idClip: number
    idSocialMedia: number
    link: number
    socialMedia: number
    status: number
}

export interface QueueClipPaginate {
    result: Array<QueueClip>,
    pageIndex: number,
    pageSize: number,
    total: number

}
