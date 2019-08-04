import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
