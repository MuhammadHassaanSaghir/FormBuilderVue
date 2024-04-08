<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-radio-group v-model="radio">
      <v-radio
        v-for="item in currentField.options"
        :key="item.optionValue"
        :label="item.optionLabel"
        :value="item.optionValue"
        :disabled="item.disabled"
        hide-details
        dense
        dark
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: ["currentField"],
  computed: {
    radio: {
      get() {
        return (
          this.currentField.inputText ||
          this.currentField.options[0].optionValue
        );
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
