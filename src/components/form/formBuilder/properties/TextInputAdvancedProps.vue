<template>
  <div>
    <!-- Password -->
    <div class="d-flex align-center justify-space-between mb-4">
      <label class="offWhite--text">Password</label>
      <v-switch
        v-model="getVuexActiveField.showPassword"
        inset
        dense
        hide-details
        class="ma-0 mr-n4"
        :ripple="false"
        color="offWhite"
        @change="passwordChange"
      ></v-switch>
    </div>
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
    <!-- Show Word Limit -->
    <div>
      <div class="d-flex align-center justify-space-between mb-4">
        <label class="offWhite--text">Show Word Limit</label>
        <v-switch
          v-model="getVuexActiveField.showWordLimit"
          inset
          dense
          hide-details
          class="ma-0 mr-n4"
          :ripple="false"
          color="offWhite"
          @change="showWordLimitChange"
        ></v-switch>
      </div>
      <div v-if="getVuexActiveField.showWordLimit">
        <label class="offWhite--text">Word Limit</label>
        <v-text-field
          v-model.number="getVuexActiveField.maxlength"
          type="number"
          outlined
          dark
          min="1"
          dense
          hide-details
          class="rounded"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TextInputAdvancedProps",
  computed: {
    ...mapGetters(["getVuexActiveField"]),
  },
  methods: {
    passwordChange(value) {
      if (value) {
        this.getVuexActiveField.showWordLimit = false;
      }
    },
    showWordLimitChange(value) {
      if (value) {
        this.getVuexActiveField.showPassword = false;
      }
    },
  },
};
</script>
