<script setup>
import TransactionCard from './TransactionCard.vue';
import { defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="transaction-list">
    <TransactionCard
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
  </div>
</template>

<style scoped>
.transaction-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}
</style>
