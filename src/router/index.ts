import { createRouter, createWebHistory } from "vue-router";
import App from "../views/app/App.vue";
import Fullscreen from "../views/fullscreen/Fullscreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "app",
      component: App,
    },
    {
      path: "/full",
      name: "fullscreen",
      component: Fullscreen,
    }
  ],
});

export default router;
