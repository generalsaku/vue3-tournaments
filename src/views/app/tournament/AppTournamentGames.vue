<template>
  <div
    v-for="group in $store.tournament.qualifyingRound.groups"
    :key="group.name"
    class="mt-4"
  >
    <HeaderLine>{{ group.name }}</HeaderLine>
    <Game v-for="game in group.games" :key="game.id" :game="game"></Game>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

import HeaderLine from "@/components/HeaderLine.vue";
import Game from "@/components/Game.vue";

const $store = useStore();
</script>

<style lang="less" scoped></style>
