import { ElMessage } from 'element-plus';
import { reactive, onMounted } from 'vue';
import { topAlbum, TopAlbumParams, MonthDatum } from '../../../apis';
import { ALBUM_AREA } from '../common';

export default function hot_recom() {
  // -------------- 新碟上架
  // 热门卡碟
  const album_info = reactive<{
    album_area: { name: string; code: string }[];
    album_list: MonthDatum[];
    album_index: number;
    album_params: TopAlbumParams;
    album_count: number;
    album_loading: boolean;
  }>({
    album_area: ALBUM_AREA,
    album_list: [],
    album_index: 0,
    album_params: { limit: 12 },
    album_count: 12,
    album_loading: true
  });

  // 新碟上架
  const getAlbumList = async (params: TopAlbumParams) => {
    const { data: res } = await topAlbum(params);

    if (res.code !== 200) {
      return ElMessage.error('数据请求失败');
    }

    album_info['album_list'] = res.monthData.slice(0, album_info.album_count);
    album_info['album_loading'] = false;
  };

  // 切换卡碟类别
  const chooseAlbumType = (index: number) => {
    album_info['album_index'] = index;
    album_info['album_params']['area'] = index !== 0 ? album_info['album_area'][index].code : '';
    album_info['album_loading'] = true;
    getAlbumList(album_info['album_params']);
  };

  onMounted(() => {
    getAlbumList(album_info['album_params']);
  });

  return {
    album_info,
    chooseAlbumType
  };
}
