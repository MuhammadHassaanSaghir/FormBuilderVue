<template>
  <div id="app">
    <snackbar-component
      v-show="this.$store.state.snackbar.snack"
      :snackbar="snackBar.snackbar"
      :messages="snackBar.message"
      :color="snackBar.color"
    />
    <router-view></router-view>
  </div>
</template>
<script>
import SnackbarComponent from "./components/utilities/components/SnackbarComponent.vue";
export default {
  name: "App",
  components: {
    SnackbarComponent,
  },
  watch: {
    /**
     * This watcher is responsible to watch for any route changes and then set title of the page accordingly
     *
     * @param {object} to The payload object contains meta
     * @return none
     */
    $route: {
      handler(to) {
        document.title = to?.meta?.title || "Vue2 Scaffold";
      },
      immediate: true,
    },
  },
  computed: {
    snackBar() {
      return this.$store.state.snackbar.snack;
    },
  },
  created() {
    // if (localStorage.getItem("token")) {
    //   //on page refresh get latest data
    //   this.$store.dispatch("getUserData");
    // }
  },
};
</script>
