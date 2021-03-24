export interface SocialMedia {
  id: number;
  name: string;
  path: string;
  active: boolean;
  credential: string;
  socialMedia: number;
}

export const SocialMediaEnum = {
  Facebook: 1,
  Twitter: 2,
  Youtube: 3,
  Uol: 4,
};
