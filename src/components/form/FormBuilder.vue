<template>
  <v-app class="secondary">
    <v-app-bar app dense color="primary" elevation="0" clipped-right>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-btn
            color="secondary"
            small
            class="text-capitalize mr-2"
            @click="backToFormList"
          >
            <v-icon color="offWhite" small class="mr-2">
              mdi-arrow-left
            </v-icon>
            Back
          </v-btn>
          <h4 class="light--text text-size-12 mr-2">Form:</h4>
          <CustomTooltip
            :fullText="getFormBuilderDetail?.form_name"
            :truncationLine="1"
            class="offWhite--text text-size-14 font-family-dm-sans-500"
          />
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        small
        class="text-capitalize ml-5 mr-2"
        width="100px"
        @click="showFormPreview = !showFormPreview"
      >
        <v-icon small left>{{
          !showFormPreview ? "mdi-eye-outline" : "mdi-file-edit-outline"
        }}</v-icon>
        {{ !showFormPreview ? "Preview" : "Edit" }}
      </v-btn>
      <v-btn
        color="secondary"
        small
        class="text-capitalize"
        width="90px"
        @click="saveForm"
      >
        <v-icon small left>{{
          !formSaved ? "mdi-bookmark-outline" : "mdi-bookmark-check"
        }}</v-icon>
        {{ !formSaved ? "Save" : "Saved" }}
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="!showFormPreview"
      app
      right
      color="primary"
      absolute
      permanent
      dark
      clipped
      width="270px"
    >
      <div class="pa-3">
        <div v-if="getVuexActiveTabForFields == 'elements'">
          <elements />
        </div>
        <div v-if="getVuexActiveTabForFields == 'properties'">
          <properties
            v-show="Object.keys(getVuexActiveField).length > 0"
          ></properties>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="secondary d-flex align-center justify-center">
        <div v-if="!showFormPreview" class="form-area primary px-3 py-5">
          <div v-if="!getVuexForms.length" class="relative">
            <h3 class="offWhite--text font-family-dm-sans-600 empty-section">
              Drop Here
            </h3>
          </div>
          <draggable
            :list="getVuexForms"
            class="drag-area"
            :group="{ name: 'formbuilder', pull: false, put: true }"
            :sort="true"
            ghost-class="sortable__ghost"
          >
            <template v-for="(eachFormObj, eachFormIndex) in getVuexForms">
              <div
                :key="eachFormIndex"
                class="form__group offWhite--text"
                :class="{
                  'is--active': eachFormObj === getVuexActiveField,
                }"
              >
                <span class="form__selectedlabel">
                  {{ eachFormObj.text }} Element
                </span>

                <div @click="editElementProperties(eachFormObj)">
                  <component
                    :is="eachFormObj.fieldType"
                    :currentField="eachFormObj"
                    class="form__field"
                    @updateCurrentField="updateCurrentField"
                  ></component>
                </div>

                <div class="form__actiongroup">
                  <v-btn icon small class="form__actionitem--move">
                    <v-icon color="offWhite" small>mdi-cursor-move</v-icon>
                  </v-btn>

                  <div class="form__actionlist">
                    <v-btn
                      v-if="!eachFormObj.isUnique"
                      icon
                      small
                      color="offWhite"
                      @click="
                        cloneElement(eachFormIndex, eachFormObj, getVuexForms)
                      "
                    >
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      color="red"
                      @click="deleteElement(eachFormIndex)"
                    >
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <FormPreview v-else :getFormPreviewDetail="getVuexForms" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { FormBuilder } from "@/components/form/formbuilder";
import CustomTooltip from "@/components/utilities/components/CustomTooltip.vue";

export default {
  name: "FormBuilder",
  data() {
    return {
      sortElementOptions: FormBuilder.$data.sortElementOptions,
      previousVuexFormsState: [],
      showFormPreview: false,
      formSaved: false,
    };
  },
  mounted() {
    if (!this.getFormBuilderDetail) {
      this.$router.push("/form-lists");
    } else {
      this.$store.commit("setVuexForms", [
        ...(this.getFormBuilderDetail?.form_build ?? []),
      ]);
      this.previousVuexFormsState = [
        ...(this.getFormBuilderDetail?.form_build ?? []),
      ];
    }

    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  components: {
    ...FormBuilder.$options.components,
    CustomTooltip,
    FormPreview: () => import("@/components/form/FormPreview.vue"),
  },
  computed: {
    ...mapGetters([
      "getFormLists",
      "getVuexForms",
      "getVuexActiveField",
      "getVuexActiveTabForFields",
    ]),
    /**
     * Retrieves details of a form builder based on the provided form ID.
     * @returns {Object|null} - The details of the form builder, or null if not found.
     */
    getFormBuilderDetail() {
      return this.getFormLists.find(
        (item) => item._id == this.$route.params.formId
      );
    },
  },
  methods: {
    /**
     * Handles the beforeunload event to prompt the user if there are unsaved changes.
     * @param {Event} e - The beforeunload event object.
     */
    handleBeforeUnload(e) {
      if (this.hasChanges()) {
        e.preventDefault();
        e.returnValue = "";
        return;
      }
    },
    /**
     * Checks whether there are changes between the previous and current Vuex form states.
     * @returns {boolean} - True if there are changes, false otherwise.
     */
    hasChanges() {
      return (
        JSON.stringify(this.previousVuexFormsState) !==
        JSON.stringify(this.getVuexForms)
      );
    },
    /**
     * Deletes an element from the form builder at the specified index.
     * @param {number} index - The index of the element to delete.
     */
    deleteElement(index) {
      FormBuilder.deleteElement(index);
    },
    /**
     * Clones an element in the form builder.
     * @param {number} index - The index of the element to clone.
     * @param {Object} field - The field object representing the element to clone.
     * @param {Object} form - The form object containing the element to clone.
     */
    cloneElement(index, field, form) {
      FormBuilder.cloneElement(index, field, form);
    },
    /**
     * Opens a dialog to edit the properties of a form builder element.
     * @param {Object} field - The field object representing the element to edit.
     */
    editElementProperties(field) {
      FormBuilder.editElementProperties(field);
    },
    /**
     * Updates the properties of the currently active field in the Vuex store.
     * @param {Object} data - The updated field data.
     */
    updateCurrentField(data) {
      let findedFieldIndex = this.getVuexForms.findIndex(
        (item) => item.randomUid == data.randomUid
      );
      if (findedFieldIndex >= 0) {
        this.$nextTick(() => {
          this.getVuexForms[findedFieldIndex] = data;
          this.$store.commit("setVuexActiveField", data);
        });
      }
    },
    /**
     * Navigates back to the form lists page, prompting the user if there are unsaved changes.
     */
    backToFormList() {
      if (this.hasChanges()) {
        var confirmationMessage =
          "Changes you made may not be saved. Are you sure you want to leave this page?";
        if (confirm(confirmationMessage)) {
          this.$router.push("/form-lists");
        }
      } else {
        this.$router.push("/form-lists");
      }
    },
    /**
     * Saves the form by updating the form lists and setting a timeout to reset the saved state.
     */
    saveForm() {
      if (this.formSaved) return;
      let formSavedTimeout = null;
      this.formSaved = true;

      this.$store.commit("UPDATE_FORM_LISTS", {
        form_build: [...this.getVuexForms],
        _id: this.$route.params.formId,
      });

      this.previousVuexFormsState = [...this.getVuexForms];
      clearTimeout(formSavedTimeout);
      formSavedTimeout = setTimeout(() => {
        this.formSaved = false;
      }, 3000);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasChanges()) {
      var confirmationMessage =
        "Changes you made may not be saved. Are you sure you want to leave this page?";
      if (confirm(confirmationMessage)) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    this.$store.commit("setVuexForms", []);
    this.$store.commit("setVuexActiveField", {});
    this.$store.commit("setVuexActiveTabForFields", "elements");
  },
};
</script>
<style scoped>
.form-area {
  width: 50% !important;
  height: calc(100vh - 72px) !important;
  overflow-y: auto !important;
  border-radius: 4px !important;
}
.drag-area {
  width: 100% !important;
  height: calc(100vh - 130px) !important;
}
.empty-section {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
</style>

<style lang="scss">
.form__selectedlabel {
  display: none;
  background: var(--secondary);
  padding: 3px 5px;
  color: var(--off-white);
  font-size: 12px;
  position: absolute;
  top: -17px;
  left: 10px;
  border-radius: 4px;
}

.form__actionitem--move {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  background: var(--secondary);
}

.form__actionlist {
  position: absolute;
  margin-top: 10px;
  padding: 2px;
  visibility: hidden;
  z-index: 3;
  right: 0;
  border-radius: 4px;
  background-color: var(--secondary);
}

.form__group {
  margin: 16px 4px;
  padding: 8px;
  border: 2px solid transparent;
  position: relative;
  border-radius: 4px;

  &:hover {
    border-color: var(--info);
  }

  &.is--active {
    background: var(--info);

    .form__actionlist {
      visibility: visible;
    }
    .form__selectedlabel {
      display: inline-block;
    }
    .form__actionitem--move {
      visibility: visible;
    }
  }
}
</style>
@/components/form/formBuilder/formbuilder
