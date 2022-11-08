<template>
  <div v-if="$store.tournament">
    <div
      v-for="round in $store.tournament.bracketRounds"
      :key="round.name"
      class="mt-4"
    >
      <HeaderLine>{{ round.name }}</HeaderLine>
      <Game v-for="game in round.games" :key="game.id" :game="game"></Game>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

import HeaderLine from "@/components/HeaderLine.vue";
import Game from "@/components/Game.vue";

const $store = useStore();
</script>

<style lang="less" scoped></style>
