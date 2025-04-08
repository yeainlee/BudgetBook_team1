<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

// 차트 색상 지정
const blueLight = 'rgba(173, 216, 230, 0.85)';
const blueMid = 'rgba(100, 149, 237, 0.85)';
const blueDark = 'rgba(70, 130, 180, 0.85)';
const border = 'rgba(0, 0, 0, 0.05)';

// userID 받아오기
const userStore = useUserStore();
const userId = userStore.user?.id;

const chartRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  //   기본 URL 설정
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });
  const res = await api.get(`/users/${userId}/trade_list`);
  const trades = res.data;

  // 월별 수입/지출 계산
  const monthly = {};

  trades.forEach((tx) => {
    const month = tx.date.slice(0, 7);
    if (!monthly[month]) {
      monthly[month] = { income: 0, outcome: 0 };
    }
    monthly[month][tx.type] += tx.price;
  });

  const sortedMonths = Object.keys(monthly).sort();
  const incomeData = sortedMonths.map((month) => monthly[month].income);
  const outcomeData = sortedMonths.map((month) => monthly[month].outcome);

  // config 구성
  const data = {
    labels: sortedMonths, // x축 : 월
    datasets: [
      {
        label: '수입',
        data: incomeData,
        backgroundColor: blueMid,
        borderColor: border,
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: '지출',
        data: outcomeData,
        backgroundColor: blueDark,
        borderColor: border,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#333' } },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#333' },
        grid: { color: border },
      },
    },
  };

  const ctx = chartRef.value.getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new window.Chart(ctx, {
    type: 'bar',
    data,
    options,
  });
});
</script>

<template>
  <h2>월별 통계 차트</h2>
  <h3>월별 수입/지출 비교</h3>
  <canvas ref="chartRef"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 320px;
}
</style>
