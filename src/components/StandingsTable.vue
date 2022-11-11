<template>
  <table class="standing font-light w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th class="relative">
          GP <Tooltip position="right">{{ getTooltip("gp") }}</Tooltip>
        </th>
        <th class="relative">
          W <Tooltip>{{ getTooltip("w") }}</Tooltip>
        </th>
        <th class="relative">
          L <Tooltip>{{ getTooltip("l") }}</Tooltip>
        </th>
        <th class="relative">
          OTL <Tooltip>{{ getTooltip("otl") }}</Tooltip>
        </th>
        <th class="relative">
          GF <Tooltip>{{ getTooltip("gf") }}</Tooltip>
        </th>
        <th class="relative">
          GA <Tooltip>{{ getTooltip("ga") }}</Tooltip>
        </th>
        <th class="relative">
          Diff <Tooltip>{{ getTooltip("diff") }}</Tooltip>
        </th>
        <th class="relative">
          Pts <Tooltip position="left">{{ getTooltip("pts") }}</Tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(standing, index) in standings" :key="index">
        <td title="POSITION">{{ index + 1 }}</td>
        <td class="w-28">
          <button
            class="app-btn-round p-0 hover:bg-transparent"
            @click="
              $router.push({ name: 'team', params: { team: standing.team } })
            "
          >
            <img :src="getTeamImage(standing.team)" />
          </button>
        </td>
        <td title="GAMES PLAYED">
          {{ standing.gamesPlayed }}
        </td>
        <td title="WIN">{{ standing.wins }}</td>
        <td title="LOSS">{{ standing.losses }}</td>
        <td title="OVER TIME LOSS">
          {{ standing.overtimeLosses }}
        </td>
        <td title="GOALS FOR">{{ standing.goalsFor }}</td>
        <td title="GOALS AGAINST">
          {{ standing.goalsAgainst }}
        </td>
        <td title="GOAL DIFFERENCE">
          {{ standing.goalDifference }}
        </td>
        <td title="POINTS">{{ standing.points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

import Tooltip from "@/components/Tooltip.vue";

defineProps(["standings"]);

const $store = useStore();

const getTeamImage = (teamName: string) => $store.getTeamImage(teamName);

const getTooltip = (type: string) => {
  switch (type) {
    case "gp":
      return "Games played - Number of games the team has played";
    case "w":
      return "Wins - Games the team has won";
    case "l":
      return "Losses - Games the team has lost";
    case "otl":
      return "Overtime losses - Games the team has lost in overtime";
    case "gf":
      return "Goals for - Number of goals the team has scored";
    case "ga":
      return "Goals against - Number of goals scored against the team";
    case "diff":
      return "Goal Difference (used as standings tiebreaker)";
    case "pts":
      return "Points - Team points, calculated from W, OTL (W=2, OTL=1)";
  }
};
</script>

<style lang="less" scoped>
table {
  th:hover .tooltip {
    opacity: 100 !important;
  }

  th,
  td {
    text-align: center;
    font-size: 14px;

    &:last-child {
      border-left: 1px dashed rgba(255, 255, 255, 0.2);
      font-weight: 500;
    }
  }

  td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:last-child {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
