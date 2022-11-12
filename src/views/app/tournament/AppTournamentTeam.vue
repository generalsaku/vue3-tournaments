<template>
  <div class="flex flex-col bg-black/5">
    <div class="flex items-center justify-center">
      <img :src="teamImage" class="w-44" />
      <span class="uppercase mt-6">{{ team }} GAMES</span>
    </div>
    <StandingsTable
      :standings="group.standings"
      :highlight-team="team"
    ></StandingsTable>
  </div>

  <div v-if="group" class="mt-4">
    <HeaderLine>{{ group.name }}</HeaderLine>
    <Game
      v-for="game in group.games.filter(isMyGame)"
      :key="game.id"
      :game="game"
    ></Game>
  </div>

  <div
    v-for="bracketRound in $store.tournament.bracketRounds.filter(
      (x) => x.games.filter(isMyGame).length
    )"
    :key="bracketRound.name"
    class="mt-4"
  >
    <HeaderLine>{{ bracketRound.name }}</HeaderLine>
    <Game
      v-for="game in bracketRound.games.filter(isMyGame)"
      :key="game.id"
      :game="game"
    ></Game>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRoute } from "vue-router";

import { useStore } from "@/stores/store";

import HeaderLine from "@/components/HeaderLine.vue";
import StandingsTable from "@/components/StandingsTable.vue";
import Game from "@/components/Game.vue";

const $store = useStore();
const route = useRoute();

const team = computed(() => route.params.team);
const teamImage = computed(() => $store.getTeamImage(team.value as any));
const group = computed(() => {
  return $store.tournament.qualifyingRound.groups.filter((group) =>
    group.games.some(isMyGame)
  )[0];
});

const isMyGame = (game: any) =>
  game.team1 === team.value || game.team2 === team.value;
</script>

<style lang="less" scoped>
::v-deep table {
  tr {
    th:nth-child(2),
    td:nth-child(2) {
      display: none;
    }
  }
}
</style>
