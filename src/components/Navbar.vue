<template>
  <el-affix :offset="0">
    <el-menu
      mode="horizontal"
      text-color="#005089"
      class="w-100 fw-bolder"
      background-color="#F6AC3B"
      :router="true"
      :ellipsis="false"
      :default-active="route.fullPath"
    >
      <el-menu-item>
        <a href="/" style="text-decoration: none;" class="fs-4">企業官網</a>
      </el-menu-item>
      <div style="flex-grow: 1;"></div>
      <el-menu-item index="/news" class="fs-6">新聞中心</el-menu-item>
      <el-menu-item index="/products" class="fs-6">產品與服務</el-menu-item>
      <el-sub-menu index="">
        <template #title><span class="fs-6">關於我們</span></template>
        <el-menu-item index="/about/intro" class="fs-6">品牌介紹</el-menu-item>
        <el-menu-item index="/about/media" class="fs-6">相關活動</el-menu-item>
        <el-menu-item index="/about/qa" class="fs-6">常見問題集</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-affix>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss">
.el-menu{
  --el-menu-hover-bg-color: rgb(255, 255, 255, .7) !important;
  .el-menu-item.is-active, .el-sub-menu.is-active {
    --el-menu-active-color: #000 !important;
  }
}
</style>