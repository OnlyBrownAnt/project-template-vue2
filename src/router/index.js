import VueRouter from 'vue-router';
import Vue from "vue";
import store from "@/store";
// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      navLeft: false,
      navTitle: 'home'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {
      navLeft: true,
      navRight: true,
      navTitle: 'demo',
      navLeftOperateType: 1, // 左边按钮触发事件类型
      navLeftOperateValue: '/' // 左边按钮触发事件参数
    },
    component: () => import("@/views/demo/index.vue")
  },
]
const router = new VueRouter({
  mode: "hash",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  // 路由变化路径保存
  store.commit('common/setRouteToPath', to.path);
  store.commit('common/setRouteFromPath', from.path);

  next();
})
router.beforeResolve((to, from, next) => {
  // 导航栏title赋值，在解析守卫中赋值，可以避免跳转前提前显示。在解析守卫中处理用户无法进入页面时执行希望避免执行的操作
  store.commit('common/setNavTitle', to.meta.navTitle);

  next();
})
router.afterEach((to, from) => {
})

export default router;
