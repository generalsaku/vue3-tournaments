<template>
  <Card>
    <template #title>
      <h3 class="text-5xl">Create teams</h3>
    </template>
    <template #description>
      <span class="font-light">
        You can start creating a tournament as soon as you've added your teams.
        Once that is complete you can start to battling away!
      </span>
    </template>
    <template #icon>
      <mdi:karate class="text-6xl" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/views/app/home/Card.vue";
</script>

<style lang="less" scoped></style>
