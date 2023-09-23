<template>
  <div class="contanier">
    <el-carousel v-if="productLoopList.length" height="calc(100vh - 59px)">
      <el-carousel-item v-for="item in productLoopList" :key="item.id">
        <div :style="{backgroundImage:`url(${item.cover})`}" class="d-flex justify-content-end">
          <el-drawer v-model="drawer" :show-close="false" :size="cardWidth" :modal="false" :with-header="false" style="background-color: rgba(255, 255, 255, 0.7); color: #005089;">
            <el-scrollbar wrap-class="back">
              <h2 class="pt-4 pb-2 px-5 fw-bold">
                <span class="extender" @click="handleArrowClick">
                  <el-icon v-if="cardWidth === '50%'"><DArrowLeft /></el-icon>
                  <el-icon v-else><DArrowRight /></el-icon>
                </span>
                {{ item.title }}
              </h2>
              <p class="text-end mt-2">
                <el-tag class="ml-2 me-3" size="large" type="danger">
                  {{ item.variety }}
                </el-tag>
              </p>
              <p><el-divider class="mt-2" border-style="dashed" /></p>
              <p class="px-5 fs-4 fst-italic fw-lighter">{{ item.subtitle }}</p>
              <p class="p-5 fs-5">{{ item.desc }}</p>
              <p class="p-5 text-end" style="text-decoration: underline;">歡迎聯絡：contactus@example.com</p>
            </el-scrollbar>
          </el-drawer>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暫無產品資料" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

import { webApi } from '@/apis/web'

const drawer = ref(true)
const cardWidth = ref('50%')
const productLoopList = ref([])

const getProducts = async () => {
  try {
      const res = await webApi.products.getProducts(5)
      if (res.data.status === 'success') return productLoopList.value = res.data.products
  } catch (error) {
      console.error(error)
  }
}

const handleArrowClick = () => {
  if (cardWidth.value === '50%') return cardWidth.value = '100%'
  if (cardWidth.value === '100%') return cardWidth.value = '50%'
}

onMounted(() => {
    getProducts()
})
</script>

<style lang="scss" scoped>
.el-carousel {
  width: 100%;
  div {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: left;
    .el-drawer {
      padding-right: 0 !important;
    }
    h3 {
      position: relative;
    }
    .extender {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>