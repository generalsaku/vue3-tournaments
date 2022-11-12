<template>
  <div class="flex-1 overflow-auto" :class="{ relative: !$store.tournament }">
    <RouterView v-if="$store.tournament"></RouterView>
    <mdi:progress-download
      v-else
      class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl animate-pulse"
    />
  </div>
  <AppTournamentBar></AppTournamentBar>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useStore } from "@/stores/store";
import AppTournamentBar from "@/views/app/tournament/AppTournamentBar.vue";

const route = useRoute();

const $store = useStore();

onMounted(() => {
  if (route.params.tournamentId?.length) {
    $store.loadTournament(route.params.tournamentId as string);
  }
});
</script>

<style lang="less" scoped></style>
