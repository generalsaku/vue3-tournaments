<template>
  <div>
    <HeaderLine class="mt-4">TIEBREAKER</HeaderLine>
    <ul>
      <li v-for="(team, index) in tiebreaker" :key="team">
        <div
          class="flex justify-between items-center px-8 hover:bg-black/10"
          :class="{ 'bg-black/5': index % 2 === 1 }"
        >
          <img :src="$store.getTeamImage(team)" class="w-24" />
          <span>{{ team }}</span>

          <div class="flex flex-col">
            <button class="app-btn-round" @click="move(team, true)">
              <mdi:chevron-up />
            </button>
            <button class="app-btn-round" @click="move(team, false)">
              <mdi:chevron-down />
            </button>
          </div>
        </div>
      </li>
    </ul>
    <button class="app-btn px-16 py-8 m-4 ml-auto app-bg-primary" @click="save">
      SAVE
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useStore } from "@/stores/store";

import HeaderLine from "@/components/HeaderLine.vue";

const $store = useStore();

const tiebreaker = ref([...$store.tournament.tiebreaker]);

const move = (team: string, up: boolean) => {
  const currentIndex = tiebreaker.value.indexOf(team);

  const newIndex = up
    ? Math.max(0, currentIndex - 1)
    : Math.min(tiebreaker.value.length - 1, currentIndex + 1);

  tiebreaker.value.splice(currentIndex, 1);
  tiebreaker.value.splice(newIndex, 0, team);
};

const save = async () => {
  await $store.updateTournamentTiebreaker(tiebreaker.value);
};
</script>

<style lang="less" scoped></style>
