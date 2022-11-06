<template>
  <div
    class="tooltip opacity-0 duration-300 absolute left-1/2 transform font-light bg-gray-600 px-4 py-2 rounded-md z-50 drop-shadow text-2xl pointer-events-none"
    :class="translate"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["position"]);

const translate = computed(() => {
  switch (props.position) {
    case "left":
      return "-translate-x-full";
    case "right":
      return null;
    default:
      return "-translate-x-1/2";
  }
});
</script>

<style lang="less" scoped>
.tooltip {
  min-width: 100px;
}
</style>
