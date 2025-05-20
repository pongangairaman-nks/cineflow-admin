import { createRouter, createWebHistory } from "vue-router";
import Videos from "@/views/Videos.vue";
import VideoForm from "@/views/VideoForm.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Videos",
    component: Videos,
  },
  {
    path: "/video/:id?", // Dynamic route, `id` is optional (for add/edit)
    name: "VideoForm",
    component: VideoForm,
    props: true, // Pass route params as props
  },
  {
    path: "/dashboard", // Dynamic route, `id` is optional (for add/edit)
    name: "Dashboard",
    component: Dashboard,
    props: true, // Pass route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
