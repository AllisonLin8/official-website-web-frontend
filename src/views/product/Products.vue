<template>
  <el-scrollbar class="box w-100" wrap-class="scrollbar-box">
    <div class="products-category m-5">
      <el-tabs v-model="activeName" class="products-tabs" @tab-change="handleClickVariety">
        <el-tab-pane
          v-for="item in varieties"
          :key="item.id"
          :label="item.name"
          :name="item.id"
        >
          <div class="row mt-4">
            <div class="col-8 ps-5">
              <div v-for="item in productsByVarietyList">
                <div class="row products-info" @click="handleClickProduct(item.id)">
                  <div class="col-4 d-flex justify-content-center align-items-center p-0">
                    <el-image style="object-fit: contain; object-position: 50% 50%;" :src="item.cover" class="products-img"/>
                  </div>
                  <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                    <span class="col-11 fs-5">{{ item.title }}</span>
                  </div>
                </div>
                <el-divider></el-divider>
              </div>
              <el-pagination
                class="mx-3"
                layout="total, prev, pager, next, ->, jumper, sizes"
                :total="pageInfo.dataCount"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="pageInfo.perPage"
                :page-count="pageInfo.pageCount"
                :current-page="pageInfo.currentPage"
                @update:current-page="handleCurrentPageChange"
                @update:page-size="handlePerSizeChange"
              />
            </div>
            <div class="col-4 pe-5 pt-5 mt-5">
              <el-timeline>
                <el-timeline-item
                  v-for="item in productsByVarietyList"
                  center
                  size= "large"
                  type="danger"
                  placement="top"
                  :key="item.id"
                  :icon="MoreFilled"
                  :timestamp="item.createdAt"
                  >
                  <el-card @click="handleClickProduct(item.id)" class="mb-3" shadow="hover">
                    <p class="m-0">{{ item.title }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-backtop :visibility-height="100" target=".scrollbar-box"/>
    </div>
    <div style="background: #005089;" class="text-light text-center">
      &copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin
    </div>
  </el-scrollbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'

import { webApi } from '@/apis/web'

const router = useRouter()
const varieties = ref([])
const activeName = ref('')
const pageInfo = reactive({
  dataCount: 0,
  pageCount: 0,
  currentPage: 1,
  perPage: 5,
  varietyId: 1,
})
const productsByVarietyList = ref([])

const getVarieties = async () => {
  try {
    const res = await webApi.varieties.getVarieties()
    if (res.data.status === 'success') {
      varieties.value = res.data.varieties
      return activeName.value = res.data.varieties[0].id
    }
  } catch (error) {
    console.error(error)
  }
}

const getPaginatedProductsByVariety = async (pageInfo) => {
  try {
    const { perPage, currentPage, varietyId } = pageInfo
    const res = await webApi.products.getPaginatedProductsByVariety(currentPage, perPage, varietyId)
    if (res.data.status === 'success') {
      const products = res.data.products
      productsByVarietyList.value = products.data
      pageInfo.dataCount = products.pageInfo.dataCount
      pageInfo.pageCount = products.pageInfo.pageCount
      return
    }
  } catch (error) {
    console.error(error)
  }
}

const handleClickProduct = (varietyId) => {
  router.push(`/products/${varietyId}`)
}

const handleClickVariety = async (varietyId) => {
  try {
    pageInfo.varietyId = varietyId
    pageInfo.currentPage = 1
    await getPaginatedProductsByVariety(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

const handlePerSizeChange = async (perPage) => {
  try {
    pageInfo.perPage = perPage
    await getPaginatedProductsByVariety(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

const handleCurrentPageChange = async (currentPage) => {
  try {
    pageInfo.currentPage = currentPage
    await getPaginatedProductsByVariety(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getVarieties()
})
</script>

<style lang="scss">
.box {
  position: relative;
  .products-header {
    height: 150px;
    background: #F5AD35;
    opacity: .1;
  }
  .products-search {
    position: relative;
    top: 50%;
    left: 50%;
    width: 70%;
    transform: translate(-50%,-250%);
  }
  .products-category {
    .products-tabs {
      .products-info {
        background-color: rgba(110, 200, 218, .2);
        border-radius: 10%;
        transition: box-shadow 0.3s;
        &:hover{
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        }
        .products-img {
          border-radius: 10% 0 0 10%;
        }
      }
    }
  }
}
</style>