<template>
  <div>
    <div class="d-flex align-center justify-space-between my-2">
      <h5 class="success--text font-family-dm-sans-300 text-size-14">
        Elements Properties
      </h5>
      <v-btn small icon color="offWhite" @click="closeElementProperties">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-form class="mt-2">
      <!-- Field Label -->
      <div v-if="getVuexActiveField.hasOwnProperty('label')" class="mb-4">
        <label class="offWhite--text">Field Label</label>
        <v-text-field
          v-model="getVuexActiveField.label"
          outlined
          dark
          dense
          hide-details
        ></v-text-field>
      </div>

      <!-- Placeholder -->
      <div
        v-if="getVuexActiveField.hasOwnProperty('isPlaceholderVisible')"
        class="mb-4"
      >
        <div class="d-flex align-center justify-space-between mb-2">
          <label class="offWhite--text">Placeholder</label>
          <v-switch
            v-model="getVuexActiveField.isPlaceholderVisible"
            inset
            dense
            hide-details
            class="ma-0 mr-n4"
            :ripple="false"
            color="offWhite"
          ></v-switch>
        </div>
        <v-text-field
          v-if="getVuexActiveField.isPlaceholderVisible"
          v-model="getVuexActiveField.placeholder"
          outlined
          dark
          dense
          hide-details
          class="rounded"
        ></v-text-field>
      </div>

      <!-- isRequired -->
      <div
        v-if="getVuexActiveField.hasOwnProperty('isRequired')"
        class="d-flex align-center justify-space-between mb-4"
      >
        <label class="offWhite--text">Required field?</label>
        <v-switch
          v-model="getVuexActiveField.isRequired"
          inset
          dense
          hide-details
          class="ma-0 mr-n4"
          :ripple="false"
          color="offWhite"
        ></v-switch>
      </div>

      <!-- Button -->
      <div v-if="getVuexActiveField.hasOwnProperty('buttonText')" class="mb-4">
        <label class="offWhite--text">Button text</label>
        <v-text-field
          v-model="getVuexActiveField.buttonText"
          outlined
          dark
          dense
          hide-details
          class="rounded"
        ></v-text-field>
      </div>

      <!-- Switch Active/Inactive Text Field -->
      <div v-if="getVuexActiveField.fieldType == 'ElSwitch'" class="mb-4">
        <div>
          <label class="offWhite--text">Active Text</label>
          <v-text-field
            v-model="getVuexActiveField.activeText"
            outlined
            dark
            dense
            hide-details
            class="rounded"
          ></v-text-field>
        </div>
        <div class="my-4">
          <label class="offWhite--text">Inactive Text</label>
          <v-text-field
            v-model="getVuexActiveField.inActiveText"
            outlined
            dark
            dense
            hide-details
            class="rounded"
          ></v-text-field>
        </div>
      </div>

      <!-- Options for Select/Radio/Checkbox -->
      <div v-if="getVuexActiveField.options" class="mb-4">
        <div class="d-flex align-center justify-space-between">
          <label class="offWhite--text">Set Options</label>
          <v-btn
            text
            plain
            x-small
            class="text-capitalize pa-0"
            @click="
              addOption(
                getVuexActiveField.options,
                getVuexActiveField.fieldType
              )
            "
          >
            <v-icon x-small>mdi-plus</v-icon>
            Add more
          </v-btn>
        </div>
        <div class="options-height" ref="optionsArea">
          <div
            v-for="(item, index) in getVuexActiveField.options"
            :key="index"
            class="d-flex align-center my-2"
          >
            <div>
              <v-text-field
                v-model="item.optionLabel"
                outlined
                dark
                dense
                hide-details
                class="rounded"
              ></v-text-field>
            </div>
            <div class="mx-2">
              <v-text-field
                v-model="item.optionValue"
                outlined
                dark
                dense
                hide-details
                class="rounded"
              ></v-text-field>
            </div>
            <div>
              <v-btn
                @click="deleteOption(getVuexActiveField.options, index)"
                v-if="getVuexActiveField.options.length > 1"
                icon
                small
                color="red"
              >
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- HTML Element Field -->
      <div v-if="getVuexActiveField.fieldType == 'HtmlComponent'" class="mb-4">
        <label class="offWhite--text">HTML Content</label>
        <v-textarea
          v-model="getVuexActiveField.htmlContent"
          multi-line
          :rows="10"
          outlined
          dark
          dense
          hide-details
          class="rounded"
        ></v-textarea>
      </div>

      <!-- Advance Properties Expansion -->
      <div
        v-if="getVuexActiveField.hasOwnProperty('advancedOptions')"
        class="offWhite--text pointer d-flex align-center"
        @click="advancedPropsVisible = !advancedPropsVisible"
      >
        <v-icon>
          {{ advancedPropsVisible ? "mdi-chevron-down" : "mdi-chevron-right" }}
        </v-icon>
        <span> Advanced Options </span>
      </div>
      <v-expand-transition>
        <div v-if="advancedPropsVisible">
          <v-divider class="my-2" color="white"></v-divider>
          <TextInputAdvancedProps
            v-if="getVuexActiveField.fieldType === 'TextInput'"
          />
          <LongTextInputAdvancedProps
            v-else-if="getVuexActiveField.fieldType === 'LongTextInput'"
          />
          <NumberInputAdvancedProps
            v-else-if="getVuexActiveField.fieldType === 'NumberInput'"
          />
          <SelectListAdvancedProps
            v-else-if="getVuexActiveField.fieldType === 'SelectList'"
          />
          <RatingAdvancedProps
            v-if="getVuexActiveField.fieldType === 'Rating'"
          />
          <UploadFileAdvancedProps
            v-if="getVuexActiveField.fieldType === 'Upload'"
          />
        </div>
      </v-expand-transition>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TextInputAdvancedProps from "@/components/form/formBuilder/properties/TextInputAdvancedProps.vue";
import LongTextInputAdvancedProps from "@/components/form/formBuilder/properties/LongTextInputAdvancedProps.vue";
import NumberInputAdvancedProps from "@/components/form/formBuilder/properties/NumberInputAdvancedProps.vue";
import SelectListAdvancedProps from "@/components/form/formBuilder/properties/SelectListAdvancedProps.vue";
import RatingAdvancedProps from "@/components/form/formBuilder/properties/RatingAdvancedProps";
import UploadFileAdvancedProps from "@/components/form/formBuilder/properties/UploadFileAdvancedProps.vue";

export default {
  name: "PropertiesComp",
  data() {
    return {
      advancedPropsVisible: false,
    };
  },
  components: {
    TextInputAdvancedProps,
    LongTextInputAdvancedProps,
    NumberInputAdvancedProps,
    SelectListAdvancedProps,
    RatingAdvancedProps,
    UploadFileAdvancedProps,
  },
  computed: {
    ...mapGetters([
      "getVuexForms",
      "getVuexActiveField",
      "getVuexActiveTabForFields",
    ]),
  },
  methods: {
    /**
     * Closes the element properties dialog by resetting the active tab for fields and clearing the active field in the Vuex store.
     */
    closeElementProperties() {
      this.$store.commit("setVuexActiveTabForFields", "elements");
      this.$store.commit("setVuexActiveField", []);
    },
    /**
     * Deletes an option from an array at the specified index.
     * @param {Array} option - The array from which to delete the option.
     * @param {number} index - The index of the option to delete.
     */
    deleteOption(option, index) {
      this.$delete(option, index);
    },
    /**
     * Adds an option to the specified array, with optional configuration for specific field types.
     * @param {Array} option - The array to which the option will be added.
     * @param {string} [fieldType=null] - The type of field for which the option is being added. Defaults to null.
     */
    addOption(option, fieldType = null) {
      let count = option.length + 1;
      let optionItem = {
        optionLabel: "Option Label " + count,
        optionValue: "Option Value" + count,
      };
      if (fieldType == "Checkbox") {
        optionItem = { ...optionItem, selected: null };
      }
      option.push(optionItem);

      let optionsArea = this.$refs.optionsArea;
      setTimeout(() => {
        optionsArea.scrollTo({
          top: optionsArea.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    },
  },
};
</script>
<style scoped>
.options-height {
  max-height: 200px !important;
  overflow-y: auto !important;
}
</style>
