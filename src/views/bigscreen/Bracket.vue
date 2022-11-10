<template>
  <div class="flex" style="width: 100%">
    <div
      v-for="(round, index1) in $store.tournament.bracketRounds"
      :key="index1"
      class="flex flex-col flex-1"
      :class="{ 'w-100': index1 === 0 }"
    >
      <div class="flex flex-col justify-center h-screen">
        <div class="text-center">{{ round.name }}</div>
        <Game
          v-for="(game, index) in round.games"
          :game="game"
          :key="index"
          :readonly="true"
        ></Game>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Game from "@/components/Game.vue";

import { useStore } from "@/stores/store";

const $store = useStore();

const getGroupings = (bracket: any) => {
  let groups = [] as any;
  bracket.forEach((game) => {
    const shouldCreateGroup =
      !groups.length || groups[groups.length - 1].length === 2;
    if (shouldCreateGroup) {
      groups.push([game]);
    } else {
      groups[groups.length - 1].push(game);
    }
  });

  return groups;
};
</script>

<style lang="less" scoped>
::v-deep img {
  width: 100px !important;
}

::v-deep span {
  font-size: 28px;
}
</style>
