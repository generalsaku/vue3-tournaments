<template>
  <div class="file-upload absolute inset-0 overflow-hidden opacity-0">
    <input class="h-full" type="file" @change="(e) => handleFile(e)" />
  </div>
</template>

<script setup lang="ts">
import { requestForm } from "@/api/request";

const props = defineProps(["id"]);

const handleFile = async (e: any) => {
  let formData = new FormData();
  formData.append("file", e.target.files[0]);

  const result = await requestForm(
    `${import.meta.env.VITE_API_BASE_URL}/teams/optimized-image`,
    formData
  );
  console.log(result);
};
</script>
