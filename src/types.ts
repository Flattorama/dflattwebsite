export enum ThemeType {
  GREEN = 'GREEN',
  PINK = 'PINK',
  BLUE = 'BLUE',
  DARK = 'DARK'
}

export interface CardData {
  id: number;
  title: string;
  link: string;
  image: string;
  tags: string[];
  theme: ThemeType;
  rotation: number;
}
