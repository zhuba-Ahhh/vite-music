<template>
    <header class="header">
        <div class="menu">
        </div>
        <Search />
        <div :class="isLogin ? 'user-avatar' : 'login'">
            <div class="logined" v-if="isLogin">
                <el-image :src="userInfo?.avatarUrl" class="avatar">
                    <div slot="placeholder" class="image-slot">
                        <i class="iconfont icon-placeholder"></i>
                    </div>
                </el-image>
                <span class="nickname">{{ userInfo?.nickname }}</span>
                <span class="set"><i class="iconfont icon-set"></i></span>
                <span class="quit" @click="logout"><i class="iconfont icon-quit"></i></span>
            </div>
            <span class="login-btn" @click="loginDialog" v-else>登录</span>
        </div>
    </header>
</template>
<script setup lang="ts">
import Search from './Search.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
// import { storeToRefs } from 'pinia'
import { logout as apiLogout, PartialProfile } from '../apis';
// import { useStore } from 'vuex';
// import { useStore } from '../store';
// 可以在组件中的任意位置访问 `store` 变量 ✨
// const store = useStore();
// const { isLogin } = storeToRefs(store)
const isLogin = false;

// const store = useStore();
const route = useRoute();
const router = useRouter();

// 是否显示登录弹窗
const loginDialog = () => { }//store.commit('setLoginDialog', true);
// 登录成功后，获取用户信息
const userInfo = computed<PartialProfile>(() => {
    return {}//store.getters.userInfo
});

const logout = async () => {
    const { data: res } = await apiLogout();

    if (res.code !== 200) {
        return ElMessage.error('数据请求失败');
    }

    ElMessage.success('退出成功');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('cookie');
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('isLogin');
    // store.commit('setUserInfo', {});
    // store.commit('SET_LOGIN', false);

    if (route.path.indexOf('/my') >= 0) {
        router.push({ path: '/' })
    }
};

</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.menu {
    flex: 1;
}

.user-avatar {
    padding: 5px 0 5px 20px;
    text-align: center;

    .avatar {
        display: inline-block;
        overflow: hidden;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        cursor: pointer;
    }

    .logined {
        display: flex;
        align-items: center;

        span {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            font-weight: 300;
            padding: 0 10px;
            cursor: pointer;
        }

        .iconfont {
            color: var(--color-text-main);
            vertical-align: top;
        }
    }
}

.login {
    padding: 0 20px;
    text-align: center;

    .login-btn {
        font-size: 16px;
        cursor: pointer;
    }
}
</style>