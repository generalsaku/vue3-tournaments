<template>
  <section class="p-12">
    <section
      v-if="!$store.user.isAuthorized"
      class="flex flex-col items-center justify-center"
    >
      <div class="app-flex-center pb-8">Sign in to access features below</div>
      <hr class="w-10/12 pt-16 pb-8 m-auto" />
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CreateTeamsCard></CreateTeamsCard>
      <CreateTournamentsCard></CreateTournamentsCard>
      <MyTournamentsCard></MyTournamentsCard>
    </section>
  </section>
</template>

<script setup lang="ts">
import CreateTeamsCard from "@/views/app/home/cards/CreateTeamsCard.vue";
import CreateTournamentsCard from "@/views/app/home/cards/CreateTournamentsCard.vue";
import MyTournamentsCard from "@/views/app/home/cards/MyTournamentsCard.vue";

import { useStore } from "@/stores/store";

const $store = useStore();
</script>

<style lang="less" scoped></style>
