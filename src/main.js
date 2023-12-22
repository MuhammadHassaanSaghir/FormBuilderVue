import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import router from "./router/index";
import style from "./assets/style/style.css";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  style,
  render: (h) => h(App),
}).$mount("#app");
