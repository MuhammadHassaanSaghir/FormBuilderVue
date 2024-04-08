<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-select
      v-if="update"
      v-model="value"
      item-text="optionLabel"
      item-value="optionValue"
      v-bind="attributesBinding"
      :menu-props="{ offsetY: true }"
      hide-details
      class="rounded mt-1"
      outlined
      dense
      dark
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "SelectList",
  props: ["currentField"],
  data() {
    return {
      update: true,
    };
  },
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
    attributesBinding() {
      var attr = {};
      attr.disabled = this.currentField.disabled;
      attr.clearable = this.currentField.clearable;
      attr.multiple = this.currentField.multiple;
      attr.items = this.currentField.options;
      attr.placeholder = this.currentField.placeholder;
      return attr;
    },
  },
  methods: {
    reload() {
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    },
  },
  watch: {
    "currentField.multiple"() {
      this.reload();
    },
  },
};
</script>
