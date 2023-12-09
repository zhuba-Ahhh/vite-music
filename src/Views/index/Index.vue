<template>
    <div class="home">
        <!-- 轮播 -->
        <Banners />
        <!-- 热门推荐 -->
        <div class="hot-list">
            <div class="h_title">
                <h3>热门推荐</h3>
                <span v-for="(item, index) in playlist_tags" :key="item.id" :class="index == playlist_index ? 'active' : ''"
                    @click="choosePlayListType(index)">{{ item.name }}</span>
            </div>
            <div class="wrapper">
                <play-list :playList="playlist_list" :loading="playlist_loading" :num="playlist_count"></play-list>
            </div>
        </div>
        <!-- 新碟上架 -->
        <div class='album_list'>
            <div class="h_title">
                <h3>新碟上架</h3>
                <span v-for="(item, index) in album_area" :key="uuid()" :class="index == album_index ? 'active' : ''"
                    @click="chooseAlbumType(index)">{{ item.name }}</span>
            </div>
            <div class="wrapper">
                <album-list :albumList="album_list" :loading="album_loading" :num="album_count"></album-list>
            </div>
        </div>

        <div class='top_list'>
            <rank-list />
        </div>
        <!-- 最新MV -->
        <div class='mv_list'>
            <div class="h_title">
                <h3>最新MV</h3>
                <span v-for="(item, index) in mv_area" :key="uuid()" :class="index == mv_index ? 'active' : ''"
                    @click="chooseMvType(index)">{{ item }}</span>
            </div>
            <div class="wrapper">
                <mv-list :mvList="mv_list" :loading="mv_loading" :num="mv_count"></mv-list>
            </div>
        </div>
        <!-- 热门电台 热门歌手 -->
        <div class="dj-artist">
            <div class="dj-list">
                <div class="h_title">
                    <h3>热门电台</h3>
                </div>
                <dj-list />
            </div>
            <div class="artist-list">
                <div class="h_title">
                    <h3>热门歌手</h3>
                </div>
                <artist-list />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { uuid } from '../../utils';
import Banners from './Banner.vue';
import ArtistList from './ArtistList.vue';
import RankList from './RankList.vue';
import DjList from './DjList.vue';
import PlayList from '../../components/PlayList.vue';
import AlbumList from '../../components/AlbumList.vue';
import MvList from '../../components/MvList.vue';
import { useHotRecom, new_album, new_mv } from '../../hooks';

// -------------- 推荐歌单
const { playlist_tags, playlist_index, playlist_list, playlist_loading, playlist_count, choosePlayListType } = useHotRecom();

console.log(`( playlist_tags )===============>`, playlist_tags);
console.log(`( playlist_index )===============>`, playlist_index);
console.log(`( playlist_list )===============>`, playlist_list, playlist_list);
console.log(`( playlist_loading )===============>`, playlist_loading, playlist_loading.value);
console.log(`( playlist_count )===============>`, playlist_count);

// -------------- 新碟
const { album_info, chooseAlbumType } = new_album();
const { album_area, album_list, album_index, album_loading, album_count } = toRefs(album_info);

// -------------- MV
const { mv_info, chooseMvType } = new_mv();
const { mv_area, mv_index, mv_list, mv_loading, mv_count } = toRefs(mv_info);

</script>
<style lang="less" scoped>
.h_title {
    padding: 20px 0 10px;

    h3 {
        display: inline-block;
        padding-right: 50px;
        font-size: 28px;
        font-weight: 700;
    }

    span {
        display: inline-block;
        margin: 0 40px 0 0;
        font-size: 16px;
        color: var(--color-text-main);
        cursor: pointer;

        &.active {
            position: relative;
            z-index: 1;
            font-weight: 600;
            color: var(--color-text-main);

            &::after {
                position: absolute;
                bottom: 1px;
                left: 0;
                z-index: -1;
                width: 100%;
                height: 6px;
                background: var(--color-text-height);
                content: "";
            }
        }
    }
}

.hot-list,
.album_list,
.mv_list,
.dj-list,
.artist-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}

.top_list {
    margin-bottom: 25px;
}

.dj-artist {
    display: flex;
}

.dj-list {
    flex: 1;
    margin-right: 20px;
}

.artist-list {
    width: 440px;
}
</style>