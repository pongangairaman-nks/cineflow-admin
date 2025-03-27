import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { IVideo } from "@/types";

export const useVideoStore = defineStore("videoStore", () => {
  const videos = ref<IVideo[]>([]);
  const loading = ref(true);
  const error = ref("");

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      loading.value = true;
      const response = await axios.get(
        "http://localhost:5000/api/video/getAllVideos"
      );

      // Adjust based on your actual response structure
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

  // Delete a video
  const deleteVideo = async (videoId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/video/${videoId}`);

      // Remove the video from local state
      videos.value = videos.value.filter((video) => video._id !== videoId);

      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete video";
      throw err;
    }
  };

  // Update a video
  const updateVideo = async (videoId: string, videoData: Partial<IVideo>) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Append text fields
      Object.keys(videoData).forEach((key) => {
        const value = videoData[key as keyof IVideo];
        if (value !== undefined && value !== null) {
          // Handle file uploads separately
          if (key === "videoFile" || key === "posterFile") {
            formData.append(
              key === "videoFile" ? "video" : "poster",
              value as unknown as File
            );
          } else {
            formData.append(key, value as string);
          }
        }
      });

      const response = await axios.put(
        `http://localhost:5000/api/video/${videoId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the video in local state
      const index = videos.value.findIndex((v) => v._id === videoId);
      if (index !== -1) {
        videos.value[index] = response.data.video;
      }

      return response.data.video;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update video";
      throw err;
    }
  };

  // Initial fetch
  fetchVideos();

  return {
    videos,
    loading,
    error,
    fetchVideos,
    deleteVideo,
    updateVideo,
  };
});
