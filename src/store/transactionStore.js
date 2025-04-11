import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useToastStore } from './toastStore';
import axios from 'axios';

const API_URL = 'http://localhost:3000/trade_list';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // 거래 날짜 내림차순 정렬
  const sortedTransactions = computed(() => {
    return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // 날짜 format
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  }

  // 전체 거래 목록 (필터링 기능 구현시 사용)
  async function fetchTransactions(params = {}) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(API_URL, { params });
      transactions.value = response.data;
    } catch (err) {
      error.value = err.message || '거래 목록 불러오기 실패';
      toastStore.showToast(error.value, 'error');
    } finally {
      loading.value = false;
    }
  }

  // 특정 사용자 거래 조회 (MainPage와 TransactionsPage에서 현재 로그인된 유저의 거래를 불러올 때 사용)
  async function fetchUserTransactions(userId) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_URL}?userid=${userId}`);
      transactions.value = response.data;
    } catch (err) {
      error.value = err.message || '사용자 거래 목록 조회 실패';
      toastStore.showToast(err.value, 'error');
    } finally {
      loading.value = false;
    }
  }

  // 거래 등록 (post)
  async function createTransaction(transactionData) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(API_URL, transactionData);
      transactions.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message || '거래 등록 실패';
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // 거래 수정 (update)
  async function updateTransaction(id, transactionData) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch(`${API_URL}/${id}`, transactionData);
      const index = transactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        transactions.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value = err.message || '거래 수정 실패';
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // 거래 삭제
  async function deleteTransaction(id) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${API_URL}/${id}`);
      transactions.value = transactions.value.filter((t) => t.id !== id);
      return true;
    } catch (err) {
      error.value = err.message || '거래 삭제 실패';
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    transactions,
    loading,
    error,
    sortedTransactions,
    formatDate,
    fetchTransactions,
    fetchUserTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
});
