<script setup>
import { useToastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore() // 토스트 알림 상태와 관련된 Pinia 스토어에 접근
const { message, type, isVisible } = storeToRefs(toastStore) // message, type, isVisible 등 스토어의 상태에 반응형으로 접근

// 토스트 타입(success, error, info)별 디자인 결정
const getTypeClass = () => {
  switch (type.value) {
    case 'success':
      return 'toast-success'
    case 'error':
      return 'toast-error'
    case 'info':
      return 'toast-info'
    default:
      return 'toast-success'
  }
}
</script>

<template>

  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="getTypeClass()">
      <div class="toast-content">
        <div class="toast-message">{{ message }}</div>
        <button class="toast-close" @click="toastStore.hideToast">
          &times; <!-- 닫기 버튼 ('x 기호') -->
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  max-width: 350px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.toast-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast-message {
  font-size: 14px;
  flex-grow: 1;
}

.toast-close {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  line-height: 1;
}

.toast-success {
  background-color: #D2F3FF;
  color: #3D8CA9;
  border: 1px solid #c3e6cb;
}

.toast-error {
  background-color: #FFD5CF;
  color: #A9483D;
  border: 1px solid #f5c6cb;
}

.toast-info {
  background-color: #FFFCD2;
  color: #A3A431;
  border: 1px solid #bee5eb;
}

/* transition 스타일 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
