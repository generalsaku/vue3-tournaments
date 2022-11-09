import { computed } from "vue";
import { defineStore } from "pinia";
import service from "@/api/service";

import { useUserStore } from "@/stores/user";
import { useTournamentStore } from "@/stores/tournament";
import { useUxStore } from "@/stores/ux";

export const useStore = defineStore("store", () => {
  const $user = useUserStore();
  const $tournament = useTournamentStore();
  const $ux = useUxStore();

  const authorize = () => $user.authorize();
  const deauthorize = () => $user.deauthorize();

  const setLoading = (value: boolean) => $ux.setLoading(value);
  const togglePanel = () => $ux.togglePanel();

  const getTeams = async () => await service.teams.get();
  const updateTeams = async (teams: []) => await service.teams.post(teams);

  const loadTournament = async (id: string) => await $tournament.load(id);
  const getMyTournaments = async () => await service.tournament.mine();

  const subscribeToTournament = async (id: string) => {
    if (!$user.user.isAuthorized) {
      return;
    }

    await service.tournament.subscribe(id);

    await $tournament.sync();
  };

  const unsubscribeToTournament = async (id: string) => {
    if (!$user.user.isAuthorized) {
      return;
    }

    await service.tournament.unsubscribe(id);

    await $tournament.sync();
  };

  const lockTournament = async (id: string) => {
    if (!$tournament.exists) {
      return;
    }

    await service.tournament.lock(id);

    await $tournament.sync();
  };

  const unlockTournament = async (id: string) => {
    if (!$tournament.exists) {
      return;
    }

    await service.tournament.unlock(id);

    await $tournament.sync();
  };

  const updateTournamentGame = async (game: {
    id: string;
    team1Score: number;
    overtime: boolean;
    team2Score: number;
  }) => {
    if (!$tournament.exists) {
      return;
    }

    service.tournament.game(
      $tournament.tournament.id,
      game.id,
      Math.max(0, game.team1Score ?? 0),
      game.overtime,
      Math.max(0, game.team2Score ?? 0)
    );

    await $tournament.sync();
  };

  const updateTournamentTiebreaker = async (tiebreaker: string[]) => {
    if (!$tournament.exists) {
      return;
    }

    service.tournament.tiebreaker($tournament.tournament.id, tiebreaker);

    await $tournament.sync();
  };

  const createTournament = async (tournament: any) => {
    if (!$user.user.isAuthorized) {
      return;
    }

    return await service.tournament.create(tournament);
  };

  const deleteTournament = async (id: string) =>
    await service.tournament.delete(id);

  const getTeamImage = (teamName: string) => $tournament.getTeamImage(teamName);

  const toggleTournamentGame = (gameId: string) => {
    if (!$tournament.exists || $tournament.isLocked) {
      return;
    }

    $tournament.expandedGameId = gameId;
  };

  const isTournamentGameExpanded = (game: {
    id: string;
    isLocked: boolean;
  }) => {
    return (
      !$tournament.isLocked &&
      $tournament.expandedGameId === game.id &&
      !game.isLocked
    );
  };

  return {
    authorize,
    deauthorize,

    setLoading,
    togglePanel,

    getTeams,
    updateTeams,

    loadTournament,
    createTournament,
    deleteTournament,
    getMyTournaments,
    getTeamImage,
    subscribeToTournament,
    unsubscribeToTournament,
    lockTournament,
    unlockTournament,
    updateTournamentGame,
    updateTournamentTiebreaker,
    toggleTournamentGame,
    isTournamentGameExpanded,

    user: computed(() => $user.user),
    isPanelOpen: computed(() => $ux.isPanelOpen),
    isLoading: computed(() => $ux.isLoading),
    tournament: computed(() => $tournament.tournament),
  };
});
