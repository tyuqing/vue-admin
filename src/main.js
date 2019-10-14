import Vue from 'vue';
import iview from 'iview';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import 'iview/dist/styles/iview.css';
/* the global css */
import '@/styles/func.css';
import '@/styles/common.scss';

import './permission';

Vue.config.productionTip = false;
Vue.use(iview);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
