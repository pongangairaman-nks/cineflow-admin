<script setup lang="ts">
import bgImage from "@/assets/bg-image.jpg";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
</script>
<template>
  <v-app>
    <!-- <router-view /> -->
    <v-layout class="flex h-screen">
      <v-navigation-drawer :width="240" permanent class="bg-[#1E1E2E]">
        <Sidebar />
      </v-navigation-drawer>

      <v-main
        class="overflow-auto"
        :style="{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <Navbar />
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
.v-navigation-drawer {
  background-color: #1e1e2e !important;
}
</style>
