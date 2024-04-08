<template>
  <v-snackbar
    v-model="localSnackbar"
    :timeout="2000"
    :color="color"
    rounded="lg"
    class="ma-0"
    style="z-index: 999 !important"
    @input="barClose()"
    text
    id="custom-snackbar"
  >
    <div class="d-flex">
      <v-icon :color="color == 'success' ? '#4CAF50' : '#FF5252'" size="20">
        {{ color == "success" ? "mdi-check-circle" : "mdi-close-circle" }}
      </v-icon>
      <span v-if="color == 'success'" class="pl-2" id="snack-bar-success-id">
        <b class="mr-1">Success! </b>
        {{ messages }}
      </span>
      <span v-else class="pl-2 d-flex justify-center" id="snack-bar-error-id">
        <b class="mr-1">Error! </b>
        {{ messages }}
      </span>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        id="close-snackbar-btn"
        x-small
        icon
        @click="barClose"
        class="mr-1"
      >
        <v-icon small color="#222629">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "SnackbarComponent",
  props: {
    snackbar: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: String,
    },
    color: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      localSnackbar: false,
    };
  },
  methods: {
    /**
     * This method is responsible to close the snackbar.
     *
     * @return {void}
     */
    barClose() {
      let data = {
        snackbar: false,
        message: "",
        color: "success",
      };
      this.$store.commit("set_snack_data", data);
    },
  },
  updated() {
    if (this.snackbar == true) {
      this.localSnackbar = true;
    }
  },
};
</script>
<style scoped>
.success-text {
  color: #4caf50 !important;
}
.error-text {
  color: #ff5252 !important;
}
</style>
