<template>
  <AppBar></AppBar>
  <AppPanel></AppPanel>
  <div class="overflow-auto flex flex-col flex-1">
    <RouterView></RouterView>
  </div>

  <!--TURN OFF CLICK INTERACTION WHEN LOADING-->
  <div class="fixed fixed inset-0" v-if="$store.isLoading"></div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";
import { RouterView } from "vue-router";

import AppBar from "./AppBar.vue";
import AppPanel from "./panel/AppPanel.vue";

const $store = useStore();
</script>

<style lang="less" scoped></style>
