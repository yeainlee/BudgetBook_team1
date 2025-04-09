<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

// 차트 색상 지정
const blueLight = 'rgba(173, 216, 230, 0.85)';
const blueMid = 'rgba(100, 149, 237, 0.85)';
const blueDark = 'rgba(70, 130, 180, 0.85)';
const blueSoft = 'rgba(135, 206, 250, 0.85)';
const blueSky = 'rgba(30, 144, 255, 0.85)';
const border = 'rgba(0, 0, 0, 0.05)';

const blueSet = [blueLight, blueMid, blueDark, blueSoft, blueSky];

// userID 받아오기
const userStore = useUserStore();
const userId = userStore.user?.id;

const chartRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });
  const [tradeRes, categoryRes] = await Promise.all([
    api.get(`/users/${userId}/trade_list`),
    api.get(`/category`),
  ]);

  const tradeList = tradeRes.data;
  const categoryList = categoryRes.data;

  // 지출 거래, 지출 카테고리 필터링
  const outcomeList = tradeList.filter((tx) => tx.type === 'outcome');
  const outcomeCategory = categoryList.filter((cat) => cat.type === 'outcome');

  // 카테고리 이름 추출
  const outcomeByCategory = {};
  outcomeList.forEach((tx) => {
    const catId = tx.categoryId;
    if (!outcomeByCategory[catId]) outcomeByCategory[catId] = 0;
    outcomeByCategory[catId] += tx.price;
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#333' },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label} : ${context.formattedValue}원`;
          },
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
  height: 320px;
}
</style>
