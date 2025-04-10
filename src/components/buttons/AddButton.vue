<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 거래 등록 페이지로 이동
function goToAddPage() {
  router.push('/transaction/edit');
}
</script>

<template>
  <div class="add-button">
    <button @click="goToAddPage">+</button>
  </div>
</template>

<style scoped>
.add-button {
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  position: fixed;
}

button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  border-radius: 50%;
  background-color: #add8e6;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
