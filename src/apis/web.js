import { apiHelper } from '../utils/axios'

export const webApi = {
  news: {
    getNewsList(length, categoryId, orderBy) {
      return apiHelper.get(
        `/webapi/newslist?length=${length}&categoryId=${categoryId}&orderBy=${orderBy}`
      )
    },
    getPaginatedNewsByCategory(currentPage, perPage, categoryId, orderBy) {
      return apiHelper.get(
        `/webapi/newslist/getPaginatedNewslist?currentPage=${currentPage}&perPage=${perPage}&categoryId=${categoryId}&orderBy=${orderBy}`
      )
    },
    getNews(id, isDateFormatted) {
      return apiHelper.get(
        `/webapi/newslist/${id}?isDateFormatted=${isDateFormatted}`
      )
    },
    postNewsViewCount(id) {
      return apiHelper.post(`/webapi/newslist/${id}/viewCountIncrement`)
    },
  },
  products: {
    getProducts(length) {
      return apiHelper.get(`/webapi/products?length=${length}`)
    },
    getPaginatedProductsByVariety(currentPage, perPage, varietyId) {
      return apiHelper.get(
        `/webapi/products/getPaginatedProducts?currentPage=${currentPage}&perPage=${perPage}&varietyId=${varietyId}`
      )
    },
    getProduct(id, isDateFormatted) {
      return apiHelper.get(
        `/webapi/products/${id}?isDateFormatted=${isDateFormatted}`
      )
    },
  },
  categories: {
    getCategories() {
      return apiHelper.get('/webapi/categories')
    },
  },
  varieties: {
    getVarieties() {
      return apiHelper.get('/webapi/varieties')
    },
  },
}
