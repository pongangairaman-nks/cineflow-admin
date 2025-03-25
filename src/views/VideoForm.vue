<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">
        {{ isEditMode ? "Edit Video" : "Add Video" }}
      </v-card-title>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field v-model="video.title" label="Title" required />
        <v-text-field v-model="video.genre" label="Genre" required />
        <v-text-field v-model="video.posterUrl" label="Poster URL" required />
        <v-text-field v-model="video.likes" label="Likes" type="number" />

        <v-btn
          class="mt-4"
          @click="$router.push('/')"
          :style="{
            marginRight: '8px',
            backgroundColor: 'gray',
          }"
        >
          Cancel
        </v-btn>
        <v-btn type="submit" color="primary" class="mt-4">
          {{ isEditMode ? "Update Video" : "Add Video" }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVideoStore } from "@/store/videos";
import type { IVideo } from "@/types";

// 🏪 Pinia store
const videoStore = useVideoStore();
const route = useRoute();
const router = useRouter();

// 🆔 Check if editing mode
const isEditMode = computed(() => !!route.params.id);

// 🎥 Video data
const video = ref<IVideo>({
  _id: "",
  title: "",
  genre: "",
  posterUrl: "",
  likes: 0,
});

// 🚀 Fetch video if in edit mode
onMounted(() => {
  if (isEditMode.value) {
    const existingVideo = videoStore.videos.find(
      (v) => v._id === route.params.id
    );
    if (existingVideo) {
      video.value = { ...existingVideo };
    }
  }
});

// 🔹 Handle form submission
const handleSubmit = async () => {
  if (isEditMode.value) {
    await videoStore.updateVideo(video.value);
  } else {
    await videoStore.addVideo(video.value);
  }
  router.push("/");
};
</script>
