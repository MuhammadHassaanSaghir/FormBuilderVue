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
    <!-- Minimum Value -->
    <div class="mb-4">
      <div class="d-flex align-center justify-space-between mb-2">
        <label class="offWhite--text">Min Value</label>
        <v-switch
          v-model="getVuexActiveField.hasMinValue"
          inset
          dense
          hide-details
          class="ma-0 mr-n4"
          :ripple="false"
          color="offWhite"
        ></v-switch>
      </div>
      <div v-if="getVuexActiveField.hasMinValue">
        <v-text-field
          v-model.number="getVuexActiveField.min"
          type="number"
          outlined
          dark
          dense
          hide-details
          class="rounded"
        ></v-text-field>
      </div>
    </div>
    <!-- Maximum Value -->
    <div class="mb-4">
      <div class="d-flex align-center justify-space-between mb-2">
        <label class="offWhite--text">Max Value</label>
        <v-switch
          v-model="getVuexActiveField.hasMaxValue"
          inset
          dense
          hide-details
          class="ma-0 mr-n4"
          :ripple="false"
          color="offWhite"
        ></v-switch>
      </div>
      <div v-if="getVuexActiveField.hasMaxValue">
        <v-text-field
          v-model.number="getVuexActiveField.max"
          type="number"
          outlined
          dark
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
  name: "NumberInputAdvancedProps",
  computed: {
    ...mapGetters(["getVuexActiveField"]),
  },
};
</script>
