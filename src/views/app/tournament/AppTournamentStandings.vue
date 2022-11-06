<template>
  <div v-if="tournament">
    <div
      v-for="group in tournament.qualifyingRound.groups"
      :key="group.name"
      class="mt-4"
    >
      <HeaderLine>{{ group.name }}</HeaderLine>
      <StandingsTable :standings="group.standings"></StandingsTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTournamentStore } from "@/stores/tournament";

import HeaderLine from "@/components/HeaderLine.vue";
import StandingsTable from "@/components/StandingsTable.vue";

const userTournamentStore = useTournamentStore();

const tournament = computed(() => userTournamentStore.tournament);
</script>

<style lang="less" scoped></style>
