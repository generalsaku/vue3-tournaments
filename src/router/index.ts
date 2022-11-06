import { createRouter, createWebHistory } from "vue-router";
import App from "../views/app/App.vue";

import AppHome from "../views/app/home/AppHome.vue";
import AppProfile from "../views/app/AppProfile.vue";
import AppInfo from "../views/app/AppInfo.vue";

import AppTournament from "../views/app/tournament/AppTournament.vue";
import AppTournamentStandings from "../views/app/tournament/AppTournamentStandings.vue";
import AppTournamentGames from "../views/app/tournament/AppTournamentGames.vue";
import AppTournamentBracket from "../views/app/tournament/AppTournamentBracket.vue";

import Fullscreen from "../views/fullscreen/Fullscreen.vue";

import { useUxStore } from "@/stores/ux";
import { useUserStore } from "@/stores/user";

export default function () {
  const uxStore = useUxStore()
  const userStore = useUserStore()

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: App,
        redirect: { name: 'home' },
        children: [
          {
            name: 'home',
            path: 'home',
            component: AppHome
          },
          {
            name: 'profile',
            path: 'profile',
            component: AppProfile
          },
          {
            name: 'info',
            path: 'info',
            component: AppInfo
          },
          {
            name: 'tournament',
            path: 'tournament/:tournamentId',
            component: AppTournament,
            redirect: { name: 'standings' },
            children: [
              {
                name: 'standings',
                path: 'standings',
                component: AppTournamentStandings
              },
              {
                name: 'games',
                path: 'games',
                component: AppTournamentGames
              },
              {
                name: 'bracket',
                path: 'bracket',
                component: AppTournamentBracket
              }
            ]
          },
        ]
      },
      {
        name: 'full',
        path: "/full",
        component: Fullscreen,
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    userStore.updateLoggedIn()

    if (to.path === '/profile' && !userStore.isLoggedIn) {
      next({ name: 'home' })
    }

    if (uxStore.isPanelOpen) {
      uxStore.togglePanel()
    }

    next()
  })

  return router
}