import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import notfond from '@/views/404'
import store from '@/store'
import image from '@/views/image'
import publish from '@/views/publish'

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
        },
        {
          path: '/image',
          name: 'image',
          component: image
        },
        {
          path: '/publish',
          name: 'publish',
          component: publish
        }
      ]
    },
    {
      path: '*', name: '404', component: notfond
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next()
  // if (!store.getUser().token) return next('/login')
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
