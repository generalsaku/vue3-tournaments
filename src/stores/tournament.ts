import { ref } from "vue";
import { defineStore } from "pinia";
import service from "@/api/service";

export const useTournamentStore = defineStore("tournament", () => {

  const tournament = ref(null);

  const expandedGameId = ref('');

  const hasTournament = () => !!tournament.value
  const isLocked = () => hasTournament() && !!tournament.value.isLocked

  const load = async (id: string) => {
    tournament.value = await service.tournament.get(id)
    console.log(tournament.value)
  }

  const setExpandedGame = (gameId: string) => {
    if (isLocked()) {
      return
    }

    expandedGameId.value = gameId
  }

  const getTeamImage = (teamName: string) => {
    if (!hasTournament() || typeof tournament.value.teamImages !== 'object') {
      return
    }

    return tournament.value.teamImages[teamName]
  }

  const updateGame = async (game: { id: string, team1Score: number, overtime: boolean, team2Score: number }) => {
    if (isLocked()) {
      return;
    }

    service.tournament.game(tournament.value?.id, game.id, game.team1Score, game.overtime, game.team2Score)
    tournament.value = await service.tournament.get(tournament.value?.id)
  }

  return { expandedGameId, tournament, getTeamImage, load, setExpandedGame, updateGame };
});