<template>
  <v-app>
    <v-main>
      <div class="secondary form-list-area pa-10">
        <v-container>
          <h1 class="font-family-dm-sans-800 mb-8 offWhite--text">
            Your Forms
          </h1>
          <div>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-card
                  flat
                  class="add-form-card remove-card-focus-effect fill-height pa-6"
                  color="primary"
                  :ripple="false"
                  @click="isShowCreateFormDialog = true"
                >
                  <v-card-text
                    class="d-flex align-center justify-center flex-column height-100"
                  >
                    <v-icon color="offWhite" large>
                      mdi-file-plus-outline
                    </v-icon>
                    <h3
                      class="mt-5 text-size-18 font-family-dm-sans-700 offWhite--text"
                    >
                      Create new Form
                    </h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="(formData, formDataIndex) in getFormLists"
                :key="formDataIndex"
              >
                <v-card
                  flat
                  class="d-flex flex-column add-form-card fill-height pa-5"
                  color="primary"
                  :ripple="false"
                >
                  <v-card-title class="px-0 pt-0">
                    <div
                      class="d-flex align-center justify-space-between width-100"
                    >
                      <div>
                        <CustomTooltip
                          :fullText="formData.form_name"
                          :truncationLine="1"
                          class="font-family-dm-sans-600 offWhite--text"
                        />
                      </div>
                      <div>
                        <v-btn
                          icon
                          small
                          dark
                          class="ml-2"
                          color="red"
                          @click="deleteForm(formData)"
                        >
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-subtitle class="px-0">
                    <v-tooltip
                      bottom
                      max-width="500px"
                      content-class="white tooltip-bottom"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-time-ago
                          v-bind="attrs"
                          v-on="on"
                          :datetime="formData.created_at"
                          refresh
                          long
                          class="font-family-dm-sans-300 offWhite--text text-cursor"
                        />
                      </template>
                      <span
                        class="tooltip-text primary--text font-family-dm-sans-500"
                      >
                        {{ formattedInDateTime(formData.created_at) }}
                      </span>
                    </v-tooltip>
                  </v-card-subtitle>
                  <v-card-text class="px-0">
                    <CustomTooltip
                      :fullText="formData.form_description"
                      :truncationLine="2"
                      class="offWhite--text"
                    />
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions class="pa-0">
                    <v-btn
                      block
                      color="offWhite"
                      class="text-capitalize"
                      @click="$router.push(`/form-builder/${formData._id}`)"
                    >
                      <span class="primary--text font-family-dm-sans-500">
                        View Submission
                      </span>
                      <v-icon color="primary" small class="ml-3">
                        mdi-arrow-right
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
        <CreateFormDialog
          v-if="isShowCreateFormDialog"
          @hideDialog="isShowCreateFormDialog = false"
        />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import CustomTooltip from "@/components/utilities/components/CustomTooltip.vue";
export default {
  name: "FormLists",
  data() {
    return {
      isShowCreateFormDialog: false,
    };
  },
  components: {
    CustomTooltip,
    CreateFormDialog: () =>
      import("@/components/form/dialogs/CreateFormDialog.vue"),
  },
  computed: {
    ...mapGetters(["getFormLists"]),
  },
  methods: {
    /**
     * Deletes a form based on its ID from the Vuex store.
     * @param {Object} formData - The form data object containing the ID of the form to delete.
     */
    deleteForm(formData) {
      this.$store.commit("DELETE_FORM", formData._id);
    },
  },
};
</script>
<style scoped>
.form-list-area {
  height: 100% !important;
}
.add-form-card {
  border-radius: 8px !important;
  border: 1px solid var(--off-white) !important;
}
.add-form-card:hover {
  box-shadow: 0 5px 16px 0 rgba(207, 210, 215, 0.3) !important;
}
</style>
