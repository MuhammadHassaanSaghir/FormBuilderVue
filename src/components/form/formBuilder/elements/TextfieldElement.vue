<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-text-field
      v-model="input"
      :maxlength="currentField.maxlength"
      :counter="currentField.showWordLimit"
      :clearable="currentField.clearable"
      :disabled="currentField.disabled"
      :type="!currentField.showPassword || showPassword ? 'text' : 'password'"
      :placeholder="
        currentField.isPlaceholderVisible ? currentField.placeholder : undefined
      "
      :hide-details="!currentField.showWordLimit"
      class="rounded mt-1"
      outlined
      dense
      dark
    >
      <template v-if="currentField.showPassword" v-slot:append>
        <v-icon @click="togglePassword">{{
          showPassword ? "mdi-eye" : "mdi-eye-off"
        }}</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["currentField"],
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    input: {
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
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
