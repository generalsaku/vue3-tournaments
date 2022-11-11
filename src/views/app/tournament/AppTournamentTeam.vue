<template>
  <div class="flex items-center">
    <img :src="teamImage" />
    <span class="uppercase">{{ team }} GAMES</span>
  </div>

  <div
    v-for="group in $store.tournament.qualifyingRound.groups.filter(
      (x) => x.games.filter(isMyGame).length
    )"
    :key="group.name"
    class="mt-4"
  >
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
import Game from "@/components/Game.vue";
const $store = useStore();
const route = useRoute();

const team = computed(() => route.params.team);
const teamImage = computed(() => $store.getTeamImage(team.value));
const games = computed(() => {
  const _games = [];

  // QUALIFYING
  for (const group of $store.tournament.qualifyingRound.groups) {
    for (const game of group.games.filter(isMyGame)) {
      _games.push(game);
    }
  }

  for (const bracketRound of $store.tournament.bracketRounds) {
    for (const game of bracketRound.games.filter(isMyGame)) {
      _games.push(game);
    }
  }

  return _games;
});

const isMyGame = (game: any) =>
  game.team1 === team.value || game.team2 === team.value;
</script>

<style lang="less" scoped></style>
