export interface Clip {
    title: string;
    description: string;
    thumbnail?: string;
    socialMedia?: Array<any>;
    tags?: string;
    cuts?: Array<Cut>;
    socialMedias?: Array<any>;
    gif?: string;
    id?: number;
}

export interface Cut {
    idVideo: number;
    start: number;
    finish: number;
    sequence: number;
}
