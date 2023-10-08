<template>
  <div
    class="px-4 relative"
    :class="{
      'bg-white/5 pb-4 mb-4 outline outline-1 outline-white/30': isExpanded,
    }"
  >
    <div v-if="isGameNameVisible" class="w-full text-2xl pt-2 text-center">
      {{ game.name }}
    </div>
    <div
      class="flex items-center justify-between app-border-bottom-light min-h-[50px] max-h-[64px]"
      @click.prevent="toggle"
    >
      <div class="w-3/12 text-center relative">
        <img v-if="team1Image" :src="team1Image" class="w-28 mx-auto" />
        <span v-else class="font-light text-2xl">{{ game.team1 }}</span>
      </div>

      <div class="w-3/12 text-center">
        <span class="relative">
          <mdi:star
            v-if="isTeam1Winner"
            class="absolute right-8 top-1 text-yellow-200/50 text-2xl"
          />
          {{ game.team1Score ?? "-" }}
        </span>
      </div>
      <div class="w-40 text-center">
        <span class="text-blue-300" :class="{ 'opacity-0': !game.overtime }"
          >OT</span
        >
      </div>
      <div class="w-3/12 text-center">
        <span class="relative">
          <mdi:star
            v-if="isTeam2Winner"
            class="absolute left-8 top-1 text-yellow-200/50 text-2xl"
          />
          {{ game.team2Score ?? "-" }}</span
        >
      </div>
      <div class="w-3/12 text-center relative">
        <img v-if="team2Image" :src="team2Image" class="w-28 mx-auto" />
        <span class="font-light text-2xl" v-else>{{ game.team2 }}</span>
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
            @click="set('team1Score', Math.max(0, editableGame.team1Score - 1))"
            :disabled="isUpdating"
          >
            <mdi:chevron-left class="text-3xl" />
          </button>
          <span>{{ editableGame.team1Score }}</span>
          <button
            class="app-btn-round absolute -right-5"
            @click="set('team1Score', Math.max(0, editableGame.team1Score + 1))"
            :disabled="isUpdating"
          >
            <mdi:chevron-right class="text-3xl" />
          </button>
        </div>
      </div>
      <div class="w-40 text-center">
        <button
          class="app-btn mx-auto hover:bg-black/5 ot-btn"
          :class="{
            'bg-black/5 shadow-inner': !editableGame.overtime,
            'bg-black/5 ring-blue-400 ring-2': editableGame.overtime,
          }"
          @click="set('overtime', !editableGame.overtime)"
          :disabled="isUpdating"
        >
          <span
            class="text-blue-300"
            :class="{ 'opacity-30': !editableGame.overtime }"
            >OT</span
          >
        </button>
      </div>
      <div class="w-3/12">
        <div class="flex items-center justify-center mx-auto relative">
          <button
            class="app-btn-round absolute -left-5"
            @click="set('team2Score', Math.max(0, editableGame.team2Score - 1))"
            :disabled="isUpdating"
          >
            <mdi:chevron-left class="text-3xl" />
          </button>
          <span>{{ editableGame.team2Score }}</span>
          <button
            class="app-btn-round absolute -right-5"
            @click="set('team2Score', Math.max(0, editableGame.team2Score + 1))"
            :disabled="isUpdating"
          >
            <mdi:chevron-right class="text-3xl" />
          </button>
        </div>
      </div>
      <div class="w-3/12 text-center">
        <button
          v-if="!isUpdating"
          class="app-btn-round p-4 mx-auto app-bg-primary"
          @click="updateGame()"
          :disabled="isUpdating"
        >
          <mdi:send class="text-3xl" />
        </button>
        <span v-else class="mx-auto text-xl text-white/80 uppercase"
          >Saving...</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/stores/store";
import * as gameLogic from "@/logic/gameLogic";

const props = defineProps(["game", "readonly"]);
const editableGame = ref({
  ...props.game,
});
const isUpdating = ref(false);
const $store = useStore();

const isExpanded = computed(
  () => props.readonly !== true && $store.isTournamentGameExpanded(props.game)
);

const toggle = () => {
  if (!isExpanded.value) {
    editableGame.value = { ...props.game };
  }
  $store.toggleTournamentGame(!isExpanded.value ? props.game.id : "");
};

const team1Image = computed(() => $store.getTeamImage(props.game.team1));
const team2Image = computed(() => $store.getTeamImage(props.game.team2));

const isGameNameVisible = computed(
  () =>
    props.game.name?.length &&
    !(props.game.type === 0 || props.game.type === 4 || props.game.type === 5) // Consolidation, Final
);

const set = (prop: string, value: number | boolean) => {
  editableGame.value[prop] = value;
};

const updateGame = async () => {
  isUpdating.value = true;
  await $store.updateTournamentGame(editableGame.value);
  isUpdating.value = false;
  toggle();
};

const isTeam1Winner = computed(() => gameLogic.isTeam1Winner(props.game));
const isTeam2Winner = computed(() => gameLogic.isTeam2Winner(props.game));
</script>

<style lang="less" scoped></style>
