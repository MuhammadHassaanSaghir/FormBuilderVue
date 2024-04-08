<template>
  <div>
    <!-- Rating Value -->
    <div>
      <div class="d-flex align-center justify-space-between mb-4">
        <label class="offWhite--text">Rating Value</label>
        <v-switch
          v-model="getVuexActiveField.showScore"
          inset
          dense
          hide-details
          class="ma-0 mr-n4"
          :ripple="false"
          color="offWhite"
        ></v-switch>
      </div>
      <div v-if="getVuexActiveField.showScore">
        <label class="offWhite--text">Value Title</label>
        <v-text-field
          v-model.number="getVuexActiveField.scoreUnit"
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
  name: "RatingAdvancedProp",
  computed: {
    ...mapGetters(["getVuexActiveField"]),
  },
  methods: {
    showTextChange(value) {
      if (value && this.getVuexActiveField.showScore) {
        this.getVuexActiveField.showScore = false;
      }
    },
    showScoreChange(value) {
      if (value && this.getVuexActiveField.showText) {
        this.getVuexActiveField.showText = false;
      }
    },
  },
};
</script>
