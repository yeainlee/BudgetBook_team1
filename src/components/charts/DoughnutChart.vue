<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';

// css 코드 블럭애서 색상 코드 받아오기(배열로 불러오기)
const blueLight = 'rgba(173, 216, 230, 0.85)';
const blueMid = 'rgba(100, 149, 237, 0.85)';
const blueDark = 'rgba(70, 130, 180, 0.85)';
const blueSoft = 'rgba(135, 206, 250, 0.85)';
const blueSky = 'rgba(30, 144, 255, 0.85)';
const border = 'rgba(0, 0, 0, 0.05)';

const blueSet = [blueLight, blueMid, blueDark, blueSoft, blueSky];

// 차트 요소 및 상태 참조 변수
const chartRef = ref(null);
let chartInstance = null;

// pinia 스토어에서 유저 및 거래 내역 접근
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const userId = userStore.user?.id;

// 컴포넌트가 마운트되면 데이터 로딩 및 차트 생성
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

  // 카테고리별 총 지출 금액 합산
  const outcomeByCategory = {};
  outcomeList.forEach((tx) => {
    const catId = tx.categoryId;
    if (!outcomeByCategory[catId]) outcomeByCategory[catId] = 0;
    outcomeByCategory[catId] += Number(tx.price);
  });

  // 차트에 표시할 카테고리 이름, 금액 배열 생성
  const labels = outcomeCategory
    .filter((cat) => outcomeByCategory[cat.id])
    .map((cat) => cat.name);

  const dataValues = outcomeCategory
    .filter((cat) => outcomeByCategory[cat.id])
    .map((cat) => outcomeByCategory[cat.id]);

  // 차트 데이터 구성
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

  // 차트 옵션 설정
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

  // 차트 생성 및 랜더링
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
  max-width: 400px;
  height: auto;
  margin: 5rem auto;
  display: block;
}
</style>
