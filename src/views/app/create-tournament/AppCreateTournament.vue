<template>
  <div class="p-16">
    <TournamentStep
      :step="1"
      name="Give tournament a name"
      :open="currentStep === 1"
      :valid="validations.name"
      :hide-back="true"
      @back="back"
      @next="next"
    >
      <input
        type="text"
        class="app-text-input mt-8"
        :value="tournament.name"
        @input="(e: any) => setter.setName(e.target.value)"
      />
    </TournamentStep>

    <TournamentStep
      :step="2"
      name="Select tournament structure"
      :open="currentStep === 2"
      :valid="validations.qualifyingGroups && validations.bracketType"
      @back="back"
      @next="next"
    >
      <div class="flex flex-col mt-8">
        <span class="text-3xl">Qualifying groups:</span>
        <div class="flex rounded-xl app-shadow-secondary overflow-hidden mt-4">
          <button
            class="app-btn-combo"
            :class="{
              'app-bg-primary': tournament.qualifyingGroups === 0,
            }"
            @click="(e) => setter.setQualifyingGroups(0)"
          >
            0
          </button>
          <button
            class="app-btn-combo"
            :class="{ 'app-bg-primary': tournament.qualifyingGroups === 1 }"
            @click="(e) => setter.setQualifyingGroups(1)"
          >
            1
          </button>
          <button
            class="app-btn-combo"
            :class="{ 'app-bg-primary': tournament.qualifyingGroups === 2 }"
            @click="(e) => setter.setQualifyingGroups(2)"
          >
            2
          </button>
          <button
            class="app-btn-combo"
            :class="{ 'app-bg-primary': tournament.qualifyingGroups === 4 }"
            :disabled="tournament.bracketType === 3"
            @click="(e) => setter.setQualifyingGroups(4)"
          >
            4
          </button>
          <button
            class="app-btn-combo"
            :class="{ 'app-bg-primary': tournament.qualifyingGroups === 8 }"
            :disabled="tournament.bracketType >= 2"
            @click="(e) => setter.setQualifyingGroups(8)"
          >
            8
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-8">
        <span class="text-3xl">Bracket:</span>
        <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
          <button
            class="app-btn-nav flex-col"
            :class="[
              tournament.bracketType === 0 ? 'app-bg-primary' : 'bg-black/10',
            ]"
            @click="() => setter.setBracketType(0)"
          >
            <BracketSvg type="eight"></BracketSvg>
            <span class="mt-2">EIGHTFINALS</span>
          </button>

          <button
            class="app-btn-nav flex-col"
            :class="[
              tournament.bracketType === 1 ? 'app-bg-primary' : 'bg-black/10',
            ]"
            @click="() => setter.setBracketType(1)"
          >
            <BracketSvg type="quarter"></BracketSvg>
            <span class="mt-2">QUARTERFINALS</span>
          </button>

          <button
            class="app-btn-nav flex-col"
            :class="[
              tournament.bracketType === 2 ? 'app-bg-primary' : 'bg-black/10',
            ]"
            @click="() => setter.setBracketType(2)"
          >
            <BracketSvg type="semi"></BracketSvg>
            <span class="mt-2">SEMIFINALS</span>
          </button>

          <button
            class="app-btn-nav flex-col"
            :class="[
              tournament.bracketType === 3 ? 'app-bg-primary' : 'bg-black/10',
            ]"
            @click="() => setter.setBracketType(3)"
          >
            <BracketSvg type="final"></BracketSvg>
            <span class="mt-2">FINAL</span>
          </button>
        </div>
      </div>
      <div class="mt-12 flex items-center">
        <div
          class="flex rounded-full w-min overflow-hidden ring-1 ring-white/20"
        >
          <button
            class="app-btn-nav justify-center w-min"
            :class="[
              tournament.useConsolidation ? 'bg-transparent' : 'app-bg-primary',
            ]"
            @click="() => setter.setUseConsolidation(false)"
          >
            OFF
          </button>
          <button
            class="app-btn-nav justify-center w-min"
            :class="[
              tournament.useConsolidation ? 'app-bg-primary' : 'bg-transparent',
            ]"
            @click="() => setter.setUseConsolidation(true)"
          >
            ON
          </button>
        </div>
        <span class="ml-6">Consolidation (play for 3rd place)</span>
      </div>
    </TournamentStep>

    <TournamentStep
      :step="3"
      name="Pick teams"
      :open="currentStep === 3"
      :valid="true"
      @back="back"
      @next="next"
    >
      <div class="flex mt-8">
        <input
          type="text"
          class="app-text-input"
          v-model="teamSearchTerm"
          placeholder="Search team..."
        />
        <button
          class="app-btn-outline mt-auto ml-2 text-2xl"
          @click="() => (teamSearchTerm = '')"
        >
          Clear
        </button>
      </div>

      <div class="flex mt-8">
        <div
          v-for="(column, index) in teamSelectionCount"
          :key="index"
          class="flex flex-1 items-center justify-center"
        >
          <span v-if="index !== teamSelectionDefaultIndex">{{
            `${getGroupName(index)} (${getCountInGroup(index)})`
          }}</span>
        </div>
      </div>

      <div
        v-for="team in availableTeams"
        :key="team.name"
        class="flex app-border-bottom-light py-4"
      >
        <div
          v-for="(column, index) in teamSelectionCount"
          :key="index"
          class="flex flex-1 items-center justify-center"
        >
          <TeamSelectionOption
            :is-default="index === teamSelectionDefaultIndex"
            :selectable="teamSelection[team.name] !== index"
            :team="team"
            @click="() => setter.setTeamSelection(team.name, index)"
          ></TeamSelectionOption>
        </div>
      </div>
    </TournamentStep>

    <TournamentStep
      :step="4"
      name="Start tournament"
      :open="currentStep === 4"
      @back="back"
      @next="next"
      :hide-complete="true"
      :valid="true"
    >
      <button
        class="app-btn app-bg-primary mx-auto mt-16"
        @click="createTournament"
      >
        CREATE TOURNAMENT!
      </button>
    </TournamentStep>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, onMounted, ref } from "vue";

import TournamentStep from "@/views/app/create-tournament/TournamentStep.vue";
import BracketSvg from "@/views/app/create-tournament/BracketSvg.vue";
import TeamSelectionOption from "@/views/app/create-tournament/TeamSelectionOption.vue";

import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";

const $store = useStore();
const router = useRouter();

const teams = ref([] as any);
const teamSelection = ref({} as any);
const currentStep = ref(1);
const teamSearchTerm = ref("");
const availableTeams = computed(() =>
  teams.value.filter((team) =>
    teamSearchTerm.value.length
      ? team.name.toLowerCase().includes(teamSearchTerm.value.toLowerCase())
      : true
  )
);

const tournament = ref({
  name: null,
  qualifyingGroups: null,
  bracketType: null,
  useConsolidation: true,
  selectedTeams: {},
} as any);

const back = () => {
  currentStep.value--;
};

const next = () => {
  currentStep.value++;
};

const validations = ref({
  name: false,
  qualifyingGroups: false,
  bracketType: false,
});

const teamSelectionCount = computed(() =>
  Math.max(2, tournament.value.qualifyingGroups + 1)
);

const teamSelectionDefaultIndex = computed(() =>
  tournament.value.qualifyingGroups > 1
    ? Math.floor(teamSelectionCount.value / 2)
    : 0
);

const getGroupName = (index) => {
  if (index === teamSelectionDefaultIndex.value) {
    return "";
  } else {
    return `GROUP ${
      teamSelectionCount.value <= 2 ? index + 1 : Math.max(0, index - 1) + 1
    }`;
  }
};

const getCountInGroup = (index) =>
  Object.values(teamSelection.value).filter((i) => i === index).length;

const setter = {
  setName: (name: string) => {
    tournament.value.name = name;
    validations.value.name = !!name?.length;
  },
  setQualifyingGroups: (count: 0 | 1 | 2 | 4 | 8) => {
    tournament.value.qualifyingGroups = count;
    validations.value.qualifyingGroups = [0, 1, 2, 4, 8].includes(count);

    for (const key of Object.keys(teamSelection.value)) {
      teamSelection.value[key] = teamSelectionDefaultIndex.value;
    }
  },
  setBracketType: (type: 0 | 1 | 2 | 3) => {
    tournament.value.bracketType = type;
    validations.value.bracketType = [0, 1, 2, 3].includes(type);

    const qualifyingGroups = (tournament.value.qualifyingGroups as any) ?? 0;
    validations.value.qualifyingGroups = !(
      (qualifyingGroups === 4 && type === 3) ||
      (qualifyingGroups === 8 && type >= 2)
    );

    // RESET TEAM SELECTION
    for (const key of Object.keys(teamSelection.value)) {
      teamSelection.value[key] = teamSelectionDefaultIndex.value;
    }
  },
  setUseConsolidation: (value: boolean) => {
    tournament.value.useConsolidation = value;
  },
  setTeamSelection: (teamName, index) => {
    const team = teams.value.find((x: any) => x.name === teamName) as any;
    teamSelection.value[team.name] = index;

    // @ts-ignore
    tournament.value.selectedTeams = Object.entries(teamSelection.value).reduce(
      (collection, [key, value]) => {
        if (value === teamSelectionDefaultIndex.value) {
          return collection;
        }

        const groupName = getGroupName(value);
        const group = collection[groupName] || (collection[groupName] = []);
        const team = teams.value.find((x: any) => x.name === key);
        if (!group.includes(team)) {
          group.push(team);
        }
        return collection;
      },
      {}
    );
  },
};

const createTournament = async () => {
  const tournamentId = await $store.createTournament(tournament.value);
  router.push({ name: "tournament", params: { tournamentId } });
};

onMounted(async () => {
  teams.value = await $store.getTeams();
  for (const team of teams.value) {
    teamSelection.value[(team as any).name] = 0;
  }
});
</script>
