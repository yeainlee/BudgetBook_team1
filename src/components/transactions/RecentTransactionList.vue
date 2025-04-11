<script setup>
import { ref, onMounted, computed } from 'vue';
import TransactionCard from './TransactionCard.vue';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';

// pinia 스토어 인스턴스 가져오기
const userStore = useUserStore();
const transactionStore = useTransactionStore();

// 최근 거래 5개를 저장할 반응형 변수
const recentList = ref([]);

// 최근 거래 5개를 저장할 반응형 변수
onMounted(async () => {
  // 사용자 정보가 존재할 경우에만 실행
  if (userStore.user) {
    // 사용자 거래 내역 가져오기
    await transactionStore.fetchUserTransactions(userStore.user.id);
    // 정렬된 거래 내역 중 상위 5개 추출
    recentList.value = transactionStore.sortedTransactions.slice(0, 5);
  }
});
</script>

<template>
  <div class="recent-transaction">
    <h3>최근 거래</h3>
    <!-- 거래 내역이 있을 경우 목록 출력 -->
    <ul v-if="recentList.length">
      <li v-for="tx in recentList" :key="tx.id">
        <!-- 개별 거래 항목을 카드 형태로 표시 -->
        <TransactionCard :transaction="tx" />
      </li>
    </ul>
    <!-- 거래 내역이 없을 경우 대체 문구 출력 -->
    <p v-else>거래 내역이 없습니다.</p>
  </div>
</template>

<style scoped>
.recent-transaction {
  padding: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.8rem;
}
</style>
