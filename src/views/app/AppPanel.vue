<template>
  <section
    ref="$ref"
    class="fixed top-0 left-0 min-w-[28rem] h-full app-shadow-primary ease-in-out duration-300 app-bg-primary-to-secondary z-50"
    :class="[uxStore.isPanelOpen ? 'translate-x-0' : '-translate-x-full']"
  >
    <h1 class="app-flex-center h-28">BRACKET MASTER</h1>

    <ul>
      <li>
        <button
          class="app-btn-nav"
          @click="this.$router.push({ name: 'home' })"
        >
          <mdi-home class="icon text-5xl mr-2" />
          <span>Home</span>
        </button>
      </li>
      <li>
        <button
          class="app-btn-nav"
          @click="this.$router.push({ name: 'info' })"
        >
          <mdi-information class="icon text-5xl mr-2" />
          <span>Info</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useUxStore } from "@/stores/ux";

const $ref = ref();
const uxStore = useUxStore();

const detectClickOutsideListener = (event: Event) => {
  if (event.target === $ref.value || $ref.value.contains(event.target)) {
    return;
  }

  uxStore.togglePanel();
};

watch(
  () => uxStore.isPanelOpen,
  () => {
    if (uxStore.isPanelOpen) {
      requestAnimationFrame(() =>
        document.addEventListener("click", detectClickOutsideListener)
      );
      return;
    }
    document.removeEventListener("click", detectClickOutsideListener);
  }
);

onBeforeMount(() =>
  document.removeEventListener("click", detectClickOutsideListener)
);
</script>

<style lang="less" scoped></style>
