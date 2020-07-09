import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import "./plugins";

// if (process.env.NODE_ENV === "test") {
//   const { mockXHR } = require("../mock/static");
//   mockXHR();
// }

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#vue-admin-beautiful')
