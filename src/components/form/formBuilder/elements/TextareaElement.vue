<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-textarea
      v-model="textarea"
      :rows="2"
      :placeholder="
        currentField.isPlaceholderVisible ? currentField.placeholder : ''
      "
      :clearable="currentField.clearable"
      :disabled="currentField.disabled"
      class="rounded mt-1"
      outlined
      dense
      dark
      hide-details
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: "LongTextInput",
  props: ["currentField"],
  computed: {
    textarea: {
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
