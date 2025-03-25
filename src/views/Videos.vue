<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="mt-8">
    <v-card>
      <v-card-title
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
        }"
      >
        <span class="text-h5">🎬 Video Library</span>
        <v-btn color="primary" @click="$router.push('/video')">
          + Add Video
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="videos"
        :loading="loading"
        class="elevation-1"
        item-value="_id"
        density="comfortable"
      >
        <!-- Poster Column -->
        <template #item.posterUrl="{ item }">
          <v-img :src="item.posterUrl" width="80" height="100" cover />
        </template>

        <!-- Actions Column -->
        <template #item.actions="{ item }">
          <v-btn
            color="blue"
            @click="$router.push(`/video/${item._id}`)"
            variant="text"
          >
            Edit
          </v-btn>
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

// 🎯 Access Pinia store and state
const videoStore = useVideoStore();
const { videos, loading, error } = storeToRefs(videoStore);

// 🗑 Delete function
const handleDelete = async (id: string) => {
  await videoStore.removeVideo(id);
};

// 📊 Vuetify table headers
const headers = [
  { title: "Poster", key: "posterUrl" },
  { title: "Title", key: "title" },
  { title: "Genre", key: "genre" },
  { title: "Likes", key: "likes" },
  { title: "Actions", key: "actions" },
];
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}
</style>
