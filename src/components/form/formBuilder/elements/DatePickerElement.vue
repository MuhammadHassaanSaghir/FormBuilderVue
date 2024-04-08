<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          prepend-icon="mdi-calendar"
          readonly
          dark
          dense
          outlined
          hide-details
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["currentField"],
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    date: {
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
