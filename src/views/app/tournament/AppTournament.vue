<template>
  <div class="flex-1 overflow-auto">
    <RouterView></RouterView>
  </div>
  <AppTournamentBar></AppTournamentBar>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useTournamentStore } from "@/stores/tournament";
import AppTournamentBar from "@/views/app/tournament/AppTournamentBar.vue";

const route = useRoute();

const userTournamentStore = useTournamentStore();

onMounted(() => {
  if (route.params.tournamentId?.length) {
    userTournamentStore.load(route.params.tournamentId);
  }
});
</script>

<style lang="less" scoped></style>
