<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useToastStore } from '@/store/toastStore';
import TransactionList from '@/components/transactions/TransactionList.vue';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const toastStore = useToastStore();

// 현재 선택된 탭
const selectedTab = ref('all'); // 'all', 'category', 'income', 'outcome'

// 카테고리 목록
const categories = ref([]);

// 모든 거래 내역 (날짜 내림차순)
const sortedTransactions = computed(() => {
  return [...transactionStore.transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
});

// 전체 탭 거래 목록
const allTransactions = computed(() => sortedTransactions.value);

// 수입 탭 거래 목록
const incomeTransactions = computed(() =>
  sortedTransactions.value.filter((tx) => tx.type === 'income')
);

// 지출 탭 거래 목록
const outcomeTransactions = computed(() =>
  sortedTransactions.value.filter((tx) => tx.type === 'outcome')
);

// 지출 카테고리별 집계
const outcomeCategorySummary = computed(() => {
  const summary = {};

  // 지출 카테고리 정보 맵 생성
  const outcomeCategories = categories.value.filter(
    (cat) => cat.type === 'outcome'
  );
  const categoryMap = {};
  outcomeCategories.forEach((cat) => {
    categoryMap[cat.id] = cat.name;
  });

  // 지출 거래 필터링
  const outcomeTransactions = transactionStore.transactions.filter(
    (tx) => tx.type === 'outcome'
  );

  // 카테고리별 집계
  outcomeTransactions.forEach((tx) => {
    const categoryId = tx.categoryId;
    const categoryName = categoryMap[categoryId] || '미분류';

    if (!summary[categoryId]) {
      summary[categoryId] = {
        id: categoryId,
        name: categoryName,
        totalAmount: 0,
        count: 0,
      };
    }

    summary[categoryId].totalAmount += tx.price;
    summary[categoryId].count += 1;
  });

  // 객체를 배열로 변환하고 금액 내림차순 정렬
  return Object.values(summary).sort((a, b) => b.totalAmount - a.totalAmount);
});

// 현재 탭에 따라 표시할 거래 목록
const currentTransactions = computed(() => {
  switch (selectedTab.value) {
    case 'all':
      return allTransactions.value;
    case 'income':
      return incomeTransactions.value;
    case 'outcome':
      return outcomeTransactions.value;
    default:
      return allTransactions.value;
  }
});

// 컴포넌트 초기화
onMounted(async () => {
  // 로그인 체크
  // if (!userStore.isLoggedIn || !userStore.user) {
  //   router.push('/login');
  //   return;
  // }

  try {
    // 카테고리 목록 불러오기
    const response = await axios.get('http://localhost:3000/category');
    categories.value = response.data;

    // 사용자 거래 목록 불러오기
    await transactionStore.fetchUserTransactions(userStore.user.id);
  } catch (error) {
    console.error('데이터 로드 오류:', error);
    toastStore.showToast(
      '거래 내역을 불러오는 중 오류가 발생했습니다',
      'error'
    );
  }
});

// 탭 변경
const changeTab = (tab) => {
  selectedTab.value = tab;
};

// 새 거래 추가 페이지로 이동
const goToAddPage = () => {
  router.push('/transactions/edit');
};

// 카테고리 이름 가져오기
const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : '-';
};
</script>

<template>
  <div class="transactions-page">
    <div class="header">
      <h2>거래 내역</h2>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tabs">
      <button
        :class="['tab', selectedTab === 'all' ? 'active' : '']"
        @click="changeTab('all')"
      >
        전체
      </button>
      <button
        :class="['tab', selectedTab === 'category' ? 'active' : '']"
        @click="changeTab('category')"
      >
        카테고리별
      </button>
      <button
        :class="['tab', selectedTab === 'income' ? 'active' : '']"
        @click="changeTab('income')"
      >
        수입
      </button>
      <button
        :class="['tab', selectedTab === 'outcome' ? 'active' : '']"
        @click="changeTab('outcome')"
      >
        지출
      </button>
    </div>

    <!-- 카테고리별 지출 집계 (카테고리 탭일 때만) -->
    <div v-if="selectedTab === 'category'" class="category-summary">
      <div v-if="outcomeCategorySummary.length === 0" class="empty-message">
        지출 내역이 없습니다.
      </div>
      <div v-else class="category-table">
        <table>
          <thead>
            <tr>
              <th>카테고리</th>
              <th class="amount-column">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="category in outcomeCategorySummary"
              :key="category.id"
              class="category-row"
            >
              <td>{{ category.name }}</td>
              <td class="amount-column">
                ₩{{ category.totalAmount.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 거래 목록 (카테고리 탭이 아닐 때) -->
    <div v-if="selectedTab !== 'category'" class="transaction-container">
      <div v-if="transactionStore.loading" class="loading-message">
        거래 내역을 불러오는 중...
      </div>
      <div v-else-if="currentTransactions.length === 0" class="empty-message">
        거래 내역이 없습니다.
      </div>
      <div v-else>
        <TransactionList :transactions="currentTransactions" />
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

.tabs {
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

.transaction-container,
.category-summary {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.category-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  font-weight: 500;
  color: #555;
  background-color: #f9f9f9;
}

.amount-column {
  text-align: right;
  font-weight: 500;
  color: #f44336;
}

.category-row {
  transition: background-color 0.2s;
}

.category-row:hover {
  background-color: #f5f5f5;
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
