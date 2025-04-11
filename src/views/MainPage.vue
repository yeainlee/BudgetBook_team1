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

// 스토어 인스턴스
const userStore = useUserStore();
const transactionStore = useTransactionStore();

// 거래 데이터 저장용 상태
const trades = ref([]);

// 로딩 완료 여부
const isReady = ref(false);

// 현재 선택된 탭 상태 (monthly)
const selectedTab = ref('monthly');

// 로그인 여부 확인
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 컴포넌트 마운트 시 거래 내역 불러오기
onMounted(async () => {
  if (!userStore.user || !userStore.user.id) {
    console.warn('로그인이 필요합니다.');
    return;
  }

  // 로그인된 사용자 기준으로 거래 데이터 가져오기
  await transactionStore.fetchUserTransactions(userStore.user.id);
  trades.value = transactionStore.transactions;
  isReady.value = true;
});

// 최근 5개 거래(지출 - 최신순) 데이터 추출
const recentTransactions = computed(() =>
  trades.value.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
);
</script>

<template>
  <div class="main-container">
    <!-- 차트 및 탭 전환 영역 -->
    <div class="chart-section">
      <div class="tab-buttons">
        <!-- 수입 및 지출 탭 -->
        <button
          :class="{ active: selectedTab === 'monthly' }"
          @click="selectedTab = 'monthly'"
        >
          수입 및 지출
        </button>
        <!-- 카테고리 탭 -->
        <button
          :class="{ active: selectedTab === 'category' }"
          @click="selectedTab = 'category'"
        >
          카테고리
        </button>
      </div>
      <!-- 탭에 따라 차트 컴포넌트 전환 -->
      <div class="chart-area">
        <MonthlyChart v-if="selectedTab === 'monthly'" />
        <DoughnutChart v-else />
      </div>
    </div>
    <!-- 최근 거래 내역 표시 -->
    <div class="side-section">
      <RecentTransactionList :transactions="recentTransactions" />
    </div>
  </div>
  <!-- 오른쪽 아래 고정된 등록 버튼 -->
  <AddButton />
</template>

<style scoped>
/* 메인 전체 레이아웃 */
.main-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
}

/* 차트 영역 */
.chart-section {
  flex: 1;
}

/* 최근 거래 리스트 영역 */
.side-section {
  flex: 1;
}

/* 탭 버튼 스타일 */
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

/* 활성화된 탭 버튼 스타일 */
.tab-buttons button.active {
  background-color: var(--button-color);
  color: black;
}
</style>
