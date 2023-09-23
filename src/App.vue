<template>
  <el-container direction="vertical" style="width: 100vw; height: 100vh;">
    <Navbar />
    <el-main style="height: calc(100vh - 59px); padding: 0; background: rgba(245, 173, 53, .09);">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import Navbar from '@/components/Navbar'
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.el-tabs__item {
  font-size: 18px !important;
}
</style>
