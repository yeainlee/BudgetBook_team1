<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';
import axios from 'axios';
import MonthlyChart from '@/components/charts/MonthlyChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import RecentTransactionList from '@/components/transactions/RecentTransactionList.vue';
import AddButton from '@/components/buttons/AddButton.vue';
import ToastNotification from '@/components/ToastNotification.vue';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

const trades = ref([]);
const isReady = ref(false);
const selectedTab = ref('monthly');

const isLoggedIn = computed(() => userStore.isLoggedIn);

// 거래 데이터 가져오기
onMounted(async () => {
  if (!userStore.user || !userStore.user.id) {
    console.warn('로그인이 필요합니다.');
    return;
  }

  await transactionStore.fetchUserTransactions(userStore.user.id);
  trades.value = transactionStore.transactions;
  isReady.value = true;
});

// 최근 5개 거래(지출) 데이터 추출
const recentTransactions = computed(() =>
  trades.value.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
);
</script>

<template>
  <div class="main-container">
    <div class="chart-section">
      <div class="tab-buttons">
        <button
          :class="{ active: selectedTab === 'monthly' }"
          @click="selectedTab = 'monthly'"
        >
          수입 및 지출
        </button>
        <button
          :class="{ active: selectedTab === 'category' }"
          @click="selectedTab = 'category'"
        >
          카테고리
        </button>
      </div>
      <div class="chart-area">
        <MonthlyChart v-if="selectedTab === 'monthly'" />
        <DoughnutChart v-else />
      </div>
    </div>
    <div class="side-section">
      <RecentTransactionList :transactions="recentTransactions" />
    </div>
  </div>
  <AddButton />
</template>

<style scoped>
/* 차트 스타일 */
.main-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
}

.chart-section {
  flex: 1;
}

.side-section {
  flex: 1;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-buttons button {
  margin-top: 4rem;
  padding: 0.5rem 1rem;
  background-color: var(--light-color);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}

.tab-buttons button.active {
  background-color: var(--button-color);
  color: black;
}
</style>
