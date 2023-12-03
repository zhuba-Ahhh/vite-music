import { formatSongTime, formatMsgTime } from './index';
import { Song, SongInfo } from '../types';

// export default class Song {
//   id: string;
//   name: string;
//   mvId?: string;
//   singer: Singer[];
//   album: Album;
//   alia?: string[];
//   duration: string;
//   url: string;
//   vip?: boolean;
//   license?: boolean;
//   publishTime: string;

//   constructor({
//     id,
//     name,
//     mvId,
//     singer,
//     album,
//     alia,
//     duration,
//     url,
//     vip,
//     license,
//     publishTime,
//   }: SongOptions) {
//     this.id = id;
//     this.name = name;
//     this.mvId = mvId;
//     this.singer = singer;
//     this.album = album;
//     this.alia = alia;
//     this.duration = duration;
//     this.url = url;
//     this.vip = vip;
//     this.license = license;
//     this.publishTime = publishTime;
//   }
// }

export function formatSongInfo(params: SongInfo): Song {
  return {
    id: String(params.id),
    name: params.name,
    mvId: params.mv,
    singer: params.ar,
    album: params.al,
    alia: params.alia,
    vip: params.fee === 1,
    license: params.license,
    duration: formatSongTime(params.dt),
    url: `https://music.163.com/song/media/outer/url?id=${params.id}.mp3`,
    publishTime: formatMsgTime(params.publishTime)
  };
}
