import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Lists from '../views/List.vue'
import All from '../views/All.vue'
import Music from '../views/Music.vue'
import Shopping from '../views/Shopping.vue'
import Sport from '../views/Sport.vue'
import Study from '../views/Study.vue'
import Travel from '../views/Travel.vue'
import Work from '../views/Work.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/lists'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/all',
    name: 'All',
    component: All
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping
  },
  {
    path: '/sport',
    name: 'Sport',
    component: Sport
  },
  {
    path: '/study',
    name: 'Study',
    component: Study
  },
  {
    path: '/travel',
    name: 'Travel',
    component: Travel
  },
  {
    path: '/work',
    name: 'Work',
    component: Work
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
