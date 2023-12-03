<template>
  <el-container>
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main>
      <Header />
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

onMounted(() => {
  const $script = document.createElement("script");

  $script.src =
    "https://s9.cnzz.com/z_stat.php?id=1280869713&web_id=1280869713";
  $script.type = "text/javascript";
  document.body.appendChild($script);
});
</script>
