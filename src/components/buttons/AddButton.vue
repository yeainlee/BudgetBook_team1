<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 거래 등록 페이지로 이동
function goToAddPage() {
  router.push('/add');
}
</script>

<template>
  <div class="text-end my-3">
    <button
      class="btn btn-primary rounded-circle px-3 py-2"
      @click="goToAddPage"
    >
      +
    </button>
  </div>
</template>

<style scoped>
.add-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
}
</style>
