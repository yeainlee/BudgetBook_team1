<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';
import '@/assets/main.css';

// css 코드 블럭애서 색상 코드 받아오기
const rootStyle = getComputedStyle(document.documentElement);
const blueLight = rootStyle.getPropertyValue('--blue-light').trim();
const blueDark = rootStyle.getPropertyValue('--blue-dark').trim();
const border = rootStyle.getPropertyValue('--border-color').trim();

// pinia 스토어 참조 및 차트 객체 선언
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const chartRef = ref(null);
let chartInstance = null;

// 컴포넌트 마운트 시 실행
onMounted(async () => {
  // 사용자 정보가 없으면 종료
  if (!userStore.user || !userStore.user.id) return;

  // 거래 내역 fetch
  await transactionStore.fetchTransactions(userStore.user.id);
  const trades = transactionStore.transactions;

  // 현재 연도-월 (YYYY-MM) 포맷 추출
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 월별 수입/지출 초기 구조 생성
  const monthly = {
    [currentMonth]: { income: 0, outcome: 0 },
  };

  // 거래 데이터를 순회하며 월별 수입/지출 합산
  trades.forEach((tx) => {
    const month = tx.date.slice(0, 7);
    const type = tx.type;
    const price = Number(tx.price);

    // 유효한 데이터만 처리
    if (!['income', 'outcome'].includes(type)) return;
    if (isNaN(price) || price <= 0) return;

    // 해당 월이 없으면 초기화
    if (!monthly[month]) {
      monthly[month] = { income: 0, outcome: 0 };
    }

    // 누적 합산
    monthly[month][type] += Number(price);
  });

  // 현재 월만 정렬 대상으로 사용
  const sortedMonths = [currentMonth];
  const incomeData = sortedMonths.map((month) => monthly[month].income);
  const outcomeData = sortedMonths.map((month) => monthly[month].outcome);

  // Chart.js용 데이터 구성
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

  // 차트 옵션 설정
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
