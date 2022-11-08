<template>
  <AppBar></AppBar>
  <AppPanel></AppPanel>
  <div class="overflow-auto flex flex-col flex-1">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import AppBar from "./AppBar.vue";
import AppPanel from "./panel/AppPanel.vue";
</script>

<style lang="less" scoped></style>
