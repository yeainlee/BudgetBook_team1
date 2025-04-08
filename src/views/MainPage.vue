<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MonthlyChart from '@/components/charts/MonthlyChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import RecentTransactionList from '@/components/transactions/RecentTransactionList.vue';
import AddButton from '@/components/buttons/AddButton.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const userId = userStore.user?.id;

const trades = ref([]);

// 데이터 불러오기
onMounted(async () => {
  const api = axios.create({ baseURL: 'http://localhost:3000' });
  const res = await api.get(`/users/${userId}/trade_list`);
  trades.value = res.data;
});

// 최근 5개 거래(지출) 데이터 추출
const recentTransactions = computed(() => {
  return trades.value
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});
</script>

<template>
  <MonthlyChart />
  <DoughnutChart />
  <RecentTransactionList :transactions="recentTransactions" />
  <AddButton />
</template>

<style scoped></style>
