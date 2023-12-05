import axios from "axios";
import store from "@/store/index";
import router from "@/router";

//base url
let baseURL = process.env.VUE_APP_BASE_URL;
console.log("base url::", baseURL);

let customAxios;

const apiRequest = {
  /**
   *
   * make post api request
   * @param {String} endpoint
   * @param {Object} body
   * @param {Function} success called after api response/error
   * @param {Object} config custom configurations for axios
   * @return void
   */
  post: async (endpoint, body, success, config = null) => {
    //if offline then do not call api
    if (!navigator.onLine) {
      return;
    }
    customAxios = apiRequest.makeCustomAxiosInstance(config);
    await customAxios
      .post(endpoint, body)
      .then((res) => {
        success(res);
      })
      .catch((err) => {
        //if token is unauthorized
        if (err?.response?.status == 401) {
          apiRequest.unauthorizedToken();
        } else {
          success(err);
        }
      });
  },

  /**
   * make get api request
   * @param {String} endpoint
   * @param {Object} body
   * @param {Function} success called after api response/error
   * @param {Object} config custom configurations for axios
   * @return void
   */
  get: async (endpoint, success, config) => {
    //if offline then do not call api
    if (!navigator.onLine) {
      return;
    }
    customAxios = apiRequest.makeCustomAxiosInstance(config);
    await customAxios
      .get(endpoint)
      .then((res) => {
        success(res);
      })
      .catch((err) => {
        //if token is unauthorized
        if (err?.response?.status == 401) {
          apiRequest.unauthorizedToken();
        } else {
          success(err);
        }
      });
  },

  /**
   * make custom axios instance
   * @param {Object} config The config object provided by user.
   * @return axios custom instance
   */
  makeCustomAxiosInstance: (config) => {
    let token = localStorage.getItem("token");
    //custom configuration for axios
    let axiosConfig = {
      baseURL,
    };
    //if token is present
    if (token) {
      axiosConfig.headers = {
        token: JSON.parse(token),
      };
    }
    //if any extra configuration is provided like upload progress
    if (config) {
      axiosConfig.onUploadProgress = function (progressEvent) {
        config.progress = parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
      };
    }
    //create and return axios instance with custom configurations
    return axios.create(axiosConfig);
  },

  /**
   * user is unauthorized, go to login page
   *
   * @return void
   */
  unauthorizedToken: () => {
    //clear all storages
    store.commit("logout");
    //resolve route
    let login = router.resolve({
      name: "login",
      params: "/",
    });
    //move to login page
    window.location.assign(login.href);
  },
};
export default apiRequest;
