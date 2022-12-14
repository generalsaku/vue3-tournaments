<template>
  <Card>
    <template #title>
      <h3 class="text-5xl">My tournaments</h3>
    </template>
    <template #description>
      <span v-if="!(owner.length + subscribed.length)" class="font-light">
        This is where you'll see your created tournaments and the ones you've
        subscribed to.
      </span>

      <div v-if="owner.length" class="mt-6">
        <h3>My tournaments</h3>
        <div class="flex flex-wrap mt-2">
          <ComboButton
            v-for="tournament in owner"
            :key="tournament.id"
            :main="{
              name: tournament.name,
              action: () => {
                $router.push({
                  name: 'tournament',
                  params: { tournamentId: tournament.id },
                });
              },
            }"
            :menu="[
              {
                name: 'Delete',
                action: async () => {
                  await $store.deleteTournament(tournament.id);
                  await update();
                },
              },
            ]"
            class="mr-6 mb-6"
          >
            {{ tournament.name }}
          </ComboButton>
        </div>
      </div>

      <div v-if="subscribed.length" class="mt-6">
        <h3>Subscriptions</h3>
        <div class="flex flex-wrap mt-2">
          <ComboButton
            v-for="tournament in subscribed"
            :key="tournament.id"
            :main="{
              name: tournament.name,
              action: () => {
                $router.push({
                  name: 'tournament',
                  params: { tournamentId: tournament.id },
                });
              },
            }"
            :menu="[
              {
                name: 'Unsubscribe',
                action: async () => {
                  await $store.unsubscribeToTournament(tournament.id);
                  await update();
                },
              },
            ]"
            class="mr-6 mb-6"
          >
          </ComboButton>
        </div>
      </div>
    </template>
    <template #icon>
      <mdi:list-box-outline class="text-6xl" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import Card from "@/views/app/home/Card.vue";
import ComboButton from "@/components/ComboButton.vue";

import { useStore } from "@/stores/store";

const $store = useStore();

const owner = ref([] as any);
const subscribed = ref([] as any);

onMounted(async () => update());

const update = async () => {
  if (!$store.user.isAuthorized) {
    return;
  }

  const tournaments = await $store.getMyTournaments();
  owner.value = tournaments.filter((t) => !t.isSubscribed);
  subscribed.value = tournaments.filter((t) => t.isSubscribed);
};
</script>

<style lang="less" scoped></style>
