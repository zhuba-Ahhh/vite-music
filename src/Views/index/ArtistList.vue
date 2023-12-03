<template>
    <el-skeleton :loading="loading" animated :throttle="500" :count="count">
        <template #template>
            <el-skeleton-item class="ske-img" variant="image" />
        </template>
        <template #default>
            <el-carousel class='artist' height="340px" :interval="8000" arrow="never" indicator-position="outside">
                <el-carousel-item class="box" :key="index" v-for="(list, index) in lists">
                    <router-link :to="{ path: '/artist', query: { id: item.id } }" :key="item.id" v-for="item in list"
                        class="item">
                        <div class="faceImg">
                            <el-image :src="item.picUrl + '?param=100y100'">
                                <div slot="placeholder" class="image-slot">
                                    <i class="iconfont icon-placeholder"></i>
                                </div>
                            </el-image>
                        </div>
                        <div class="info">
                            <div class="artist-name" v-if="item.name">{{ item.name }}</div>
                        </div>
                    </router-link>
                </el-carousel-item>
            </el-carousel>
        </template>
    </el-skeleton>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { topArtists, TopArtistsParams, Artist1 } from '../../apis';
import { chunkArray } from '../../utils';

// 热门电台
let lists = reactive<Artist1[][]>([]);
const params = reactive<TopArtistsParams>({ limit: 36 })
const loading = ref(true);
const count = ref(12);

// 热门歌手
const getArtists = async (params: TopArtistsParams) => {
    const { data } = await topArtists(params);
    const { code, artists } = data;

    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }

    lists = chunkArray(artists, count.value);
    loading.value = false;
}

onMounted(() => {
    getArtists(params);
})
</script>
<style lang="less" scoped>
.artist {
    display: block;
    height: 360px;
    font-size: 0;

    .box {
        display: flex;
        flex-wrap: wrap;
        place-content: space-between space-between;
    }

    .item {
        overflow: hidden;
        // width: 100px;
        // height: 100px;
        border-radius: 4px;
    }
}

.el-skeleton {
    display: flex;
    flex-wrap: wrap;
    place-content: space-between space-around;
    height: 340px;

    .ske-img {
        width: 100px;
        height: 100px;
    }
}
</style>