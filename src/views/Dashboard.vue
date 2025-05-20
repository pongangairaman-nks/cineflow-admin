<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1">Video Uploads</v-card-title>
          <v-card-text class="chart-container">
            <Bar :data="barChartOne" :options="getBarChartOptions()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1">Watch Time</v-card-title>
          <v-card-text class="chart-container">
            <Bar :data="barChartTwo" :options="getBarChartOptions()" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1"
            >Monthly Video Views</v-card-title
          >
          <v-card-text class="chart-container">
            <Bar :data="columnChart" :options="getColumnChartOptions()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1">Video Categories</v-card-title>
          <v-card-text class="chart-container">
            <Pie :data="pieChartOne" :options="getPieChartOptions()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-subtitle-1">User Engagement</v-card-title>
          <v-card-text class="chart-container">
            <Pie :data="pieChartTwo" :options="getPieChartOptions()" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Bar, Pie },
  data() {
    return {
      barChartOne: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Video Uploads",
            backgroundColor: "#42A5F5",
            data: [45, 62, 75, 53, 68],
          },
        ],
      },
      barChartTwo: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Watch Time (Hours)",
            backgroundColor: "#FF6384",
            data: [1200, 1500, 1350, 1650, 1450],
          },
        ],
      },
      columnChart: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Monthly Views",
            backgroundColor: "#4CAF50",
            data: [5000, 6200, 5500, 7000, 6800],
          },
        ],
      },
      pieChartOne: {
        labels: ["Entertainment", "Education", "Sports", "Music", "News"],
        datasets: [
          {
            label: "Video Categories",
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9966FF",
            ],
            data: [40, 25, 15, 30, 20],
          },
        ],
      },
      pieChartTwo: {
        labels: ["Likes", "Comments", "Shares", "Saves"],
        datasets: [
          {
            label: "User Engagement",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            data: [350, 200, 150, 100],
          },
        ],
      },
    };
  },
  methods: {
    getBarChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      };
    },
    getColumnChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      };
    },
    getPieChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}
</style>
