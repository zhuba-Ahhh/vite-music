import { formatSongTime, formatMsgTime } from './index';
import { Song, SongInfo } from '../types';

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
