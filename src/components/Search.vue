<template>
    <div class="search">
        <el-select v-model="keyVal" class="keyVal" clearable filterable remote placeholder="请输入歌名、歌词、歌手或专辑"
            :remote-method="remoteMethod" :fit-input-width="true" :loading="loading" loading-text="搜索中..."
            @focus="handleFocus">
            <div class="hot-search" v-if="!keyVal">
                <h5>热门搜索</h5>
                <el-option v-for="(item, index) in SerachHot" :key="index" :label="item.first" :value="item.first"
                    @click="jumpSearch(item)">
                    <span :class="[index < 3 ? 'top-' + index : '']">{{ (index + 1) + '.' }}</span>
                    {{ item.first }}
                </el-option>
            </div>
            <el-option-group v-else v-for="list in suggestInfo" :key="listType[list.label]" :label="listType[list.label]"
                class="aaa">
                <el-option v-for="(item, index) in list.info" :key="list.label + index" :label="item.name"
                    :value="list.label + item?.name" class="item" @click="jumpPage(item, list.label)">
                    {{ item?.name }}
                    <template v-if="list.label === orderEnum.songs">
                        - <span class="artists" v-for="(a, i) in (item as Song)?.artists" :key="i">{{ (i !== 0 ? ' / ' : '')
                            +
                            a.name }}</span>
                    </template>
                    <template v-else-if="list.label === orderEnum.albums">
                        - <span class="artists">{{ (item as AlbumElement)?.artist?.name }}</span>
                    </template>
                </el-option>
            </el-option-group>
        </el-select>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { serachHot, serachSuggest, Hot, orderEnum, listType, ResultItemMap, Song, AlbumElement } from '../apis';

const route = useRoute();
const router = useRouter();

let loading = ref<boolean>(false);
let keyVal = ref<string | null>(null);
let suggestInfo: { label: orderEnum, info: ResultItemMap[orderEnum] }[] = reactive([]);
let SerachHot: Hot[] = []

const remoteMethod = (query: string) => {
    keyVal.value = query;

    if (keyVal.value) {
        loading.value = true;
        suggestInfo = [];

        getSerachSuggest();
    }
};

//搜索框，获取焦点时，请求热门搜索列表接口
const handleFocus = () => {
    if (keyVal.value) {
        loading.value = true;
        suggestInfo = [];

        getSerachSuggest();
    }
};

// 热门搜索
const getSearchHot = async () => {
    const { data } = await serachHot()
    const { code, result } = data;

    if (code !== 200) {
        return ElMessage.error('数据请求失败');
    }

    SerachHot = result.hots;
};

// 搜索结果
const getSerachSuggest = async () => {
    const { data } = await serachSuggest({ keywords: keyVal.value || '' });
    const { code, result } = data;
    loading.value = false;
    if (code !== 200) {
        return ElMessage.error('数据请求失败')
    }

    if (result.order) {
        suggestInfo = result.order.map((item: orderEnum) => {
            return {
                label: item,
                info: result[item]
            }
        })
    }
};

// 默认热门搜索列表，点击后台跳转到搜索结果页面
const jumpSearch = (item: any) => {
    keyVal.value = item.first
    if (item.first === route.query.key) {
        return
    }
    router.push({ path: '/search', query: { key: item.first } })
};

// 搜索建议列表，点击后跳转到相对应的落地页
const jumpPage = (item: any, type: string) => {
    switch (type) {
        case 'songs':
            router.push({ path: '/song', query: { id: item.id } })
            break
        case 'artists':
            router.push({ path: '/singer', query: { id: item.id } })
            break
        case 'albums':
            router.push({ path: '/album', query: { id: item.id } })
            break
        case 'playlists':
            router.push({ path: '/playlist/detail', query: { id: item.id } })
            break
    }
};

onMounted(() => {
    getSearchHot();
});


</script>
<style>
.el-select-dropdown__wrap {
    max-height: 400px;
}
</style>
<style lang="less" scoped>
.search {
    position: relative;
    display: flex;
    align-items: center;
    text-align: right;
    background: #fff;
    border-bottom: 1px solid #999;

    .keyVal {
        width: 250px;
        border: 0;

        :deep(input) {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            border: none;
        }
    }
}

.hot-search {
    h5 {
        padding: 5px 0 5px 20px;
        font-size: 18px;
    }

    .top-0 {
        font-weight: bold;
        color: rgb(255 0 0 / 100%);
    }

    .top-1 {
        font-weight: bold;
        color: rgb(255 0 0 / 60%);
    }

    .top-2 {
        font-weight: bold;
        color: rgb(255 0 0 / 40%);
    }
}

.item {
    padding-right: 20px;

    .artists {
        font-size: 12px;
        color: var(--color-text);
    }

    &.selected {
        color: var(--color-text-height);

        .artists {
            color: var(--color-text-height);
        }
    }
}
</style>