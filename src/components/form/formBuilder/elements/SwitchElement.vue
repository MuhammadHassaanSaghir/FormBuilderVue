<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-switch
      v-model="value"
      :true-value="true"
      :false-value="false"
      color="offWhite"
      dense
      hide-details
      inset
      class="ma-0"
      :ripple="false"
      dark
    >
      <template v-slot:label>
        <span class="offWhite--text">
          {{ value ? currentField.activeText : currentField.inActiveText }}
        </span>
      </template>
    </v-switch>
  </div>
</template>

<script>
export default {
  name: "VSwitchComp",
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
