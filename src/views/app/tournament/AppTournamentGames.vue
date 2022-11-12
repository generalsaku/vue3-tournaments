<template>
  <div
    v-for="group in $store.tournament.qualifyingRound.groups"
    :key="group.name"
    class="mt-4"
  >
    <HeaderLine
      >{{ group.name }} ({{ completedCount(group.games) }}/
      {{ group.games.length }})</HeaderLine
    >
    <Game v-for="game in group.games" :key="game.id" :game="game"></Game>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";
import * as gameLogic from "@/logic/gameLogic";

import HeaderLine from "@/components/HeaderLine.vue";
import Game from "@/components/Game.vue";

const $store = useStore();

const completedCount = (games: any) =>
  games.filter(gameLogic.isAnyWinner).length;
</script>

<style lang="less" scoped></style>
