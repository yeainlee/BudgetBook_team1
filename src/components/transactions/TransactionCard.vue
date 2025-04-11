<script setup>
import { defineProps, defineEmits } from 'vue';
import { useTransactionStore } from '@/store/transactionStore';
import router from '@/router';

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

const store = useTransactionStore();

// 휴지통(삭제 버튼) 함수
const handleDelete = async () => {
  try {
    await store.deleteTransaction(props.transaction.id);
  } catch (err) {
    console.error('삭제 실패: ', err);
  }
};

// 각각의 거래 내역 클릭 시 거래 내역 수정 페이지로 이동
const goToEditPage = () => {
  console.log(`거래 ID: ${props.transaction.id}로 이동 시도`);
  router.push({
    name: 'TransactionEditPage',
    params: { id: props.transaction.id },
  });
};
</script>

<template>
  <div class="transaction-card" @click="goToEditPage">
    <span class="date">{{ store.formatDate(transaction.date) }}</span>
    <span class="desc">{{ transaction.desc || '-' }}</span>
    <span
      class="price"
      :class="transaction.type === 'income' ? 'income' : 'outcome'"
    >
      ₩{{ transaction.price.toLocaleString() }}
    </span>
    <i class="fa-solid fa-trash-can delete-icon" @click.stop="handleDelete"></i>
  </div>
</template>

<style scoped>
.transaction-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--light-color);
}

.date {
  flex: 1;
  font-size: 14px;
  color: var(--light-text);
}

.desc {
  flex: 2;
  font-size: 16px;
  color: var(--dark-text);
}

.price {
  flex: 1;
  text-align: right;
  font-weight: bold;
}

.delete-icon {
  margin-left: 12px;
  cursor: pointer;
}

.delete-icon:hover {
  color: var(--light-color);
}
</style>
