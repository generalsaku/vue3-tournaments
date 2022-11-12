<template>
  <div class="games flex h-screen overflow-hidden">
    <div
      v-for="(group, index1) in $store.tournament.qualifyingRound.groups"
      :key="index1"
      class="ring-1 ring-white/20"
    >
      <div class="bg-white/10 text-center">
        <span>{{ group.name }}</span>
      </div>
      <div
        v-for="(game, index2) in getSortedGames(group.games)"
        :key="index2"
        :class="{ 'bg-black/5': index2 % 2 !== 0 }"
      >
        <div class="text-center relative top-4">
          {{ getTimeOfDay(game) }}
        </div>
        <Game :game="game" :readonly="true"></Game>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Game from "@/components/Game.vue";

import { useStore } from "@/stores/store";

const $store = useStore();

const getSortedGames = (games: any) => {
  return games
    .map((g) => g)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
};

const getTimeOfDay = (game: any) => {
  const date = new Date(game.updatedAt);
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return `${hour.length === 1 ? "0" + hour : hour}:${
    minutes.length === 1 ? "0" + minutes : minutes
  }`;
};
</script>

<style lang="less" scoped>
::v-deep img {
}
</style>
