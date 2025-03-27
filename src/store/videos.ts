import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { IVideo } from "@/types";

export const useVideoStore = defineStore("videoStore", () => {
  const videos = ref<IVideo[]>([]);
  const loading = ref(true);
  const error = ref("");

  const fetchVideos = async () => {
    try {
      loading.value = true;
      const response = await axios.get(
        "http://localhost:5000/api/video/getAllVideos"
      );

      videos.value = response.data.videos || response.data;

      loading.value = false;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching videos";
      loading.value = false;
    }
  };

  const deleteVideo = async (videoId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/video/${videoId}`);

      videos.value = videos.value.filter((video) => video._id !== videoId);

      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete video";
      throw err;
    }
  };

  fetchVideos();

  const uploadVideo = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    video: any,
    videoFile?: File,
    posterFile?: File,
    isEditMode?: boolean,
    videoId?: string
  ) => {
    try {
      const formData = new FormData();

      formData.append("title", video.title);
      formData.append("genre", video.genre);
      formData.append("type", video.type);

      if (videoFile) {
        formData.append("url", videoFile);
      }

      if (posterFile) {
        formData.append("poster", posterFile);
      } else if (video.posterUrl) {
        formData.append("posterUrl", video.posterUrl);
      }

      const apiUrl = isEditMode
        ? `http://localhost:5000/api/video/${videoId}`
        : "http://localhost:5000/api/video/upload";

      const apiMethod = isEditMode ? "put" : "post";

      const response = await axios[apiMethod](apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchVideos();

      return response.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error uploading video";
      throw err;
    }
  };

  const updateVideo = async (
    videoId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    video: any,
    videoFile?: File,
    posterFile?: File
  ) => {
    try {
      const formData = new FormData();

      formData.append("title", video.title);
      formData.append("genre", video.genre);
      formData.append("type", video.type);

      if (videoFile) {
        formData.append("video", videoFile);
      }

      if (posterFile) {
        formData.append("poster", posterFile);
      } else if (video.posterUrl) {
        formData.append("posterUrl", video.posterUrl);
      }

      const response = await axios.put(
        `http://localhost:5000/api/video/${videoId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchVideos();

      return response.data;
    } catch (err) {
      console.error("Error updating video:", err);
      throw err;
    }
  };

  return {
    videos,
    loading,
    error,
    fetchVideos,
    deleteVideo,
    updateVideo,
    uploadVideo,
  };
});
