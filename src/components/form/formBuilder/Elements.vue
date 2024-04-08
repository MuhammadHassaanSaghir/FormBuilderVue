<template>
  <div>
    <div>
      <h5 class="success--text font-family-dm-sans-300 text-size-14 my-2">
        Form Elements
      </h5>
      <draggable
        :list="fields"
        :clone="clone"
        class="dragArea"
        :group="{ name: 'formbuilder', pull: 'clone', put: false }"
        :sort="false"
        filter=".is-disabled"
      >
        <div
          v-for="(field, index) in fields"
          :key="index"
          class="d-inline-block"
          :class="[
            isOdd(index + 1) ? 'mr-6 mb-4' : '',
            checkStopDragCondition(field) ? 'is-disabled' : '',
          ]"
        >
          <v-btn
            class="secondary elements-box"
            :disabled="checkStopDragCondition(field)"
          >
            <div class="d-flex flex-column">
              <div>
                <v-icon color="offWhite">{{ field.elementIcon }}</v-icon>
              </div>
              <h4
                class="text-size-12 mt-2 font-family-dm-sans-200 element-name"
              >
                {{ field.text }}
              </h4>
            </div>
          </v-btn>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FormBuilder } from "@/components/form/formbuilder";
import _ from "lodash";
import draggable from "vuedraggable";

export default {
  name: "ElementsComp",
  data() {
    return {
      fields: FormBuilder.$data.fields,
    };
  },
  components: {
    draggable,
  },
  computed: {
    ...mapGetters(["getVuexForms"]),
  },
  methods: {
    /**
     * Checks if a number is odd.
     * @param {number} number - The number to check.
     * @returns {boolean} - True if the number is odd, false otherwise.
     */
    isOdd(number) {
      return number % 2 !== 0;
    },
    /**
     * Creates a deep clone of the given field object with a new random UID.
     * @param {Object} field - The field object to clone.
     * @returns {Object} - A deep clone of the field object with a new random UID.
     */
    clone(field) {
      field.randomUid = FormBuilder.generateRandomString(10);
      return _.cloneDeep(field);
    },
    /**
     * Checks if there are any fields in the Vuex store that match the specified field type and have the isUnique property set to true.
     * @param {Object} field - The field object to compare with.
     * @returns {boolean} - True if there are matching fields with isUnique set to true, false otherwise.
     */
    checkStopDragCondition(field) {
      return this.getVuexForms.some(
        (formField) =>
          formField.fieldType === field.fieldType && formField.isUnique
      );
    },
  },
};
</script>

<style scoped>
.elements-box {
  width: 110px !important;
  height: 90px !important;
  border: 1px solid var(--off-white) !important;
  cursor: grab !important;
}
.element-name {
  letter-spacing: 1.2px !important;
}
.is-disabled {
  opacity: 0.4;
}
</style>
<style lang="scss" scoped>
.sortable__ghost {
  position: relative;
  width: 100%;
  border-bottom: 2px solid var(--info);
  margin-top: 12px;
  margin-bottom: 12px;

  [type="button"] {
    display: none;
  }

  &:before {
    content: "Drop here";
    background-color: var(--info);
    color: var(--off-white);
    position: absolute;
    left: 50%;
    font-size: 12px;
    border-radius: 10px;
    padding: 0 12px;
    top: -8px;
    transform: translateX(-50%);
  }
}
</style>
