<template>
  <el-scrollbar class="box w-100" wrap-class="scrollbar-box">
    <div class="news-header mt-5"></div>
    <div class="news-search">
      <el-popover
        width="70%"
        title="搜尋結果"
        placement="bottom"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            size="large"
            type="search"
            placeholder="想找點什麼...？"
            :prefix-icon="Search"
            @blur="visible=false"
            @input="searchText?visible=true:visible=false"
            @focus="searchText?visible=true:visible=false"
            />
        </template>
        <div v-if="searchNewslist.length">
          <div
            v-for="item in searchNewslist"
            class="search-item"
            :key="item.id"
            @click="handleClickNews(item.id)"
          >{{ item.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="找不到相關新聞" :image-size="50" />
        </div>
      </el-popover>
    </div>
    <div class="news-top mx-5">
      <h2
        style="color: #005089; background: rgba(110, 200, 218, .2); border-radius: 20%; text-decoration: underline;"
        class="ms-2 mb-5 text-center py-2 link-offset-1"
      >最近新聞
      </h2>
      <el-row :gutter="20">
        <el-col
          v-for="item in lastestNewsList"
          :span="6"
          :key="item.id"
        >
          <el-card
            class="h-100"
            shadow="hover"
            :body-style="{ padding: '10px' }"
            @click="handleClickNews(item.id)"
          >
            <img class="image w-100 border" :src="item.cover" />
            <div style="padding: 14px" class="w-100">
              <span class="fs-5">{{ item.title }}</span>
              <div class="bottom mt-2">
                <time class="time text-secondary">{{ item.updatedAt }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="news-category m-5">
      <h2
        style="color: #005089; background: rgba(110, 200, 218, .2); border-radius: 20%; text-decoration: underline;"
        class="ms-2 mb-5 text-center py-2 link-offset-1"
      >新聞分類
      </h2>
      <el-tabs v-model="activeName" class="news-tabs" @tab-change="handleClickCategory">
        <el-tab-pane
          v-for="item in categories"
          :key="item.id"
          :name="item.id"
          :label="item.name"
        >
          <div class="row mt-4">
            <div class="col-8 ps-5">
              <div v-for="item in newsByCategoryList">
                <div class="row news-info" @click="handleClickNews(item.id)">
                  <div class="col-4 d-flex justify-content-center align-items-center p-0">
                    <el-image style="object-fit: contain; object-position: 50% 50%;" :src="item.cover" class="news-img"/>
                  </div>
                  <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                    <span class="col-11 fs-5">{{ item.title }}</span>
                    <div class="col-9 text-secondary text-end news-views">點閱：{{ item.viewCount }} 次</div>
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
                @update:page-size="handlePerSizeChange"
                @update:current-page="handleCurrentPageChange"
              />
            </div>
            <div class="col-4 pe-5 pt-5 mt-5">
              <el-timeline>
                <el-timeline-item
                  v-for="item in newsByCategoryList"
                  center
                  size= "large"
                  type="danger"
                  placement="top"
                  :key="item.id"
                  :icon="MoreFilled"
                  :timestamp="'初稿日期：' + item.createdAt"
                  >
                  <el-card @click="handleClickNews(item.id)" class="mb-3" shadow="hover">
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
import { ref, reactive, onMounted, computed } from 'vue'
import { Search, MoreFilled } from '@element-plus/icons-vue'

import { webApi } from '@/apis/web'

const router = useRouter()
const newslist = ref([])
const categories = ref([])
const visible = ref(false)
const searchText = ref('')
const activeName = ref('')
const pageInfo = reactive({
  dataCount: 0,
  pageCount: 0,
  currentPage: 1,
  perPage: 5,
  categoryId: 1,
})
const newsByCategoryList = ref([])

const getNewsList = async (length, categoryId, orderBy) => {
  try {
    const res = await webApi.news.getNewsList(length, categoryId, orderBy)
    if (res.data.status === 'success') return newslist.value = res.data.news
  } catch (error) {
    console.error(error)
  }
}

const getCategories = async () => {
  try {
    const res = await webApi.categories.getCategories()
    if (res.data.status === 'success') {
      categories.value = res.data.categories
      return activeName.value = res.data.categories[0].id
    }
  } catch (error) {
    console.error(error)
  }
}

const getPaginatedNewsByCategory = async (pageInfo, orderBy) => {
  try {
    const { perPage, currentPage, categoryId } = pageInfo
    const res = await webApi.news.getPaginatedNewsByCategory(currentPage, perPage, categoryId, orderBy)
    if (res.data.status === 'success') {
      const news = res.data.news
      newsByCategoryList.value = news.data
      pageInfo.dataCount = news.pageInfo.dataCount
      pageInfo.pageCount = news.pageInfo.pageCount
      return
    }
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

const handleClickCategory = async (categoryId) => {
  try {
    pageInfo.categoryId = categoryId
    pageInfo.currentPage = 1
    await getPaginatedNewsByCategory(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

const handlePerSizeChange = async (perPage) => {
  try {
    pageInfo.perPage = perPage
    await getPaginatedNewsByCategory(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

const handleCurrentPageChange = async (currentPage) => {
  try {
    pageInfo.currentPage = currentPage
    await getPaginatedNewsByCategory(pageInfo)
  } catch (error) {
    console.error(error)
  }
}

const searchNewslist = computed(() => {
  return newslist.value.filter(item => {
    return item.title.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

const lastestNewsList = computed(() => newslist.value.slice(0, 4))

onMounted(() => {
  getNewsList()
  getCategories()
})
</script>

<style lang="scss">
.box {
  position: relative;
  .news-header {
    height: 150px;
    background: #F5AD35;
    opacity: .1;
  }
  .news-search {
    position: relative;
    top: 50%;
    left: 50%;
    width: 70%;
    transform: translate(-50%,-250%);
  }
  .news-category {
    .news-tabs {
      .news-info {
        background-color: rgba(110, 200, 218, .2);
        border-radius: 10%;
        transition: box-shadow 0.3s;
        &:hover{
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        }
        .news-img {
          border-radius: 10% 0 0 10%;
        }
        .news-views {
          border-radius: 100%;
          background-color: rgba(110, 200, 218, .3);
        }
      }
    }
  }
}
.search-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background: #eee;
      color: #000;
    }
}
</style>