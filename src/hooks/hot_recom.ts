import { ref, reactive, onMounted, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { hotList, playList, PlayListParams, Tag, Playlist1 } from '../apis';

export function useHotRecom() {
  const playlist_index = ref(0);
  const playlist_count = ref(0);
  const playlist_loading = ref(false);
  const playlist_params = reactive<PlayListParams>({ limit: 6, offset: 0 });
  const playlist_tags = reactive<Partial<Tag>[]>([]);
  const playlist_list = reactive<Playlist1[]>([]);

  const getHotTags = async () => {
    try {
      const { data } = await hotList();
      const { code, tags } = data;

      if (code !== 200) {
        throw new Error('数据请求失败');
      }

      // 使用解构赋值以确保响应性更新
      tags.unshift({
        name: '为您推荐'
    })
      Object.assign(playlist_tags, tags.slice(0, 6));
    } catch (error) {
      console.error('请求热门标签出错', error);
      ElMessage.error('数据请求失败');
    }
  };

  const choosePlayListType = (index: number) => {
    // 直接修改基本数据类型的引用
    playlist_index.value = index;
    playlist_params.cat = index !== 0 ? playlist_tags[index].name : '';
    playlist_loading.value = true;
    getPlayList(playlist_params);
  };

  const getPlayList = async (params: PlayListParams) => {
    try {
      const { data } = await playList(params);
      const { code, playlists } = data;

      if (code !== 200) {
        throw new Error('数据请求失败');
      }

      // 直接修改响应式对象的属性
      Object.assign(playlist_list, playlists);
      playlist_loading.value = false;
    } catch (error) {
      console.error('请求歌单列表出错', error);
      ElMessage.error('数据请求失败');
    }
  };

  onMounted(() => {
    getHotTags();
    getPlayList(playlist_params);
  });

  return {
    // ...toRefs({
      playlist_index,
      playlist_count,
      playlist_loading,
      playlist_params,
      playlist_tags,
      playlist_list
    // }),
    ,
    choosePlayListType
  };
}
