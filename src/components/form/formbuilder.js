import Vue from "vue";
import _ from "lodash";
import draggable from "vuedraggable";

import TextInput from "@/components/form/formBuilder/elements/TextfieldElement";
import LongTextInput from "@/components/form/formBuilder/elements/TextareaElement";
import NumberInput from "@/components/form/formBuilder/elements/NumberElement";
import SelectList from "@/components/form/formBuilder/elements/SelectListElement";
import RadioButton from "@/components/form/formBuilder/elements/RadioButtonElement";
import Checkbox from "@/components/form/formBuilder/elements/CheckboxElement";
import TimePicker from "@/components/form/formBuilder/elements/TimePickerElement";
import DatePicker from "@/components/form/formBuilder/elements/DatePickerElement";
import Rating from "@/components/form/formBuilder/elements/RatingElement";
import ElSwitch from "@/components/form/formBuilder/elements/SwitchElement";
import Upload from "@/components/form/formBuilder/elements/UploadElement";
import HtmlComponent from "@/components/form/formBuilder/elements/HtmlElement";
import Button from "@/components/form/formBuilder/elements/ButtonElement";

import Elements from "@/components/form/formBuilder/Elements";
import Properties from "@/components/form/formBuilder/Properties";
import store from "@/store/index";

export const FormBuilder = new Vue({
  components: {
    Elements,
    Properties,
    draggable,

    TextInput,
    LongTextInput,
    NumberInput,
    SelectList,
    RadioButton,
    Checkbox,
    TimePicker,
    DatePicker,
    Rating,
    ElSwitch,
    Upload,
    HtmlComponent,
    Button,
  },
  data() {
    return {
      fields: [
        {
          fieldType: "TextInput",
          label: "Text",
          text: "Text",
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: true,
          placeholder: "Enter placeholder text here",
          isUnique: false,
          advancedOptions: true,
          showPassword: false,
          disabled: false,
          clearable: false,
          maxlength: 10,
          showWordLimit: false,
          inputText: "",
          elementIcon: "mdi-form-textbox",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "LongTextInput",
          label: "Long Text",
          text: "Long Text",
          placeholder: "Enter placeholder text here",
          isRequired: false,
          isHelpBlockVisible: false,
          advancedOptions: true,
          isPlaceholderVisible: true,
          isUnique: false,
          disabled: false,
          clearable: false,
          elementIcon: "mdi-form-textarea",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "NumberInput",
          label: "Number",
          text: "Number",
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          disabled: false,
          hasMinValue: false,
          min: 1,
          hasMaxValue: false,
          max: 10,
          placeholder: "Enter placeholder text here",
          isUnique: false,
          advancedOptions: true,
          elementIcon: "mdi-numeric",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "SelectList",
          label: "Select",
          text: "Select",
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          placeholder: "Enter placeholder text here",
          isUnique: false,
          options: [
            {
              optionLabel: "Option Label 1",
              optionValue: "Option Value 1",
            },
            {
              optionLabel: "Option Label 2",
              optionValue: "Option Value 2",
            },
          ],
          advancedOptions: true,
          labelField: "label",
          valueField: "value",
          disabled: false,
          clearable: false,
          multiple: false,
          elementIcon: "mdi-form-dropdown",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "RadioButton",
          label: "Radio",
          text: "Radio",
          isRequired: false,
          isHelpBlockVisible: false,
          isUnique: false,
          options: [
            {
              optionLabel: "Option Label 1",
              optionValue: "Option 1",
            },
            {
              optionLabel: "Option Label 2",
              optionValue: "Option 2",
            },
          ],
          labelField: "label",
          valueField: "value",
          elementIcon: "mdi-radiobox-marked",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "Checkbox",
          label: "Checkbox",
          text: "Checkbox",
          isRequired: false,
          isHelpBlockVisible: false,
          isUnique: false,
          options: [
            {
              optionLabel: "Option Label 1",
              optionValue: "Option 1",
              selected: null,
            },
            {
              optionLabel: "Option Label 2",
              optionValue: "Option 2",
              selected: null,
            },
          ],
          labelField: "label",
          valueField: "value",
          elementIcon: "mdi-checkbox-outline",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "TimePicker",
          label: "Time",
          text: "Time",
          isRequired: false,
          isHelpBlockVisible: false,
          isUnique: false,
          elementIcon: "mdi-clock-time-eight-outline",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "DatePicker",
          label: "Date",
          text: "Date",
          isRequired: false,
          isHelpBlockVisible: false,
          isUnique: false,
          elementIcon: "mdi-calendar-month-outline",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "Rating",
          label: "Rating",
          text: "Rating",
          isRequired: false,
          isHelpBlockVisible: false,
          isUnique: false,
          advancedOptions: true,
          showText: true,
          disabled: false,
          showScore: false,
          scoreUnit: "points",
          elementIcon: "mdi-star-outline",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "ElSwitch",
          label: "Switch",
          text: "Switch",
          isUnique: false,
          activeText: "",
          inActiveText: "",
          elementIcon: "mdi-toggle-switch-off-outline",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "Upload",
          text: "Upload Files",
          label: "Upload Files",
          isUnique: false,
          disabled: false,
          multiple: false,
          advancedOptions: true,
          elementIcon: "mdi-paperclip",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "HtmlComponent",
          text: "Html",
          isUnique: false,
          htmlContent: "<h3>Hello World</h3>",
          elementIcon: "mdi-code-block-tags",
          randomUid: this.generateRandomString(10),
        },
        {
          fieldType: "Button",
          text: "Button",
          buttonText: "Submit your form",
          isUnique: true,
          elementIcon: "mdi-button-cursor",
          randomUid: this.generateRandomString(10),
        },
      ],

      sortElementOptions: {
        group: {
          name: "formbuilder",
          pull: false,
          put: true,
        },
        sort: true,
      },

      dropElementOptions: {
        group: {
          name: "formbuilder",
          pull: "clone",
          put: false,
        },
        sort: false,
        filter: ".is-disabled",
      },
    };
  },
  methods: {
    /**
     * Deletes an element from the Vuex state array and updates the state.
     * @param {number} index - The index of the element to delete.
     * @returns {void}
     */
    deleteElement(index) {
      store.getters.getVuexForms.splice(index, 1);
      store.commit("setVuexForms", store.getters.getVuexForms);
      store.commit("setVuexActiveTabForFields", "elements");
    },
    /**
     * Clones a field object and inserts it into the specified form array at the given index.
     * @param {number} index - The index where the cloned field will be inserted.
     * @param {Object} field - The field object to clone.
     * @param {Array} form - The array representing the form where the cloned field will be inserted.
     * @returns {void}
     */
    cloneElement(index, field, form) {
      var cloned = _.cloneDeep(field); // clone deep lodash
      cloned.randomUid = this.generateRandomString(10);
      form.splice(index, 0, cloned);
    },
    /**
     * Sets the active field in Vuex state and switches the active tab to "properties".
     * @param {Object} field - The field object to set as the active field.
     * @returns {void}
     */
    editElementProperties(field) {
      store.commit("setVuexActiveField", field);
      store.commit("setVuexActiveTabForFields", "properties");
    },
  },
});
