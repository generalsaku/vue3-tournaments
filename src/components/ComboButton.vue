<template>
  <div class="flex">
    <button class="app-btn-outline rounded-r-none" @click="main.action">
      {{ main.name }}
    </button>

    <div class="relative">
      <button class="app-btn-outline rounded-l-none" @click="open = !open">
        <mdi:chevron-down />
      </button>

      <Menu :items="menu" :open="open" @close="() => (open = false)"></Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps(["main", "menu"]);
const open = ref(false);
</script>
