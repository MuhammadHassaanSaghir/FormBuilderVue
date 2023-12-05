import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import apiRequest from "@/services/apiRequest";
import snackbar from "./modules/snackbar";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = {
  state: {},
  getters: {},
  mutations: {
    logout() {
      // window.localStorage.removeItem("vuex");
      //clear local storage
      localStorage.clear();
    },
  },
  actions: {
    /**
     * This action is used to send logout api call
     * @param context
     * @param payload
     * @returns {Promise<unknown>}
     */
    logout(context, payload) {
      return new Promise((resolve, reject) => {
        let done = async (response) => {
          if (response.status == 200 || response.status == 201) {
            context.commit("logout");
            resolve(response);
          } else {
            context.dispatch("handleSnackBar", response);
            reject(response);
          }
        };
        apiRequest.post("auth/logout", payload, done);
      });
    },
    /**
     * This function is used to show snackbar for both cases i.e. success or error
     *
     * @param response
     * @returns void
     */
    handleSnackBar(context, response) {
      let message,
        color = "error";
      if (response?.data?.message) {
        color = "success";
        message = response?.data?.message;
      } else if (response?.response?.data?.message) {
        message = response.response.data.message;
      } else {
        message = "Something went wrong";
      }
      context.commit("set_snack_data", {
        message,
        color,
        snackbar: true,
      });
    },
    /**
     * This method is responsible to read data
     *
     * @param {String} url
     * @return promise
     */
    readData(context, url) {
      return new Promise((resolve, reject) => {
        let done = async (response) => {
          if (response.status == 200 || response.status == 202) {
            resolve(response);
          } else {
            context.dispatch("handleSnackBar", response);
            reject(response);
          }
        };
        apiRequest.get(url, done);
      });
    },
    /**
     * This method is responsible to make an api call to read data for post request
     *
     * @param {Object} payload contain url and data
     * @return promise
     */
    readPostData(context, payload) {
      return new Promise((resolve, reject) => {
        let done = async (response) => {
          if (response.status == 200) {
            resolve(response);
          } else {
            context.dispatch("handleSnackBar", response);
            reject(response);
          }
        };
        apiRequest.post(payload.url, payload.data, done);
      });
    },
    /**
     * This method is responsible to make an api call to add/update/delete data for post request
     *
     * @param {Object} payload contain url and data
     * @return promise
     */
    postData(context, payload) {
      return new Promise((resolve, reject) => {
        let done = async (response) => {
          if (response.status == 200 || response.status == 201) {
            resolve(response);
          } else {
            context.dispatch("handleSnackBar", response);
            reject(response);
          }
        };
        apiRequest.post(payload.url, payload.data, done);
      });
    },
    /**
     * This function is used to get latest data on page refresh
     *
     * @returns void
     */
    getUserData() {
      return new Promise((resolve, reject) => {
        let done = async (response) => {
          if (response.status == 200) {
            resolve(response);
          } else {
            reject(response);
          }
        };
        apiRequest.get("getUserData", done);
      });
    },
  },
  plugins: [vuexLocal.plugin],
  modules: {
    snackbar,
  },
};

export default new Vuex.Store(store);
