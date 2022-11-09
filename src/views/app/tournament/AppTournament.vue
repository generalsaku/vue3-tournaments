<template>
  <div class="flex-1 overflow-auto">
    <RouterView v-if="$store.tournament"></RouterView>
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
