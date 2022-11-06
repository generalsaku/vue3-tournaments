<template>
  <ul
    v-if="show"
    ref="$ref"
    class="absolute top-full app-bg-ternary app-shadow-primary rounded-xl mt-2 py-4 z-50"
  >
    <li v-for="(item, index) in items" :key="index">
      <button class="app-btn-nav" @click="() => handleClick(item.action)">
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";

const props = defineProps(["items", "open"]);
const emit = defineEmits(["close"]);
const show = ref(false);
const $ref = ref();

const handleClick = (action) => {
  if (action) {
    action();
  }
  emit("close");
};

const detectClickOutsideListener = (event: Event) => {
  if (
    !$ref.value ||
    !event.target === $ref.value ||
    $ref.value.contains(event.target)
  ) {
    return;
  }

  emit("close");
};

watch(
  () => props.open,
  () => {
    show.value = props.open;

    if (show.value) {
      requestAnimationFrame(() =>
        document.addEventListener("click", detectClickOutsideListener)
      );
    } else {
      document.removeEventListener("click", detectClickOutsideListener);
    }
  }
);

onBeforeMount(() =>
  document.removeEventListener("click", detectClickOutsideListener)
);
</script>
