import { ref, reactive, onMounted, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { hotList, playList, PlayListParams, Tag, Playlist1 } from '../apis';

interface PlaylistInfo {
  playlist_tags: Partial<Tag>[];
  playlist_list: Playlist1[];
  playlist_index: number;
  playlist_params: PlayListParams;
  playlist_count: number;
  playlist_loading: boolean;
}

export function useHotRecom() {
  const playlist_info = reactive<PlaylistInfo>({
    playlist_tags: [],
    playlist_list: [],
    playlist_index: 0,
    playlist_params: { limit: 6, offset: 0 },
    playlist_count: 6,
    playlist_loading: true
  });

  const getHotTags = async () => {
    try {
      const { data } = await hotList();
      const { code, tags } = data;

      if (code !== 200) {
        throw new Error('数据请求失败');
      }

      playlist_info.playlist_tags = [{ name: '为您推荐' }, ...tags].slice(0, 6);
    } catch (error) {
      console.error('请求热门标签出错', error);
      ElMessage.error('数据请求失败');
    }
  };

  const choosePlayListType = (index: number) => {
    const { playlist_tags, playlist_params } = playlist_info;
    playlist_info.playlist_index = index;
    playlist_params.cat = index !== 0 ? playlist_tags[index].name : '';
    playlist_info.playlist_loading = true;
    getPlayList(playlist_params);
  };

  const getPlayList = async (params: PlayListParams) => {
    try {
      const { data } = await playList(params);
      const { code, playlists } = data;

      if (code !== 200) {
        throw new Error('数据请求失败');
      }

      playlist_info.playlist_list = playlists;
      playlist_info.playlist_loading = false;
    } catch (error) {
      console.error('请求歌单列表出错', error);
      ElMessage.error('数据请求失败');
    }
  };

  onMounted(() => {
    getHotTags();
    getPlayList(playlist_info.playlist_params);
  });

  return {
    ...toRefs(playlist_info),
    choosePlayListType
  };
}
