<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';

// 차트 색상 지정
const blueLight = 'rgba(173, 216, 230, 0.85)';
const blueMid = 'rgba(100, 149, 237, 0.85)';
const blueDark = 'rgba(70, 130, 180, 0.85)';
const blueSoft = 'rgba(135, 206, 250, 0.85)';
const blueSky = 'rgba(30, 144, 255, 0.85)';
const border = 'rgba(0, 0, 0, 0.05)';

const blueSet = [blueLight, blueMid, blueDark, blueSoft, blueSky];

// userID 받아오기
const chartRef = ref(null);
let chartInstance = null;

const userStore = useUserStore();
const transactionStore = useTransactionStore();
const userId = userStore.user?.id;

onMounted(async () => {
  if (!userStore.user || !userStore.user.id) return;

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  // 거래 데이터 및 카테고리 데이터 가져오기
  await transactionStore.fetchUserTransactions(userStore.user.id);
  const tradeList = transactionStore.transactions;
  const categoryRes = await api.get('/category');
  const categoryList = categoryRes.data;

  // 지출 거래, 지출 카테고리 필터링
  const outcomeList = tradeList.filter((tx) => tx.type === 'outcome');
  const outcomeCategory = categoryList.filter((cat) => cat.type === 'outcome');

  // 카테고리별 금액 합산
  const outcomeByCategory = {};
  outcomeList.forEach((tx) => {
    const catId = tx.categoryId;
    if (!outcomeByCategory[catId]) outcomeByCategory[catId] = 0;
    outcomeByCategory[catId] += Number(tx.price);
  });

  // 사용된 카테고리 이름, 금액 추출
  const labels = outcomeCategory
    .filter((cat) => outcomeByCategory[cat.id])
    .map((cat) => cat.name);

  const dataValues = outcomeCategory
    .filter((cat) => outcomeByCategory[cat.id])
    .map((cat) => outcomeByCategory[cat.id]);

  // chart.js 구성
  const data = {
    labels,
    datasets: [
      {
        label: '카테고리별 지출',
        data: dataValues,
        backgroundColor: blueSet,
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // 그래프 UI 세부 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#333' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label} : ${ctx.formattedValue}원`,
        },
      },
    },
  };

  const ctx = chartRef.value.getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new window.Chart(ctx, {
    type: 'doughnut',
    data,
    options,
  });
});
</script>

<template>
  <h3>카테고리별 지출</h3>
  <canvas ref="chartRef"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  max-width: 320px;
  height: 320px;
  margin: 0 auto;
  display: block;
}
</style>
