<template>
  <div>
    <label class="offWhite--text">{{ currentField.label }}</label>
    <v-file-input
      v-model="fileList"
      dark
      dense
      hide-details
      outlined
      :multiple="currentField.multiple"
      :disabled="currentField.disabled"
      @change="handleChange"
    >
    </v-file-input>
  </div>
</template>

<script>
export default {
  name: "UploadComp",
  props: ["currentField"],
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleChange(files) {
      // You can perform any necessary logic with the selected files here
      console.log("Selected files:", files);
    },
  },
};
</script>
