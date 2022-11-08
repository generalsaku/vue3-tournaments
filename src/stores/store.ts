import { computed } from "vue";
import { defineStore } from "pinia";
import service from "@/api/service";

import { useUserStore } from "@/stores/user";
import { useTournamentStore } from "@/stores/tournament";
import { useUxStore } from "@/stores/ux";

export const useStore = defineStore("store", () => {
  const $user = useUserStore()
  const $tournament = useTournamentStore()
  const $ux = useUxStore()

  const authorize = () => $user.authorize()
  const deauthorize = () => $user.deauthorize()

  const setLoading = (value: boolean) => $ux.setLoading(value)
  const togglePanel = () => $ux.togglePanel()

  const loadTournament = async (id: string) => await $tournament.load(id)

  const subscribeToTournament = async (id: string) => {
    if (!$user.user.isAuthorized) {
      return;
    }

    await service.tournament.subscribe(id)

    await $tournament.sync()
  }

  const unsubscribeToTournament = async (id: string) => {
    if (!$tournament.exists) {
      return;
    }

    await service.tournament.unsubscribe(id)

    await $tournament.sync()
  }

  const updateTournamentGame = async (game: { id: string, team1Score: number, overtime: boolean, team2Score: number }) => {
    if (!$tournament.exists) {
      return;
    }

    service.tournament.game($tournament.tournament.id, game.id, game.team1Score, game.overtime, game.team2Score)

    await $tournament.sync()
  }

  const getTeamImage = (teamName: string) => $tournament.getTeamImage(teamName)

  const toggleTournamentGame = (gameId: string) => {
    if ($tournament.isLocked) {
      return
    }

    $tournament.expandedGameId = gameId
  }

  const isTournamentGameExpanded = (game: { id: string, isLocked: boolean  }) => {
    return !$tournament.isLocked && $tournament.expandedGameId === game.id && !game.isLocked
  }

  return {
    authorize, 
    deauthorize, 
    
    setLoading,
    togglePanel,

    loadTournament,
    getTeamImage, 
    subscribeToTournament, 
    unsubscribeToTournament, 
    updateTournamentGame,
    toggleTournamentGame,
    isTournamentGameExpanded,

    user: computed(() => $user.user),
    isPanelOpen: computed(() => $ux.isPanelOpen), 
    isLoading: computed(() => $ux.isLoading),
    tournament: computed(() => $tournament.tournament),
  };
});