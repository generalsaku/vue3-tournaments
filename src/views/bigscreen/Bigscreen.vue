<template>
  <div v-if="$store.tournament" class="flex">
    <div style="flex-basis: 420px; flex-shrink: 0">
      <Games></Games>
    </div>
    <div class="h-screen ring-1 ring-white/20 mr-8"></div>
    <Bracket></Bracket>
  </div>
</template>

<script setup lang="ts">
import Games from "./Games.vue";
import Bracket from "./Bracket.vue";

import { onMounted } from "vue";

import { useRoute } from "vue-router";

import { useStore } from "@/stores/store";

const $store = useStore();
const route = useRoute();

onMounted(() => {
  if (route.params.tournamentId?.length) {
    $store.loadTournament(route.params.tournamentId as string);
  }

  setInterval(() => {
    $store.loadTournament(route.params.tournamentId as string);
  }, 30 * 1000);
});
</script>
