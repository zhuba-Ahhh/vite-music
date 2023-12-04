<template>
    <el-skeleton :loading="loading" animated :throttle="500" :count="4">
        <template #template>
            <div class="ske-item">
                <el-skeleton-item class="ske-h4" variant="text" />
                <el-skeleton-item class="ske-h5" variant="text" />
                <div class="toplist_wrapper">
                    <div class="songitem" v-for="item in num" :key="uuid() + item">
                        <el-skeleton-item class="ske-img" variant="image" />
                        <div class="songinfo">
                            <el-skeleton-item class="ske-title" variant="text" />
                            <el-skeleton-item class="ske-author" variant="text" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="wrapper">
                <div v-for="item in top_list" :key="item.id" class="toplist_item">
                    <div class="toplist_hd">
                        <router-link :to="{ path: '/rank', query: { rId: item.id, type: 'Top' } }" class="toplist_name">{{
                            item.name }}</router-link>
                        <h5 class="toplist_update">最近更新：{{ formartDate(item.updateTime,
                            'MM月dd日') }}<span>（{{ item.updateFrequency }}）</span></h5>
                    </div>
                    <div class="toplist_wrapper">
                        <div class="songitem" :class="{ active: (songItem.vip || songItem.license) }"
                            v-for="(songItem) in songList[item.id]" :key="songItem.id">
                            <div class="songimg">
                                <el-image :src="songItem.album.picUrl + '?param=120y120'">
                                    <div slot="placeholder" class="image-slot">
                                        <i class="iconfont icon-placeholder"></i>
                                    </div>
                                </el-image>
                            </div>
                            <div class="songinfo">
                                <router-link :to="{ path: '/song', query: { id: songItem.id } }" class="song_title">{{
                                    songItem.name }}</router-link>
                                <div class="song_author">
                                    <router-link :to="{ path: '/singer', query: { id: author.id } }" class="song_name"
                                        v-for="(author, k) in songItem.singer" :key="k">{{ k !== 0 ? '/ ' + author.name :
                                            author.name }}</router-link>
                                </div>
                            </div>
                            <div class="songoperate" v-if="!songItem.vip && !songItem.license">
                                <i class="iconfont icon-add" title="添加到列表" @click="addSongList(songItem)"></i>
                                <i class="iconfont icon-fav" title="添加到收藏"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { toplist, topRankList, List } from '../../apis'
import { Song } from '../../types'
import { ElMessage } from 'element-plus';
import { formatSongs, formartDate, uuid } from '../../utils';

const num = ref(6);
const loading = ref(true);
let top_list: List[] = reactive([]);
let songList: Song[] = ([]);

const getToplist = async () => {
    const { data } = await toplist();
    const { code, list, } = data

    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }

    top_list = list.splice(0, 4)
    top_list.forEach(async item => {
        const { data } = await topRankList({ id: String(item.id) });
        const { playlist, privileges } = data;

        songList[item.id] = formatSongs(playlist.tracks.splice(0, num.value), privileges.splice(0, num.value));
    });

    loading.value = false;
};

// 添加当前歌曲到播放列表
const addSongList = () => {
    // store.dispatch('addList', { list: [item] });
    // store.commit('SET_PLAYLISTTIPS', true);
};

onMounted(() => {
    getToplist();
})

</script>
<style lang="less" scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 -10px;
}

.toplist_item {
    position: relative;
    padding: 20px;
    margin: 0 10px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    flex: 1;

    .toplist_name {
        display: block;
        padding-bottom: 10px;
        font-size: 22px;
        line-height: 30px;
        font-weight: 700;
    }

    .toplist_update {
        line-height: 18px;
        font-weight: 300;
        color: var(--color-text);
    }
}

.toplist_wrapper {
    padding-top: 30px;

    .songitem {
        position: relative;
        display: flex;
        padding-bottom: 20px;

        &.active {
            opacity: .6;
        }

        .songimg {
            flex-shrink: 0;
            overflow: hidden;
            width: 48px;
            height: 48px;
            margin-right: 20px;
            font-size: 18px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgb(0 0 0 / 12%);
            line-height: 48px;
        }

        .songinfo {
            flex: 1;
        }

        .song_title {
            display: -webkit-box;
            overflow: hidden;
            padding-bottom: 5px;
            font-size: 14px;
            text-overflow: ellipsis;
            transition: all .3s ease-in;
            line-height: 24px;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
        }

        .song_author {
            display: block;
            display: -webkit-box;
            overflow: hidden;
            height: 20px;
            font-size: 0;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;

            a {
                display: inline-block;
                line-height: 20px;
                font-size: 14px;
                color: var(--color-text);
            }
        }

        &:hover {
            .song_title {
                transform: translate(15px, 0);
                transition: all .3s ease-in;
            }

            .songoperate {
                width: 80px;
                transition: all .3s ease-in;
            }
        }

        &:last-child {
            padding-bottom: 0;
        }
    }

    .songoperate {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        overflow: hidden;
        width: 0;
        transition: all .3s ease-in;
        line-height: 48px;

        i {
            margin-left: 10px;
            cursor: pointer;
        }
    }
}

.el-skeleton {
    display: flex;
    justify-content: space-between;
    width: auto;
    margin: 0 -10px;
    flex-wrap: nowrap;
    box-sizing: border-box;

    .ske-item {
        position: relative;
        padding: 20px;
        margin: 0 10px;
        font-size: 0;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
        flex: 1;
    }

    .ske-h4 {
        height: 30px;
        margin-bottom: 10px;
    }

    .ske-h5 {
        height: 18px;
    }

    .ske-img {
        flex-shrink: 0;
        overflow: hidden;
        width: 48px;
        height: 48px;
        margin-right: 20px;
        font-size: 18px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgb(0 0 0 / 12%);
        line-height: 48px;
    }

    .ske-title {
        display: block;
        width: 60%;
        height: 24px;
        margin-bottom: 5px;
    }

    .ske-author {
        width: 40%;
        height: 20px;
    }
}
</style>