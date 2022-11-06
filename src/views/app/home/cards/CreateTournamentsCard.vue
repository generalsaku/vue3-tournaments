<template>
  <Card go-to="create-tournament">
    <template #title>
      <h3 class="text-5xl">Create tournament</h3>
    </template>
    <template #description>
      <span class="font-light">
        Okay, you've added your teams now, let's create a tournament from
        scratch!
      </span>
    </template>
    <template #icon>
      <mdi:tournament class="text-6xl" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/views/app/home/Card.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style lang="less" scoped></style>
