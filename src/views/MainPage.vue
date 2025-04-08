<script setup>
import { ref } from 'vue';
import MonthlyChart from '@/components/charts/MonthlyChart.vue';
</script>

<template>
  <MonthlyChart :data="statsByCategory" />
</template>

<style scoped></style>
