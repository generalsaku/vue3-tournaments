<template>
  <div class="px-4 relative" :class="{ 'bg-white/5 pb-4': isExpanded }">
    <div v-if="isGameNameVisible" class="w-full text-2xl pt-2 text-center">
      {{ game.name }}
    </div>
    <div
      class="flex items-center justify-between app-border-bottom-light min-h-[50px] max-h-[64px]"
      @click="toggle"
    >
      <div class="w-3/12 text-center relative">
        <img v-if="team1Image" :src="team1Image" class="w-28 mx-auto" />
        <span v-else class="font-light text-2xl">{{ game.team1 }}</span>
        <mdi:star
          v-if="isTeam1Winner"
          class="absolute right-2 top-2 text-yellow-200/50 text-2xl"
        />
      </div>

      <div class="w-3/12 text-center">
        <span>{{ game.team1Score ?? "-" }}</span>
      </div>
      <div class="w-40 text-center">
        <span class="text-blue-300" :class="{ 'opacity-0': !game.overtime }"
          >OT</span
        >
      </div>
      <div class="w-3/12 text-center">
        <span>{{ game.team2Score ?? "-" }}</span>
      </div>
      <div class="w-3/12 text-center relative">
        <img v-if="team2Image" :src="team2Image" class="w-28 mx-auto" />
        <span class="font-light text-2xl" v-else>{{ game.team2 }}</span>
        <mdi:star
          v-if="isTeam2Winner"
          class="absolute left-2 top-2 text-yellow-200/50 text-2xl"
        />
      </div>
    </div>

    <div
      v-if="isExpanded"
      class="flex items-center justify-between h-24 shadow-inner bg-black/10"
    >
      <div class="w-3/12"></div>
      <div class="w-3/12">
        <div class="flex items-center justify-center relative">
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
      </div>
      <div class="w-40 text-center">
        <button
          class="app-btn mx-auto hover:bg-black/5"
          :class="{
            'shadow-inner bg-black/5': !game.overtime,
            'bg-black/5 ring-1': game.overtime,
          }"
          @click="set('overtime', !game.overtime)"
        >
          <span class="text-blue-300" :class="{ 'opacity-30': !game.overtime }"
            >OT</span
          >
        </button>
      </div>
      <div class="w-3/12">
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
      </div>
      <div class="w-3/12"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/stores/store";

const props = defineProps(["game", "readonly"]);
const $store = useStore();

const isExpanded = computed(
  () => props.readonly !== true && $store.isTournamentGameExpanded(props.game)
);

const toggle = () => {
  $store.toggleTournamentGame(!isExpanded.value ? props.game.id : "");
};

const team1Image = computed(() => $store.getTeamImage(props.game.team1));
const team2Image = computed(() => $store.getTeamImage(props.game.team2));

const isGameNameVisible = computed(
  () =>
    props.game.name?.length &&
    !(props.game.type === 0 || props.game.type === 4 || props.game.type === 5) // Consolidation, Final
);

const set = async (prop: string, value: number | boolean) => {
  const game = { ...props.game };
  game[prop] = value;

  await $store.updateTournamentGame(game);
};

const isOvertimeValid = computed(
  () =>
    !props.game.overtime ||
    Math.abs(props.game.team1Score - props.game.team2Score) === 1
);

const isTeam1Winner = computed(
  () =>
    props.game.team1Score != null &&
    props.game.team2Score != null &&
    (props.game.team1Score ?? 0) > (props.game.team2Score ?? 0) &&
    isOvertimeValid.value
);

const isTeam2Winner = computed(
  () =>
    props.game.team1Score != null &&
    props.game.team2Score != null &&
    (props.game.team1Score ?? 0) < (props.game.team2Score ?? 0) &&
    isOvertimeValid.value
);
</script>

<style lang="less" scoped></style>
