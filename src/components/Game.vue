<template>
  <div>
    <table class="w-full table-fixed">
      <tr v-if="isGameNameVisible" class="game-header-row">
        <td colspan="5" class="text-2xl pt-2">{{ game.name }}</td>
      </tr>
      <tr @click="toggle">
        <td>
          <div v-if="team2Image" class="app-btn-round p-0 hover:bg-transparent">
            <img :src="team1Image" class="w-28" />
          </div>
          <span v-else class="font-light text-2xl">{{ game.team1 }}</span>
        </td>
        <td>
          <span>{{ game.team1Score ?? "-" }}</span>
        </td>
        <td>
          <span class="text-blue-300" :class="{ 'opacity-0': !game.overtime }"
            >OT</span
          >
        </td>
        <td>
          <span>{{ game.team2Score ?? "-" }}</span>
        </td>
        <td>
          <div v-if="team2Image" class="app-btn-round p-0 hover:bg-transparent">
            <img :src="team2Image" class="w-28" />
          </div>
          <span class="font-light text-2xl" v-else>{{ game.team2 }}</span>
        </td>
      </tr>

      <tr v-if="isExpanded" class="h-24 shadow-inner bg-black/10">
        <td></td>
        <td>
          <div class="flex items-center justify-center mx-auto relative">
            <button
              class="app-btn-round absolute -left-5"
              @click="set('team1Score', game.team1Score - 1)"
            >
              <mdi:chevron-left class="text-3xl" />
            </button>
            <span>{{ game.team1Score }}</span>
            <button
              class="app-btn-round absolute -right-5"
              @click="set('team1Score', game.team1Score + 1)"
            >
              <mdi:chevron-right class="text-3xl" />
            </button>
          </div>
        </td>
        <td>
          <button
            class="app-btn mx-auto"
            @click="set('overtime', !game.overtime)"
          >
            <span
              class="text-blue-300"
              :class="{ 'opacity-30': !game.overtime }"
              >OT</span
            >
          </button>
        </td>
        <td>
          <div class="flex items-center justify-center mx-auto relative">
            <button
              class="app-btn-round absolute -left-5"
              @click="set('team2Score', game.team2Score - 1)"
            >
              <mdi:chevron-left class="text-3xl" />
            </button>
            <span>{{ game.team2Score }}</span>
            <button
              class="app-btn-round absolute -right-5"
              @click="set('team2Score', game.team2Score + 1)"
            >
              <mdi:chevron-right class="text-3xl" />
            </button>
          </div>
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useTournamentStore } from "@/stores/tournament";
import { useUxStore } from "@/stores/ux";

const props = defineProps(["game", "readonly"]);

const uxStore = useUxStore();
const tournamentStore = useTournamentStore();

const isExpanded = computed(
  () =>
    props.readonly !== true &&
    tournamentStore.expandedGameId === props.game.id &&
    !props.game.isLocked
);

const toggle = () => {
  tournamentStore.setExpandedGame(!isExpanded.value ? props.game.id : "");
};

const team1Image = computed(() =>
  tournamentStore.getTeamImage(props.game.team1)
);
const team2Image = computed(() =>
  tournamentStore.getTeamImage(props.game.team2)
);

const isGameNameVisible = computed(
  () =>
    props.game.name?.length &&
    !(props.game.type === 0 || props.game.type === 4 || props.game.type === 5) // Consolidation, Final
);

const set = async (prop: string, value: number | boolean) => {
  const game = { ...props.game };
  game[prop] = value;

  uxStore.setLoading(true);
  await tournamentStore.updateGame(game);
  uxStore.setLoading(false);
};
</script>

<style lang="less" scoped>
table {
  tr {
    &:not(.game-header-row) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    td {
      text-align: center;
      &:nth-child(1) button {
        margin-left: auto;
      }

      &:nth-child(5) button {
        margin-right: auto;
      }
    }
  }
}
</style>
