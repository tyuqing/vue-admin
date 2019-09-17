import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
import articleRouter from './modules/article';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
        meta: { title: '首页' },
      },
    ],
  },
];
export const asyncRoutes = [
  articleRouter,
];
export default new Router({
  routes: constantRoutes,
});
/**
 * TODO重置路由
 */
export function resetRouter() {

}
