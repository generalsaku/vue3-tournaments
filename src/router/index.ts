import { createRouter, createWebHistory } from "vue-router";
import App from "../views/app/App.vue";

import AppHome from "../views/app/home/AppHome.vue";
import AppProfile from "../views/app/AppProfile.vue";
import AppInfo from "../views/app/AppInfo.vue";
import AppTeams from "../views/app/teams/AppTeams.vue";
import AppCreateTournament from "../views/app/create-tournament/AppCreateTournament.vue";

import AppTournament from "../views/app/tournament/AppTournament.vue";
import AppTournamentStandings from "../views/app/tournament/AppTournamentStandings.vue";
import AppTournamentGames from "../views/app/tournament/AppTournamentGames.vue";
import AppTournamentBracket from "../views/app/tournament/AppTournamentBracket.vue";
import AppTournamentTiebreaker from "../views/app/tournament/AppTournamentTiebreaker.vue";

import Bigscreen from "../views/bigscreen/Bigscreen.vue";

import { useStore } from "@/stores/store";

export default function () {
  const $store = useStore();

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: App,
        redirect: { name: "home" },
        children: [
          {
            name: "home",
            path: "home",
            component: AppHome,
          },
          {
            name: "profile",
            path: "profile",
            component: AppProfile,
          },
          {
            name: "info",
            path: "info",
            component: AppInfo,
          },
          {
            name: "create-tournament",
            path: "create-tournament",
            component: AppCreateTournament,
          },
          {
            name: "teams",
            path: "teams",
            component: AppTeams,
          },
          {
            name: "tournament",
            path: "tournament/:tournamentId",
            component: AppTournament,
            redirect: { name: "standings" },
            children: [
              {
                name: "standings",
                path: "standings",
                component: AppTournamentStandings,
              },
              {
                name: "games",
                path: "games",
                component: AppTournamentGames,
              },
              {
                name: "bracket",
                path: "bracket",
                component: AppTournamentBracket,
              },
              {
                name: "tiebreaker",
                path: "tiebreaker",
                component: AppTournamentTiebreaker,
              },
            ],
          },
        ],
      },
      {
        name: "bigscreen",
        path: "/bigscreen",
        component: Bigscreen,
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    $store.authorize();

    if (to.path === "/profile" && !$store.user.isAuthorized) {
      next({ name: "home" });
    }

    if ($store.isPanelOpen) {
      $store.togglePanel();
    }

    next();
  });

  router.beforeResolve((to) => {
    $store.toggleTournamentGame("");
  });

  return router;
}
