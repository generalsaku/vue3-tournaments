<script setup lang="ts">
import { RouterView } from "vue-router";

window.addEventListener("load", () => {
  const update = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  };

  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);

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
  height: calc(100 * var(--app-vh, 10px));
}

body {
  font-family: "Roboto", sans-serif;
  color: white;
  font-size: 2rem;
}
</style>
