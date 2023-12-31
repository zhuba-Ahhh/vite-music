<template>
    <div class='album' v-if="!!details">
        <div class="detail-container">
            <div class="detail-main">
                <div class="album-cover">
                    <div class="album-img">
                        <el-image :src="details.picUrl">
                            <div slot="placeholder" class="image-slot">
                                <i class="iconfont icon-placeholder"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="album-info">
                        <div class="album-title">
                            {{ details.name }}
                            <span>{{ '#' + details.type }}</span>
                        </div>
                        <div class="album-singer">歌手：<router-link :to="{ path: '/singer', query: { id: author.id } }"
                                class="song_name" v-for="(author, k) in details.artists" :key="author.name">{{ k !== 0 ? ' /
                                                                ' + author.name : author.name }}</router-link></div>
                        <div class="album-time">发行时间：{{ formartDate(details.publishTime, 'yyyy-MM-dd') }}</div>
                        <div class="album-company">发行公司：{{ details.company }}</div>
                        <div class="album-desc" v-if="details.description">
                            <h5>歌单简介<em class="desc-close" v-if="isShowDesc" @click="isShowDesc = false"><i
                                        class="iconfont icon-closed"></i></em></h5>
                            <p @click="showAllDesc">{{ details.description }}</p>
                            <pre class="album-desc-all" v-if="isShowDesc">
                                {{ details.description }}
                            </pre>
                        </div>
                    </div>
                </div>
                <div class="song-main">
                    <div class="song-header">
                        <h4>包含歌曲列表 <em>{{ details.size + '首歌' }}</em></h4>
                        <span class="play-all" @click="playAllSongs"><i class="iconfont icon-audio-play"></i> 播放全部</span>
                        <span :class="['collect', dynamic.isSub ? 'active' : '']" @click="subAlbum"><i
                                :class="['iconfont', 'icon-collect' + (dynamic.isSub ? '-active' : '')]"></i> {{
                                    dynamic.isSub ? '已收藏' : '收藏' }}</span>
                    </div>
                    <song-list :songList="songList" :stripe="true"></song-list>
                </div>
                <div class="album-comments" ref=comment>
                    <comment-list :type="type" :sId="albumId"></comment-list>
                </div>
            </div>
            <div class="aside-box">
                <!-- <div class="album-aside album-collect">
                    <h3 class="aside-title">喜欢这张专辑的人</h3>
                    <div class="aside-main aside-album-main">
                        <router-link class="aside-album-item" :to="{ path: '/album', query: { id: item.id }}" v-for="item in hotAlbums" :key="item.id">
                            <el-image :src="item.picUrl">
                                <div slot="placeholder" class="image-slot">
                                    <i class="iconfont icon-placeholder"></i>
                                </div>
                            </el-image>
                            <div class="aside-album-info">
                                <div class="aside-album-name">{{item.name}}</div>
                                <div class="aside-album-time">
                                    {{formartDate(details.publishTime, 'yyyy-MM-dd')}}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div> -->
                <div class="album-aside album-other">
                    <h3 class="aside-title">{{ details.artists[0].name }}的其他专辑<router-link
                            :to="{ path: '/singer', query: { id: details.artists[0].id, type: 'album' } }"
                            class="album-more">全部>></router-link></h3>
                    <div class="aside-main aside-album-main">
                        <router-link class="aside-album-item" :to="{ path: '/album', query: { id: item.id } }"
                            v-for="item in hotAlbums" :key="item.id">
                            <el-image :src="item.picUrl">
                                <div slot="placeholder" class="image-slot">
                                    <i class="iconfont icon-placeholder"></i>
                                </div>
                            </el-image>
                            <div class="aside-album-info">
                                <div class="aside-album-name">{{ item.name }}</div>
                                <div class="aside-album-time">
                                    {{ formartDate(details.publishTime, 'yyyy-MM-dd') }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongList from '../components/SongList.vue'
import CommentList from '../components/Comments.vue'
import { onMounted, reactive, toRefs } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { formartDate, formatSongs } from '../../utils';
// import { useStore } from 'vuex'
import { ElMessage } from 'element-plus';
// const { proxy } = getCurrentInstance();
// const store = useStore();
import { album, albumDynamic, artistAlbum, albumSub, playlistSCollect, Album1, Privilege, Song, HotAlbum, Subscriber3, playlistSCollectParams, AlbumDynamicResponse } from '../../apis';
const route = useRoute();
const info = reactive<{
    albumId: string,
    details: Album1,
    songList: Song[],
    dynamic: Partial<AlbumDynamicResponse>,
    hotAlbums: HotAlbum[],
    comments: [],
    type: number, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    isShowDesc: boolean,
    collects: Subscriber3[]
}>({
    // 歌单详情
    albumId: '',
    details: {},
    songList: [],
    dynamic: {},
    hotAlbums: [],
    comments: [],
    type: 3, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    isShowDesc: false,
    collects: []
});

// 相关歌单推荐
const getAlbum = async (params: { id: string }) => {
    const { data } = await album(params);
    const { code, album: albumRes, songs } = data;

    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }

    info.details = albumRes;
    const privileges: Privilege[] = [];

    songs.forEach(item => {
        privileges.push(item.privilege);
    })
    info.songList = formatSongs(songs, privileges);
    getArtistAlbum();
};

const getAlbumDynamic = async (params: { id: string }) => {
    const { data } = await albumDynamic(params)
    const { code, } = data;
    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }
    info.dynamic = data
};

const getArtistAlbum = async () => {
    const { data } = await artistAlbum({ id: info?.details?.artists[0]?.id, limit: 5 })
    const { code, hotAlbums } = data;
    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }
    info.hotAlbums = hotAlbums
};

// 专辑简介查看更多
const showAllDesc = () => {
    if (info.details && info?.details?.description?.length > 120) {
        info.isShowDesc = !info.isShowDesc
    }
};

const playAllSongs = () => {
    // store.dispatch('playAll', {
    //     list: info.songList
    // });
    // store.commit('SET_PLAYLISTTIPS', true);
};

const subAlbum = async () => {
    const { data } = await albumSub({ id: info.albumId, t: Number(!info?.dynamic?.isSub) })
    const { code } = data;
    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }
    info.dynamic.isSub = Number(!info.dynamic.isSub)
};

// 订阅该歌单的用户列表
const getCollect = async (params: playlistSCollectParams) => {
    const { data } = await playlistSCollect(params)
    const { code, subscribers } = data;
    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }
    info.collects = subscribers
};

const _initialize = () => {
    getAlbum({ id: info.albumId })
    getAlbumDynamic({ id: info.albumId })
    getCollect({ id: info.albumId });
};

onMounted(() => {
    info.albumId = String(route.query.id);
    _initialize()
});

onBeforeRouteUpdate((to) => {
    info.albumId = String(to.query.id);
    _initialize()
})

const {
    albumId,
    details,
    songList,
    dynamic,
    hotAlbums,
    type,
    isShowDesc,
} = toRefs(info)

</script>
<style scoped lang="less">
.detail-container {
    display: flex;
    padding: 40px 0 0;
}

.detail-main {
    flex: 1;
    padding-bottom: 45px;
}

.aside-box {

    .aside-title {
        position: relative;
        font-size: 16px;
        line-height: 24px;

        .album-more {
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            font-size: 12px;
            color: #666;
            font-weight: normal;
        }

        &::before {
            display: inline-block;
            width: 4px;
            height: 18px;
            margin: 3px 5px 0 0;
            background: var(--color-text-height);
            border-radius: 2px;
            content: '';
            vertical-align: top;
        }
    }
}

.album-cover {
    display: flex;
}

.album-img {
    position: relative;
    width: 260px;
    height: 260px;

    .el-image {
        z-index: 2;
        border-radius: 4px;
    }

    &::after {
        position: absolute;
        top: 0;
        right: -40px;
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../assets/img/disc.png') no-repeat;
        background-size: contain;
        transition: all 0.4s linear;
        content: '';
    }
}

.album-info {
    flex: 1;
    padding: 20px;
    margin-left: 70px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

    .album-title {
        padding-bottom: 20px;
        font-size: 24px;
        font-weight: bold;

        span {
            display: inline-block;
            font-size: 14px;
            font-weight: normal;
            color: var(--color-text-height);
        }
    }

    .album-singer,
    .album-time,
    .album-company {
        line-height: 22px;
        font-size: 14px;
        color: #999;
    }

    .album-desc {
        position: relative;

        h5 {
            padding: 30px 0 5px;
            line-height: 20px;
            font-size: 14px;
            color: #333;
        }

        .desc-close {
            position: absolute;
            top: 30px;
            right: 0;
            cursor: pointer;
        }

        p {
            display: -webkit-box;
            overflow: hidden;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: pre-line;
            color: #999;
            line-height: 22px;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            word-break: break-all;
            cursor: pointer;
        }

        .album-desc-all {
            position: absolute;
            top: 70px;
            left: 10px;
            z-index: 1;
            overflow-y: scroll;
            width: calc(~'100% - 20px');
            max-height: 250px;
            padding: 10px;
            margin: -10px;
            font-size: 14px;
            font-family: inherit;
            white-space: pre-line;
            color: #999;
            background: #fff;
            box-shadow: 0 2px 10px 0 rgb(52 52 52 / 10%);
            line-height: 22px;
        }
    }
}

.song-main {
    position: relative;
    padding: 20px;
    margin-top: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}

.song-header {
    display: flex;
    padding: 0 0 10px;

    h4 {
        flex: 1;
        font-size: 20px;
        line-height: 40px;

        em {
            display: inline-block;
            padding-left: 10px;
            font-size: 12px;
            line-height: 14px;
            font-style: normal;
            font-weight: normal;
            color: #666;
            vertical-align: baseline;
        }
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px 20px;
        margin: 5px 0 5px 15px;
        color: #333;
        background: #f0f0f0;
        border-radius: 50px;
        transition: all .4s;
        line-height: 16px;
        cursor: pointer;

        i {
            margin-right: 3px;
        }
    }

    .play-all {
        color: #fff;
        background: var(--color-text-height);

        i {
            color: #fff;
        }
    }

    .collect.active,
    .collect.active i {
        color: var(--color-text-height);
    }
}

.aside-album-item {
    display: flex;
    padding: 10px 0;

    .el-image {
        overflow: hidden;
        width: 60px;
        height: 60px;
        border-radius: 4px;
    }

    .aside-album-info {
        flex: 1;
        padding-left: 10px;
    }

    .aside-album-name {
        display: -webkit-box;
        overflow: hidden;
        width: 100%;
        height: 20px;
        font-size: 14px;
        text-overflow: ellipsis;
        line-height: 20px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        cursor: pointer;
    }

    .aside-album-time {
        height: 20px;
        line-height: 20px;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
    }
}

.album-aside {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}
</style>
