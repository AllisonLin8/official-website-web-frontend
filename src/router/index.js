import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home'
import Newslist from '@/views/news/Newslist'
import News from '@/views/news/News'
import Products from '@/views/product/Products'
import Product from '@/views/product/Product'
import Intro from '@/views/about/Intro'
import Media from '@/views/about/Media'
import Qa from '@/views/about/Qa'
import NotFound from '@/views/NotFound'

import 'nprogress/nprogress.css'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/news', name: 'newslist', component: Newslist },
  { path: '/news/:id', name: 'news', component: News },
  { path: '/products', name: 'products', component: Products },
  { path: '/products/:id', name: 'product', component: Product },
  { path: '/about/intro', name: 'intro', component: Intro },
  { path: '/about/media', name: 'media', component: Media },
  { path: '/about/qa', name: 'qa', component: Qa },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
