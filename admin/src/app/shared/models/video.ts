export interface Video {
    idChannel: number;
    fileName: string;
    filePath: string;
    id: number;
    createdAt: string;
}

export interface VideoPaginate {
    next: number;
    prev: number;
    video: Video;
    url: string;
}
