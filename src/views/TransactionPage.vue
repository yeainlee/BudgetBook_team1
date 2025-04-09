<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useToastStore } from '@/store/toastStore';
import TransactionList from '@/components/transactions/TransactionList.vue';
import TransactionCard from '@/components/transactions/TransactionCard.vue';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const toastStore = useToastStore();

// 필터링 설정
const filters = ref({
  type: '',
  categoryId: '',
});

// 카테고리 목록
const categories = ref([]);

// 필터링된 거래 목록
const filteredTransactions = computed(() => {
  let result = [...transactionStore.transactions];

  // 유형 필터링
  if (filters.value.type) {
    result = result.filter((tx) => tx.type === filters.value.type);
  }

  // 카테고리 필터링
  if (filters.value.categoryId) {
    result = result.filter(
      (tx) => tx.categoryId === Number(filters.value.categoryId)
    );
  }

  // 날짜 기준 내림차순 정렬
  return result.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// 컴포넌트 초기화
onMounted(async () => {
  // 로그인 체크
  //   if (!userStore.isLoggedIn || !userStore.user) {
  //     router.push('/login');
  //     return;
  //   }

  try {
    // 카테고리 목록 불러오기
    const response = await axios.get('http://localhost:3000/category');
    categories.value = response.data;

    // 사용자 거래 목록 불러오기
    // await transactionStore.fetchUserTransactions(userStore.user.id);
    await transactionStore.fetchUserTransactions('tokkaeng');
  } catch (error) {
    console.error('데이터 로드 오류:', error);
    toastStore.showToast(
      '거래 내역을 불러오는 중 오류가 발생했습니다',
      'error'
    );
  }
});

// 필터 적용
const applyFilter = (type) => {
  filters.value.type = type;
};

// 새 거래 추가 페이지로 이동
const goToAddPage = () => {
  router.push('/transactions/edit');
};
</script>

<template>
  <div class="transactions-page">
    <div class="header">
      <h2>거래 내역</h2>
    </div>

    <!-- 필터 탭 -->
    <div class="filter-tabs">
      <button
        :class="['tab', filters.type === '' ? 'active' : '']"
        @click="applyFilter('')"
      >
        카테고리
      </button>
      <button
        :class="['tab', filters.type === 'income' ? 'active' : '']"
        @click="applyFilter('income')"
      >
        수입
      </button>
      <button
        :class="['tab', filters.type === 'outcome' ? 'active' : '']"
        @click="applyFilter('outcome')"
      >
        지출
      </button>
    </div>

    <transactionCard />

    <!-- 거래 목록 -->
    <div class="transaction-container">
      <div v-if="transactionStore.loading" class="loading-message">
        거래 내역을 불러오는 중...
      </div>
      <div v-else-if="filteredTransactions.length === 0" class="empty-message">
        거래 내역이 없습니다.
      </div>
      <div v-else>
        <TransactionList :transactions="filteredTransactions" />
      </div>
    </div>

    <!-- 거래 추가 버튼 -->
    <button @click="goToAddPage" class="add-btn">
      <i class="fa-solid fa-plus"></i>
    </button>
  </div>
</template>

<style scoped>
.transactions-page {
  padding: 20px;
  position: relative;
  min-height: 500px;
}

.header {
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.filter-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #555;
  border-bottom: 3px solid transparent;
}

.tab:hover {
  color: #1e88e5;
}

.tab.active {
  color: #1e88e5;
  border-bottom: 3px solid #1e88e5;
  font-weight: 500;
}

.transaction-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.loading-message,
.empty-message {
  padding: 30px;
  text-align: center;
  color: #666;
}

.add-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1e88e5;
  color: white;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #1976d2;
}
</style>
