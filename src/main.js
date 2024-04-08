import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import router from "./router/index";
import style from "./assets/style/style.css";
import { commonMixin } from "./components/utilities/commonMixin";
import { TimeAgo } from "vue2-timeago";
import "vue2-timeago/dist/vue2-timeago.css";
import _ from "lodash";

Vue.config.productionTip = false;

Vue.mixin(commonMixin);

Vue.use(_);

Vue.component("v-time-ago", TimeAgo);

new Vue({
  vuetify,
  store,
  router,
  style,
  render: (h) => h(App),
}).$mount("#app");
