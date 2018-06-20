import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/Index'
import Mine from '@/components/Mine';
import TheBottle from '@/components/TheBottle';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path:'/index',
      name: 'Index',
      component: Index
    },
    {
      path:"/mine",
      component:Mine
    },
    {
      path:"/theBottle",
      component:TheBottle
    }
    
  ]
})
