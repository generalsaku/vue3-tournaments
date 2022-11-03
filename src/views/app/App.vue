<template>
  <AppBar></AppBar>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import AppBar from "./AppBar.vue";
</script>

<style lang="less" scoped></style>
