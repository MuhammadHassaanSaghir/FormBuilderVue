<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-rating
      v-model="value"
      :half-increments="true"
      color="offWhite"
      :dense="true"
      :readonly="currentField.disabled"
      hover
      class="ma-0 pa-0"
      dark
    ></v-rating>
    <span v-if="currentField.showScore">
      {{ `${value ?? "0"} ${currentField.scoreUnit}` }}
    </span>
  </div>
</template>

<script>
export default {
  name: "RatingComp",
  props: ["currentField"],
  computed: {
    value: {
      get() {
        return this.currentField.inputText;
      },
      set(value) {
        this.$emit("updateCurrentField", {
          ...this.currentField,
          inputText: value,
        });
      },
    },
  },
};
</script>

<style scoped>
.v-rating {
  padding-top: 12px;
}
</style>
