<script setup>
import { ref, onMounted, computed } from 'vue';
import TransactionCard from './TransactionCard.vue';

// 거래 배열 받아오기
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="recent-transaction">
    <h3>최근 거래</h3>
    <ul>
      <li v-for="tx in props.transaction" :key="tx.id">
        <TransactionCard :transaction="tx" />
      </li>
    </ul>
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
