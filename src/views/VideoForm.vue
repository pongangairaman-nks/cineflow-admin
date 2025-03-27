<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">
        {{ isEditMode ? "Edit Video" : "Add Video" }}
      </v-card-title>

      <v-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <v-text-field v-model="video.title" label="Title" required />
        <v-text-field v-model="video.genre" label="Genre" required />
        <v-text-field v-model="video.type" label="Type" required />

        <!-- File Upload Field -->
        <v-file-input
          v-model="videoFile"
          label="Video File"
          accept="video/*"
          prepend-icon="mdi-video"
          @change="handleFileChange"
          :rules="[
            (v) =>
              !v || v.size < 10000000 || 'File size should be less than 10 MB',
          ]"
        />

        <!-- Poster URL or File Upload -->
        <v-text-field v-model="video.posterUrl" label="Poster URL" />
        <v-file-input
          v-model="posterFile"
          label="Or Upload Poster Image"
          accept="image/*"
          prepend-icon="mdi-image"
        />

        <!-- <v-text-field v-model="video.likes" label="Likes" type="number" /> -->

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
        <v-btn
          type="submit"
          color="primary"
          class="mt-4"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
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
import axios from "axios";

// 🏪 Pinia store
const videoStore = useVideoStore();
const route = useRoute();
const router = useRouter();

// 🆔 Check if editing mode
const isEditMode = computed(() => !!route.params.id);
const isSubmitting = ref(false);

// 🎥 Video data
const video = ref<IVideo>({
  _id: "",
  title: "",
  genre: "",
  posterUrl: "",
  likes: 0,
});

// 📁 File references
const videoFile = ref<File | null>(null);
const posterFile = ref<File | null>(null);

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

// 📂 Handle file selection
const handleFileChange = (file: File) => {
  if (file) {
    console.log("Selected file:", file.name);
  }
};

// 🔹 Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    const formData = new FormData();

    // Append regular fields
    formData.append("title", video.value.title);
    formData.append("genre", video.value.genre);
    formData.append("type", video.value.type);
    // formData.append("likes", video.value.likes.toString());

    // Append files if they exist
    if (videoFile.value) {
      formData.append("url", videoFile.value);
    }
    if (posterFile.value) {
      formData.append("poster", posterFile.value);
    } else if (video.value.posterUrl) {
      formData.append("posterUrl", video.value.posterUrl);
    }

    // For edit mode, include the ID
    if (isEditMode.value) {
      formData.append("_id", video.value._id);
    }

    // Make API call
    const response = await axios.post(
      isEditMode.value
        ? "http://localhost:5000/api/video/upload"
        : "http://localhost:5000/api/video/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("upload video response", response);
    alert("api call done");
    // Update store with the response
    // if (isEditMode.value) {
    //   await videoStore.updateVideo(response.data);
    // } else {
    //   await videoStore.addVideo(response.data);
    // }

    router.push("/");
  } catch (error) {
    console.error("Error submitting form:", error);
    // Show error notification to user
    alert("Error submitting video. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
