<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-checkbox
      v-for="item in currentField.options"
      :key="item.optionValue"
      :label="item.optionLabel"
      :value="item.optionValue"
      :disabled="item.disabled"
      v-model="item.selected"
      dense
      dark
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: "CheckboxComp",
  props: ["currentField"],
};
</script>

<style scoped>
.v-checkbox-group {
  font-size: 14px;
}
</style>
