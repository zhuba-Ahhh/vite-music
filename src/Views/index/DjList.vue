<template>
    <el-skeleton :loading="loading" animated :throttle="500" :count="count">
        <template #template>
            <div class="ske-item">
                <el-skeleton-item class="ske-img" variant="image" />
                <div class="ske-info">
                    <el-skeleton-item variant="h3" class="ske-name" />
                    <el-skeleton-item variant="h3" class="ske-rcmdtext" style="width:50%" />
                    <el-skeleton-item variant="text" class="ske-count" />
                </div>
            </div>
        </template>
        <template #default>
            <div class='dj'>
                <router-link :to="{ path: '/dj', query: { id: item.id } }" class="item" :key="item.id" v-for="item in lists">
                    <div class="faceImg">
                        <el-image :src="item.picUrl + '?param=120y120'">
                            <div slot="placeholder" class="image-slot">
                                <i class="iconfont icon-placeholder"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="info">
                        <div class="dj-name" v-if="item.name"><i class="iconfont icon-dj"></i>{{ item.name }}</div>
                        <div class="dj-rcmdtext" v-if="item.rcmdtext">{{ item.rcmdtext }}</div>
                        <div class="dj-count"><span>共{{ formartNum(item.programCount) }}期</span>
                            <span>订阅{{ formartNum(item.subCount) }}次</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </template>
    </el-skeleton>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getHotDj as GetHotDj, GetHotDjParams, DjRadio } from '../../apis';
import { ElMessage } from 'element-plus';
import { formartNum } from '../../utils';
// 热门电台
const params: GetHotDjParams = reactive({ limit: 6 });
let lists = reactive<DjRadio[]>([]);
const loading = ref(true);
const count = ref(12);

// 获取人电台
const getHotDj = async (params: GetHotDjParams) => {
    const { data } = await GetHotDj(params);
    const { code, djRadios } = data;

    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }

    lists = djRadios;
    loading.value = false;
}

onMounted(() => {
    getHotDj(params);
})
</script>
<style lang="less" scoped>
.dj {
    display: block;
    margin-right: -20px;
    font-size: 0;
    flex-wrap: wrap;

    .item {
        display: inline-flex;
        width: 50%;
        margin-bottom: 20px;
    }

    .faceImg {
        overflow: hidden;
        width: 100px;
        height: 100px;
        border-radius: 4px;
    }

    .info {
        display: flex;
        justify-content: space-around;
        padding: 5px 0;
        margin: 0 20px;
        flex: 1;
        border-bottom: 1px solid #eee;
        flex-direction: column;
    }

    .dj-name,
    .icon-dj {
        padding-right: 10px;
        font-size: 18px;
        font-weight: bold;
        color: var(--color-text-main);
    }

    .dj-rcmdtext {
        font-size: 14px;
        color: var(--color-text);
    }

    .dj-count {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
    }
}

.el-skeleton {
    display: block;
    width: auto;
    font-size: 0;
    flex-wrap: wrap;

    .ske-item {
        display: inline-flex;
        width: 50%;
        margin-bottom: 20px;
    }

    .ske-img {
        overflow: hidden;
        width: 120px;
        height: 120px;
        border-radius: 4px;
    }

    .ske-info {
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        margin: 0 15px;
        flex: 1;
        border-bottom: 1px solid #eee;
        flex-direction: column;
    }

}
</style>