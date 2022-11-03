<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

window.addEventListener("load", () => {
  const update = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  };

  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);

  userStore.updateLoggedIn();

  update();
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
html {
  font-size: 8px;
}

html,
body,
div[data-v-app] {
  height: calc(100 * var(--app-vh));
}

body {
  margin: 0;
  background: linear-gradient(
    to right bottom,
    var(--app-base-color1),
    var(--app-base-color2)
  );
  font-family: "Roboto", sans-serif;
  color: white;
  font-size: 2rem;
}
</style>
