<template>
  <div>
    <v-tooltip
      bottom
      :disabled="!isEllipsisActive"
      max-width="500px"
      content-class="white tooltip-bottom"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-if="!showInChip"
          v-bind="attrs"
          v-on="on"
          ref="tooltipContent"
          class="text-truncate tooltip-truncation"
          :style="`-webkit-line-clamp: ${truncationLine} !important;`"
          @mouseover="checkEllipsis()"
        >
          {{ fullText }}
        </div>
        <div v-else v-bind="attrs" v-on="on">
          <v-chip small :color="chipColor">
            <span
              ref="tooltipContent"
              class="text-truncate tooltip-truncation"
              :style="`-webkit-line-clamp: ${truncationLine} !important;`"
              @mouseover="checkEllipsis()"
            >
              {{ fullText }}
            </span>
          </v-chip>
        </div>
      </template>
      <span class="tooltip-text primary--text font-family-dm-sans-500">
        {{ fullText }}
      </span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  name: "CustomTooltip",
  props: ["fullText", "truncationLine", "showInChip", "chipColor"],
  data() {
    return {
      isEllipsisActive: false,
    };
  },
  created() {
    window.addEventListener("load", this.checkEllipsis);
    window.addEventListener("resize", this.checkEllipsis);
  },
  beforeDestroy() {
    window.removeEventListener("load", this.checkEllipsis);
    window.removeEventListener("resize", this.checkEllipsis);
  },
  methods: {
    checkEllipsis() {
      if (
        (this.$refs.tooltipContent &&
          this.$refs.tooltipContent.offsetWidth <
            this.$refs.tooltipContent.scrollWidth) ||
        this.$refs.tooltipContent.offsetHeight <
          this.$refs.tooltipContent.scrollHeight
      ) {
        this.isEllipsisActive = true;
      } else {
        this.isEllipsisActive = false;
      }
    },
  },
};
</script>
<style scoped>
.tooltip-truncation {
  -webkit-box-orient: vertical !important;
  display: -webkit-box !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
}
</style>
