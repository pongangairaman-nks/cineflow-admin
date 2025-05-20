<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">
        {{ isEditMode ? "Edit Video" : "Add Video" }}
      </v-card-title>

      <v-form
        @submit.prevent="handleSubmit"
        enctype="multipart/form-data"
        class="custom-form"
      >
        <v-text-field
          v-model="video.title"
          label="Title"
          required
          variant="solo"
        />
        <v-text-field
          v-model="video.genre"
          label="Genre"
          required
          variant="solo"
          class="custom-text-field"
        />
        <v-text-field
          v-model="video.type"
          label="Type"
          required
          variant="solo"
          class="custom-text-field"
        />
        <p
          :style="{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#9b9b9b',
            marginBottom: '10px',
          }"
        >
          Upload Video File
        </p>
        <v-file-input
          v-model="videoFile"
          accept="video/*"
          @change="handleFileChange"
          variant="plain"
          prepend-icon="mdi-cloud-upload"
          hide-details
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #6E44FF',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            minHeight: '120px' /* Makes it a box */,
            color: '#6E44FF' /* Text color */,
            fontSize: '16px',
            fontWeight: 'bold',
          }"
        >
          Click to upload or drag & drop a video file
        </v-file-input>
        <p
          :style="{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#9b9b9b',
            marginTop: '16px',
            marginBottom: '10px',
          }"
        >
          Upload Video Thumbnail
        </p>
        <v-file-input
          v-model="posterFile"
          accept="image/*"
          @change="handleFileChange"
          variant="plain"
          prepend-icon="mdi-cloud-upload"
          hide-details
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #6E44FF',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            minHeight: '120px' /* Makes it a box */,
            color: '#6E44FF' /* Text color */,
            fontSize: '16px',
            fontWeight: 'bold',
          }"
        >
          Click to upload or drag & drop a poster image
        </v-file-input>
        <div
          class="button-container"
          :style="{
            marginTop: '24px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }"
        >
          <v-btn
            @click="$router.push('/')"
            class="cancel-btn"
            :style="{
              backgroundColor: 'gray',
              color: 'white',
              marginRight: '16px',
            }"
          >
            Cancel
          </v-btn>
          <v-btn
            type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            :style="{ backgroundColor: '#6E44FF', color: 'white' }"
          >
            {{ isEditMode ? "Update Video" : "Add Video" }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVideoStore } from "@/store/videos";
import type { IVideo } from "@/types";

const videoStore = useVideoStore();
const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => !!route.params.id);
const isSubmitting = ref(false);

const video = ref<IVideo>({
  _id: "",
  title: "",
  genre: "",
  posterUrl: "",
  likes: 0,
});

const videoFile = ref<File | null>(null);
const posterFile = ref<File | null>(null);

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

const handleFileChange = (file: File) => {
  if (file) {
    // console.log("Selected file:", file.name);
  }
};

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    if (isEditMode.value && route.params.id) {
      await videoStore.updateVideo(
        route.params.id as string,
        video.value,
        videoFile.value ?? undefined,
        posterFile.value ?? undefined
      );
    } else {
      await videoStore.uploadVideo(
        video.value,
        videoFile.value ?? undefined,
        posterFile.value ?? undefined
      );
    }

    router.push("/");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting video. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
