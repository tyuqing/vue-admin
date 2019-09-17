import Layout from '@/layout/index.vue';

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'article',
  meta: { title: '文章列表', icon: 'ios-apps' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/article/list.vue'),
      name: 'article-list',
      meta: { title: '文章列表', icon: 'component', breadcrumb: false },
    },
    {
      path: 'edit/:articleId',
      component: () => import('@/views/article/edit.vue'),
      name: 'article-edit',
      meta: { title: '文章编辑', icon: 'component', roles: ['admin', 'editor'] },
    },
  ],
};
export default articleRouter;
