<template>
  <el-scrollbar class="h-100" wrap-class="back">
  <div class="products-detail m-5">
    <div class="row">
      <div class="col-8 products-main d-flex flex-column">
        <h3 class="mb-3 ms-3">{{ product.title }}</h3>
        <p class="text-secondary text-end me-3">
          <span class="me-5">發佈日期：{{ product.createdAt }}</span>
        </p>
        <el-divider class="mt-2 mb-5"></el-divider>
        <div class="mb-5 d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <el-image style="width: 600px; height: 400px" :src="product.cover" fit="contain" />
          </div>
          <div class="text-secondary d-flex justify-content-center align-items-center mx-auto">
            <el-icon><CaretTop /> </el-icon>
            <span class="">{{ product.title }}</span>
          </div>
        </div>
        <p v-html="product.desc" class="mb-5 fs-5" style="line-height: 3;"></p>
      </div>
      <div class="col-4 products-aside mt-5 ps-5">
        <el-card class="box-card">
          <template #header>
            <div class="card-header fs-5 text-center">☆★推薦閱讀★☆</div>
          </template>
          <div
            v-for="item in topProductlist"
            class="text item products-recommended p-2"
            :key="item.id"
            @click="handleClickProduct(item.id)"
          >
            ◆ {{ item.title }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
  <el-backtop target=".back" />
</el-scrollbar>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {  CaretTop } from '@element-plus/icons-vue'

import { webApi } from '@/apis/web'

const route = useRoute()
const router = useRouter()
const product = ref({})
const topProductlist = ref([])

const getProduct = async (id) => {
  try {
    const res = await webApi.products.getProduct(id)
    if (res.data.status === 'success') return product.value = res.data.product
  } catch (error) {
    console.error(error)
  }
}

const getTopProductslist = async () => {
  try {
    const res = await webApi.products.getProducts(4)
    if (res.data.status === 'success') return topProductlist.value = res.data.products
  } catch (error) {
    console.error(error)
  }
}

const handleClickProduct = (varietyId) => {
  router.push(`/products/${varietyId}`)
}

watch(() => route.params.id, () => {
  getProduct(route.params.id) 
})

onMounted(() => {
  getProduct(route.params.id)
  getTopProductslist()
})
</script>

<style lang="scss">
.products-recommended {
  transition: background-color 0.3s;
  border-radius: 10px;
  &:hover {
    background-color: rgba(110, 200, 218, .2);
  }
}
</style>