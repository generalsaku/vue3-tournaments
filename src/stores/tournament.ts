import { computed, ref } from "vue";
import { defineStore } from "pinia";
import service from "@/api/service";

export const useTournamentStore = defineStore("tournament", () => {
  const tournament = ref(null) as any;

  const expandedGameId = ref("");

  const exists = computed(() => !!tournament.value);
  const isLocked = computed(() => exists.value && !!tournament.value.isLocked);

  const load = async (id: string) => {
    tournament.value = await service.tournament.get(id);
  };

  const sync = async () =>
    (tournament.value = await service.tournament.get(tournament.value?.id));

  const getTeamImage = (teamName: string) => {
    if (!exists.value || typeof tournament.value.teamImages !== "object") {
      return;
    }

    return tournament.value.teamImages[teamName];
  };

  return {
    load,
    sync,
    getTeamImage,

    exists,
    isLocked,
    tournament,

    expandedGameId,
  };
});
