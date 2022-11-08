<template>
  <div v-if="$store.tournament">
    <div
      v-for="group in $store.tournament.qualifyingRound.groups"
      :key="group.name"
      class="mt-4"
    >
      <HeaderLine>{{ group.name }}</HeaderLine>
      <StandingsTable :standings="group.standings"></StandingsTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

import HeaderLine from "@/components/HeaderLine.vue";
import StandingsTable from "@/components/StandingsTable.vue";

const $store = useStore();
</script>

<style lang="less" scoped></style>
