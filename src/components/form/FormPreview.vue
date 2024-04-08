<template>
  <div class="form-area primary">
    <div v-if="getFormPreviewDetail.length">
      <template v-for="(eachFormObj, eachFormIndex) in getFormPreviewDetail">
        <div :key="`div-${eachFormIndex}`" class="height-100 px-3 py-5">
          <component
            :is="eachFormObj.fieldType"
            :currentField="eachFormObj"
            class="form__field"
          ></component>
        </div>
      </template>
    </div>
    <h3
      v-else
      class="offWhite--text font-family-dm-sans-600 d-flex align-center justify-center height-100"
    >
      Nothing to Preview
    </h3>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form/formbuilder";
export default {
  name: "FormBuilder",
  props: ["getFormPreviewDetail"],
  data() {
    return {
      sortElementOptions: FormBuilder.$data.sortElementOptions,
    };
  },
  components: { ...FormBuilder.$options.components },
};
</script>
<style scoped>
.form-area {
  width: 50% !important;
  height: calc(100vh - 72px) !important;
  overflow-y: auto !important;
  border-radius: 4px !important;
}
</style>
@/components/form/formBuilder/formbuilder
