<template>
  <v-container class="mt-8">
    <v-card
      :style="{
        background: 'transparent',
        border: '1px solid gray',
      }"
    >
      <v-card-title
        class="d-flex justify-space-between align-center pa-6"
        :style="{
          borderBottom: '1px solid gray',
        }"
      >
        <span class="text-h5">Manage Videos</span>
        <div
          @click="$router.push('/video')"
          :style="{
            backgroundColor: '#6E44FF',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ 'hover-style': hover }"
        >
          Add Video
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="videos"
        :loading="loading"
        class="elevation-1"
        item-value="_id"
        density="comfortable"
        :style="{
          padding: '8px',
          background: 'transparent',
        }"
      >
        <template #item.posterUrl="{ item }">
          <v-img
            :src="item.poster"
            width="100"
            height="100"
            cover
            :alt="item.title"
            :style="{
              margin: '16px',
              borderRadius: '10%',
            }"
          />
        </template>

        <template #item.actions="{ item }">
          <v-btn
            color="blue"
            @click="navigateToEdit(item._id)"
            variant="text"
            size="large"
          >
            <v-icon>mdi-pencil</v-icon>
            <!-- Edit Icon -->
          </v-btn>

          <v-btn
            color="red"
            @click="confirmDelete(item._id)"
            variant="text"
            size="large"
          >
            <v-icon>mdi-delete</v-icon>
            <!-- Delete Icon -->
          </v-btn>
        </template>
      </v-data-table>

      <v-card-text v-if="error" class="text-red">
        Error: {{ error }}
      </v-card-text>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Confirm Delete</v-card-title>
        <v-card-text> Are you sure you want to delete this video? </v-card-text>
        <v-card-actions>
          <v-btn color="gray" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red"
            variant="elevated"
            @click="executeDelete"
            :loading="deleting"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useVideoStore } from "@/store/videos";
import { storeToRefs } from "pinia";

const videoStore = useVideoStore();
const { videos, loading, error } = storeToRefs(videoStore);
const router = useRouter();

const deleteDialog = ref(false);
const videoToDelete = ref<string | null>(null);
const deleting = ref(false);

const confirmDelete = (videoId: string) => {
  videoToDelete.value = videoId;
  deleteDialog.value = true;
};

const executeDelete = async () => {
  if (!videoToDelete.value) return;

  try {
    deleting.value = true;
    await videoStore.deleteVideo(videoToDelete.value);
    deleteDialog.value = false;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to delete video";
  } finally {
    deleting.value = false;
  }
};

const navigateToEdit = (videoId: string) => {
  router.push(`/video/${videoId}`);
};

const headers = [
  { title: "Poster", key: "posterUrl", sortable: false },
  { title: "Title", key: "title" },
  { title: "Genre", key: "genre" },
  { title: "Likes", key: "likes" },
  { title: "Actions", key: "actions", sortable: false },
];
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}
</style>
