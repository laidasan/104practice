// 載入工具
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Error from '../views/Error.vue'




// Vue.use（xxx)  使用 xxx 外掛 
Vue.use(VueRouter)


  // 路由器 routes
  // router 會由上到下 讀取路徑
  // 直到跟使用者網址一樣的路徑 , 就載入
  // router 也有生命週期

  // 以後會換到子路由
  const routes = [
  {
    path: '/',
    name: 'Home',
    // componet 這樣的使用 , 會把所有東西打包在一起
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // 會產生 雜揍碼
    // which is lazy-loaded when the route is visited.

    // 注意 /* webpackChunkName: "about" */ 這段不是註解 , 因為這裡的路由載入機制（ import etc..) 是配合 webpack 使用的
    // 所以別把 /* webpackChunkName: "about" */ 刪掉囉
    // 這個後面的 “about" 是自己取的名字
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // 當進入 about 頁面的時候 才會把 about.js 載進來
    


    // Question:
    // component: 
    // component: () => 
    // 這兩著的差別
    // Tip: 開 network 看看
  },
  // {
  //   path: '/class',
  //   name: 'class',
  //   component: () => {import(/* webpackChunkName: "test" */ '../components/TestComponent')},

  //   // 第二種方式 「 內層 」 , 較複雜
  //   // 這種方式比較常用在只換同一個頁面的某一部份
  //   children: [
  //     {
  //       path: 'cid',
  //       component: () => {import(/* webpackChunkName: "test" */ '../components/Detail')}
  //     }
  //   ]
  // },
  
  // 第一種方式 「 同層 」, ： 為 params
  // {
  //   path: '/class/:cid',
  //   name: 'ClassDetail',
  //   component: () => {import(/* webpackChunkName: "test" */ '../components/Detail')}
  // },

  {
    path: '/404',
    component: Error
  },

  // 以上都路徑都沒有的時後
  // 重新導向 (redirect)
  // {
  //   path:'*',
  //   redirect: '/' 
  // },

  // error page

  // 留下 url
  // method 1
  // {
  //   path:'*',
  //   component: Error
  // },

  // 不留 url
  // method 2
  {
    path:'*',
    redirect: '/404',
    component: Error
  }
]

const router = new VueRouter({
  // 兩種mode
  // hash (default) 有 # 字號


  // history 沒有 # 要注意 , 要跟後端配合 , 需要將 url 在後端要指向路徑
  // vue-cli 有幫我們做了這件事情 , 所以用 vue-cli 跑的時候是正常的
  routes
})


// 通常搭配 meta , 是否要驗證 , 做確認
// router.beforeEach()
router.beforeEach()


// router.beforeEnter(to,from,next)


// router.afterEach(to,from)
// 沒有 next 喔 afterEach 是最後一部了
export default router

// exprot default new VueRouter({ routes })
