<template>
  <div class="text-center">
    <v-btn color="secondary" class="text-capitalize">{{
      currentField.buttonText
    }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonComp",
  props: ["currentField"],
};
</script>
