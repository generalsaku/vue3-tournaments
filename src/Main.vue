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

button {
  background: transparent;
  border: 0;
  border-radius: 3px;
  color: inherit;

  &:hover {
    background: RGBA(var(--app-base-color2-rgb), 0.1);
  }
}
</style>
