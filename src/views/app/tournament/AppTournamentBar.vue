<template>
  <footer
    class="app-shadow-primary app-flex-center justify-around app-border-top-light"
  >
    <button
      class="app-btn-nav flex-col flex-1 text-2xl border-b-4 border-transparent border-solid"
      :class="{
        'border-[var(--color-primary)]': routeName === 'standings',
      }"
      @click="() => $router.push({ name: 'standings' })"
    >
      <mdi-clipboard-list-outline
        class="icon text-5xl app-color-primary"
        :class="{
          'text-white': routeName === 'standings',
        }"
      />
      Standings
    </button>

    <button
      class="app-btn-nav flex-col flex-1 text-2xl border-b-4 border-transparent border-solid"
      :class="{
        'border-[var(--color-primary)]': routeName === 'games',
      }"
      @click="() => $router.push({ name: 'games' })"
    >
      <mdi-hockey-sticks
        class="icon text-5xl app-color-primary"
        :class="{
          'text-white': routeName === 'games',
        }"
      />
      Games
    </button>

    <button
      class="app-btn-nav flex-col flex-1 text-2xl border-b-4 border-transparent border-solid"
      :class="{
        'border-[var(--color-primary)]': routeName === 'bracket',
      }"
      @click="() => $router.push({ name: 'bracket' })"
    >
      <mdi-star
        class="icon text-5xl app-color-primary"
        :class="{
          'text-white': routeName === 'bracket',
        }"
      />
      Bracket
    </button>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const routeName = computed(() => route.name);
</script>

<style lang="less" scoped></style>
