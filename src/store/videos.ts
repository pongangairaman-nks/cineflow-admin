import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
import {
  useQuery,
  useMutation,
  provideApolloClient,
} from "@vue/apollo-composable";
import { GET_ALL_VIDEOS, DELETE_VIDEO } from "@/graphql/queries";
import apolloClient from "../graphql/apollo";
import type { IVideo } from "../types/index";

export const useVideoStore = defineStore("videoStore", () => {
  const videos = ref<IVideo[]>([]);
  const loading = ref(true);
  const error = ref("");

  provideApolloClient(apolloClient);
  const { result, refetch, onError } = useQuery(GET_ALL_VIDEOS);

  watchEffect(() => {
    if (result.value) {
      videos.value = result.value.getAllVideos;
      loading.value = false;
    }
  });

  onError((err) => {
    error.value = err.message;
    loading.value = false;
  });

  const removeVideo = async (id: string) => {
    const { mutate } = useMutation(DELETE_VIDEO);
    await mutate({ id });
    await refetch();
  };

  return { videos, loading, error, removeVideo };
});
