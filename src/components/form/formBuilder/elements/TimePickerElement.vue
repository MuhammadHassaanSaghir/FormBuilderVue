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
          v-model="time"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-on="on"
          dark
          dense
          outlined
          hide-details
        ></v-text-field>
      </template>
      <v-time-picker
        v-model="time"
        full-width
        ampm-in-title
        format="ampm"
        scrollable
        color="secondary"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "TimeSelectComp",
  props: ["currentField"],
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    time: {
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
