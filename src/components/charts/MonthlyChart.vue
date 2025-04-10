<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';
import '@/assets/main.css';

// 색상 코드 받아오기
const rootStyle = getComputedStyle(document.documentElement);
const blueLight = rootStyle.getPropertyValue('--blue-light').trim();
const blueDark = rootStyle.getPropertyValue('--blue-dark').trim();
const border = rootStyle.getPropertyValue('--border-color').trim();

// userID 받아오기
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const chartRef = ref(null);
let chartInstance = null;

// 로그인 + 거래 데이터 가져오기
onMounted(async () => {
  if (!userStore.user || !userStore.user.id) return;

  await transactionStore.fetchTransactions(userStore.user.id);
  const trades = transactionStore.transactions;

  const currentMonth = new Date().toISOString().slice(0, 7);

  // 월별 수입/지출 계산
  const monthly = {
    [currentMonth]: { income: 0, outcome: 0 },
  };

  trades.forEach((tx) => {
    const month = tx.date.slice(0, 7);
    const type = tx.type;
    const price = Number(tx.price);

    if (!['income', 'outcome'].includes(type)) return;
    if (isNaN(price) || price <= 0) return;

    if (!monthly[month]) {
      monthly[month] = { income: 0, outcome: 0 };
    }
    monthly[month][type] += Number(price);
  });

  const sortedMonths = [currentMonth];
  const incomeData = sortedMonths.map((month) => monthly[month].income);
  const outcomeData = sortedMonths.map((month) => monthly[month].outcome);

  // config 구성
  const data = {
    labels: sortedMonths, // x축 : 월
    datasets: [
      {
        label: '수입',
        data: incomeData,
        backgroundColor: blueLight,
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
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#333' } },
      tooltip: { enabled: true },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: '#333', font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#333', font: { size: 12 } },
        grid: { color: border },
      },
    },
  };

  // 차트 랜더링
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
  <h3>월별 수입/지출 비교</h3>
  <canvas ref="chartRef"></canvas>
</template>

<style scoped>
canvas {
  width: 60%;
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>
