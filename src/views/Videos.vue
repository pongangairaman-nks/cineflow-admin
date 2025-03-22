<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="mt-8">
    <v-card>
      <v-card-title class="text-h5">🎬 Video Library</v-card-title>

      <v-data-table
        :headers="headers"
        :items="videos"
        :loading="loading"
        class="elevation-1"
        item-value="_id"
      >
        <!-- 🔸 Custom poster thumbnail -->
        <template #item.posterUrl="{ item }">
          <v-img :src="item.posterUrl" width="80" height="100" cover />
        </template>

        <!-- 🔸 Delete button -->
        <template #item.actions="{ item }">
          <v-btn color="red" @click="handleDelete(item._id)" variant="text">
            Delete
          </v-btn>
        </template>
      </v-data-table>

      <v-card-text v-if="error" class="text-red">
        Error: {{ error }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/store/videos";
import { storeToRefs } from "pinia";
import type { IVideo } from "@/types";

// 🎯 Access Pinia store and state
const videoStore = useVideoStore();
const { videos, loading, error } = storeToRefs(videoStore);

// 🗑 Delete function
const handleDelete = async (id: string) => {
  await videoStore.removeVideo(id);
};

// 📊 Vuetify table headers
const headers: { text: string; value: keyof IVideo | "actions" }[] = [
  { text: "Poster", value: "posterUrl" },
  { text: "Title", value: "title" },
  { text: "Genre", value: "genre" },
  { text: "Likes", value: "likes" },
  { text: "Actions", value: "actions", sortable: false },
];
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}
</style>
