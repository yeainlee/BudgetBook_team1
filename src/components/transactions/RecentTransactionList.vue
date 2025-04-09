<script setup>
import { ref, onMounted, computed } from 'vue';
import TransactionCard from './TransactionCard.vue';
import { useUserStore } from '@/store/userStore';
import { useTransactionStore } from '@/store/transactionStore';

// 거래 배열 받아오기
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const recentList = ref([]);

onMounted(async () => {
  await transactionStore.fetchUserTransactions(userStore.user.id);
  recentList.value = transactionStore.sortedTransactions.slice(0, 5);
});
</script>

<template>
  <div class="recent-transaction">
    <h3>최근 거래</h3>
    <ul v-if="recentList.length">
      <li v-for="tx in recentList" :key="tx.id">
        <TransactionCard :transaction="tx" />
      </li>
    </ul>
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
