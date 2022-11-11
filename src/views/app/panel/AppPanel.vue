<template>
  <section
    ref="$ref"
    class="fixed top-0 left-0 min-w-[28rem] h-full app-shadow-primary ease-in-out duration-300 app-bg-primary-to-secondary z-50"
    :class="[$store.isPanelOpen ? 'translate-x-0' : '-translate-x-full']"
  >
    <h1 class="app-flex-center h-28">BRACKET MASTER</h1>

    <ul>
      <li>
        <button class="app-btn-nav" @click="$router.push({ name: 'home' })">
          <mdi-home class="icon text-5xl mr-2" />
          <span>Home</span>
        </button>
      </li>
      <li>
        <button class="app-btn-nav" @click="$router.push({ name: 'info' })">
          <mdi-information class="icon text-5xl mr-2" />
          <span>Info</span>
        </button>
      </li>
    </ul>
    <section v-if="$store.tournament" class="flex flex-col items-center">
      <hr class="w-80 my-4 mb-8" />
      <div class="w-full">
        <TournamentSection></TournamentSection>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "@/stores/store";

import TournamentSection from "@/views/app/panel/TournamentSection.vue";

const $ref = ref();

const $store = useStore();

const detectClickOutsideListener = (event: Event) => {
  if (event.target === $ref.value || $ref.value.contains(event.target)) {
    return;
  }

  $store.togglePanel();
};

watch(
  () => $store.isPanelOpen,
  () => {
    if ($store.isPanelOpen) {
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
