import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import notfond from '@/views/404'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',

      component: home,

      children: [
        {
          path: '/',
          name: 'welcome',
          component: welcome
        },
        {
          path: '/article',
          name: 'article',
          component: article
        }
      ]
    },
    {
      path: '*', name: '404', component: notfond
    }
  ]
})

export default router
