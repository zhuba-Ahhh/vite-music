export interface SearchSuggestResult {
  albums: AlbumElement[];
  artists: ResultArtist[];
  order: OrderEnum[];
  playlists: Playlist[];
  songs: Song[];
}

export enum OrderEnum {
  Albums = 'albums',
  Artists = 'artists',
  Songs = 'songs',
  Playlists = 'playlists'
}

export type ResultItemMap = {
  [K in OrderEnum]: SearchSuggestResult[K];
};

export enum ListType {
  Songs = '单曲',
  Artists = '歌手',
  Albums = '专辑',
  Playlists = '歌单'
}

export interface AlbumElement {
  // ... (原始接口内容)
}

export interface ResultArtist {
  // ... (原始接口内容)
}

export interface Playlist {
  // ... (原始接口内容)
}

export interface Song {
  // ... (原始接口内容)
}

// 以下是对上面定义的类型的简化
export interface SearchResult {
  [OrderEnum.Albums]: AlbumElement[];
  [OrderEnum.Artists]: ResultArtist[];
  [OrderEnum.Songs]: Song[];
  [OrderEnum.Playlists]: Playlist[];
}

export type SimplifiedResultItemMap = {
  [K in OrderEnum]: SearchResult[K];
};

export interface SimplifiedProfile {
  // ... (根据实际情况选择部分属性)
}

export interface SimplifiedPlaylist {
  // ... (根据实际情况选择部分属性)
}

// 其他简化的接口定义
