export interface Singer {
  id: number;
  name: string;
  [k: string]: any;
}

export interface Album {
  id: number;
  name: string;
  [k: string]: any;
}

export interface Song {
  id: string;
  name: string;
  mvId?: string;
  singer: Singer[];
  album: Album;
  alia?: string[];
  duration: string;
  url: string;
  vip?: boolean;
  license?: boolean;
  publishTime: string;
  [k: string]: any;
}

export interface SongInfo {
  id: string | number;
  name: string;
  mv: string;
  ar: Singer[];
  al: Album;
  alia: string[];
  dt: number;
  url: string;
  fee: number;
  license: boolean;
  publishTime: string;
  [k: string]: any;
}

export * from '../apis/types';
