import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1a1625",
        secondary: "#2f2b3a",
        accent: "#46424f",
        info: "#5e5a66",
        success: "#76737e",
        light: "#908d96",
        offWhite: "#f0f0f0",
      },
    },
  },
});
