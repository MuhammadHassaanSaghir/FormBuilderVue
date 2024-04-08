<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-text-field
      v-model.number="number"
      type="number"
      :disabled="currentField.disabled"
      :placeholder="currentField.placeholder"
      :min="currentField.hasMinValue ? currentField.min : undefined"
      :max="currentField.hasMaxValue ? currentField.max : undefined"
      outlined
      dense
      dark
      hide-details
      class="rounded mt-1"
      @input="handleInput"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "NumberInput",
  props: ["currentField"],
  computed: {
    number: {
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
  methods: {
    handleInput(value) {
      if (this.currentField) {
        if (
          this.currentField.hasMinValue &&
          value &&
          value < this.currentField.min
        ) {
          value = this.currentField.min;
        } else if (
          this.currentField.hasMaxValue &&
          value &&
          value > this.currentField.max
        ) {
          value = this.currentField.max;
        }
      }
      this.$nextTick(() => {
        this.number = value;
      });
    },
  },
};
</script>
