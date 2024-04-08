<template>
  <div>
    <!-- Disabled -->
    <div class="d-flex align-center justify-space-between mb-4">
      <label class="offWhite--text">Disabled</label>
      <v-switch
        v-model="getVuexActiveField.disabled"
        inset
        dense
        hide-details
        class="ma-0 mr-n4"
        :ripple="false"
        color="offWhite"
      ></v-switch>
    </div>

    <!-- Clearable -->
    <div class="d-flex align-center justify-space-between mb-4">
      <label class="offWhite--text">Clearable</label>
      <v-switch
        v-model="getVuexActiveField.clearable"
        inset
        dense
        hide-details
        class="ma-0 mr-n4"
        :ripple="false"
        color="offWhite"
      ></v-switch>
    </div>

    <!-- Multiple -->
    <div class="d-flex align-center justify-space-between mb-4">
      <label class="offWhite--text">Multiple</label>
      <v-switch
        v-model="getVuexActiveField.multiple"
        inset
        dense
        hide-details
        class="ma-0 mr-n4"
        :ripple="false"
        color="offWhite"
      ></v-switch>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SelectListAdvancedProp",
  computed: {
    ...mapGetters(["getVuexActiveField"]),
  },
};
</script>
