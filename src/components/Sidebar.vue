<template>
  <div class="h-full min-h-screen w-[240px] bg-[#1E1E2E] flex flex-col">
    <!-- Logo Section - Fixed at the top -->
    <div
      class="flex items-center justify-center py-6 px-[24px]"
      :style="{
        paddingLeft: '16px',
      }"
    >
      <div class="h-[64px] rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-lg">CINEFLOW</span>
      </div>
    </div>

    <!-- Navigation Menu - Grows to take available space -->
    <nav class="flex-grow overflow-y-auto">
      <div
        v-for="item in menuItems"
        :key="item.label"
        @click="handleItemClick(item)"
        :class="[
          'mt-[12px] flex items-center w-full py-[16px] mb-2 transition-colors duration-200 cursor-pointer',
          activeItem === item.label
            ? 'bg-[#6E44FF] text-white'
            : 'text-gray-400 hover:bg-[#2C2C3E] hover:text-white',
        ]"
        :style="{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#6E44FF',
          padding: '8px',
        }"
      >
        <component :is="item.icon" :size="20" class="mr-3" />
        <span class="text-sm font-light ml-[16px]">{{ item.label }}</span>
      </div>
    </nav>

    <!-- Logout Section - Fixed at the bottom -->
    <div class="p-4 border-t border-gray-700" @click="logout">
      <div
        class="w-full px-[16px] py-[8px] rounded-lg transition-colors duration-200 cursor-pointer text-gray-400 hover:bg-[#2C2C3E] hover:text-white"
        :style="{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '16px',
          position: 'fixed',
          bottom: '16px',
        }"
      >
        <LogOut :size="20" class="mr-3" />
        <span class="text-sm font-light ml-[16px]">Logout</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Home, LogOut } from "lucide-vue-next";
import type { Component } from "vue";

// Define an interface for menu items
interface MenuItem {
  icon: Component;
  label: string;
  path: string;
}

const activeItem = ref("Home");
const router = useRouter();

const menuItems: MenuItem[] = [{ icon: Home, label: "Home", path: "/dashboard/home" }];

const handleItemClick = (item: MenuItem) => {
  activeItem.value = item.label;
  router.push(item.path);
};

const logout = () => {
  router.push("/login");
};
</script>
