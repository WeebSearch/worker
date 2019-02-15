import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import Buefy from "buefy";

import { library } from "@fortawesome/fontawesome-svg-core";

library.add()


Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

