<template>
  <el-scrollbar class="h-100" wrap-class="back">
  <div class="news-detail m-5">
    <div class="row">
      <div class="col-8 news-main d-flex flex-column">
        <h3 class="mb-3 ms-3">{{ news.title }}</h3>
        <p class="text-secondary text-end me-3">
          <span class="me-5">初稿日期：{{ news.createdAt }}</span>
          <span>更新日期：{{ news.updatedAt }}</span>
        </p>
        <el-divider class="mt-2 mb-5"></el-divider>
        <div class="mb-5 d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <el-image style="width: 600px; height: 400px" :src="news.cover" fit="contain" />
          </div>
          <div class="text-secondary d-flex justify-content-center align-items-center mx-auto">
            <el-icon><CaretTop /> </el-icon>
            <span class="">{{ news.title }}</span>
          </div>
        </div>
        <p v-html="news.content" class="mb-5 fs-5" style="line-height: 3;"></p>
        <p class="mt-5 text-end text-secondary">點閱數：{{ news.viewCount }}</p>
      </div>
      <div class="col-4 news-aside mt-5 ps-5">
        <el-card class="box-card">
          <template #header>
            <div class="card-header fs-5 text-center">☆★推薦閱讀★☆</div>
          </template>
          <div
            v-for="item in topNewslist"
            class="text item news-recommended p-2"
            :key="item.id"
            @click="handleClickNews(item.id)"
          >
            ◆ {{ item.title }}
            <div class="my-2 text-end text-secondary">點閱數：{{ item.viewCount }} 次</div>
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
import { CaretTop } from '@element-plus/icons-vue'

import { webApi } from '@/apis/web'

const route = useRoute()
const router = useRouter()
const news = ref({})
const topNewslist = ref([])

const getNews = async (id) => {
  try {
    const res = await webApi.news.getNews(id)
    if (res.data.status === 'success') return news.value = res.data.news
  } catch (error) {
    console.error(error)
  }
}

const getTopNewslist = async () => {
  try {
    const res = await webApi.news.getNewsList(4, null, 'viewCount')
    if (res.data.status === 'success') return topNewslist.value = res.data.news
  } catch (error) {
    console.error(error)
  }
}

const handleClickNews = async (newsId) => {
  try {
    await webApi.news.postNewsViewCount(newsId)
    router.push(`/news/${newsId}`)
  } catch (error) {
    console.error(error)
  }
}

watch(() => route.params.id, () => {
  getNews(route.params.id) 
  getTopNewslist()
})

onMounted(() => {
  getNews(route.params.id)
  getTopNewslist()
})
</script>

<style lang="scss">
.news-recommended {
  transition: background-color 0.3s;
  border-radius: 10px;
  &:hover {
    background-color: rgba(110, 200, 218, .2);
  }
}
</style>