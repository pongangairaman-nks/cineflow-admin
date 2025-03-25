<template>
  <div class="h-full flex-1 overflow-y-auto">
    <nav
      class="flex items-center px-[16px] py-[16px]"
      :style="{ display: 'flex', justifyContent: 'end' }"
    >
      <!-- <div
        :style="{ paddingLeft: '16px', display: 'flex', alignItems: 'center' }"
      >
        <span class="text-h5">Welcome!</span>
      </div> -->
      <!-- Notification and User Icons -->
      <div
        class="flex items-center px-3 py-2 rounded-[4px] h-10"
        :style="{ width: 'fit-content' }"
      >
        <!-- Notification Button -->
        <v-btn
          class="mr-[16px] text-white bg-[#2C2C3E]"
          elevation="0"
          :style="{ marginRight: '16px' }"
        >
          <div
            class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center"
          >
            <v-icon size="16">mdi-bell</v-icon>
          </div>
        </v-btn>

        <!-- User Button -->
        <v-btn class="text-white bg-[#2C2C3E]" elevation="0">
          <div
            class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center"
          >
            <v-icon size="16">mdi-account</v-icon>
          </div>
        </v-btn>
      </div>
    </nav>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Search, Mic, Bell, User } from "lucide-vue-next";
</script>
