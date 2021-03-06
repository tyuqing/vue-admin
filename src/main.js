import Vue from 'vue';
import ViewUI from 'view-design';
import settings from '@/settings.js';
import App from './app.vue';
import router from './router/index';
import store from './store/index';
import 'view-design/dist/styles/iview.css';
/* the global css */
import '@/styles/func.css';
import '@/styles/common.scss';
import '@/styles/goui.scss';

import './permission';

// global settings

Vue.config.productionTip = false;
Vue.use(ViewUI);

Vue.mixin({
  computed: {
    $settings() {
      return settings;
    },
  },
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
