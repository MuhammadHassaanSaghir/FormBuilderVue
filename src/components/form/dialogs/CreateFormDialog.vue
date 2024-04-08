<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    overlay-color="rgba(0, 0, 0, 0.7)"
  >
    <v-form
      ref="createForm"
      v-model="validForm"
      lazy-validation
      @submit.prevent="createForm"
      @keyup.native.enter="createForm"
    >
      <v-card color="primary">
        <v-card-title>
          <div class="d-flex justify-space-between width-100">
            <div>
              <v-card-title
                class="px-0 pt-0 font-family-dm-sans-500 offWhite--text"
              >
                Create Form
              </v-card-title>
              <v-card-subtitle
                class="px-0 pb-0 font-family-dm-sans-300 offWhite--text"
              >
                Create a new form to start collecting response
              </v-card-subtitle>
            </div>
            <div>
              <v-btn icon small color="offWhite" @click="hideDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-text class="px-4">
          <div>
            <label for="form-name" class="offWhite--text"> Name </label>
            <v-text-field
              v-model="formName"
              placeholder="Name"
              outlined
              dense
              dark
              class="rounded-lg mt-1"
              color="offWhite"
              :rules="requiredRule"
              id="form-name"
              autofocus
            ></v-text-field>
            <label for="form-description" class="offWhite--text">
              Description
            </label>
            <v-textarea
              v-model="formDescription"
              placeholder="Description"
              outlined
              dense
              class="rounded-lg mt-1"
              color="offWhite"
              rows="3"
              hide-details
              dark
              id="form-description"
            ></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-btn
            block
            color="offWhite"
            class="text-capitalize"
            :disabled="!validForm"
            dark
            @click="createForm"
          >
            <span class="primary--text font-family-dm-sans-500"> Save </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { requiredRule } from "@/constants/validations.js";

export default {
  name: "CreateFormDialog",
  data() {
    return {
      dialog: true,
      requiredRule,

      formName: "",
      formDescription: "",
      validForm: true,
    };
  },
  watch: {
    dialog() {
      this.hideDialog();
    },
  },
  methods: {
    /**
     * Emits an event to hide the dialog.
     */
    hideDialog() {
      this.$emit("hideDialog");
    },
    /**
     * Creates a new form if form validation succeeds, and navigates to the form builder page.
     */
    createForm() {
      if (this.$refs.createForm.validate()) {
        let payload = {
          _id: this.generateRandomString(6),
          form_name: this.formName,
          form_description: this.formDescription,
          created_at: new Date(),
        };
        this.$store.commit("CREATE_FORM", payload);
        this.$router.push(`/form-builder/${payload._id}`);
        this.hideDialog();
      }
    },
  },
};
</script>
