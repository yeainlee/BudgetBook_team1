import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const message = ref(''); // 토스트 메시지를 저장하는 변수, 기본값은 빈 문자열
  const type = ref('success'); // 토스트 알림의 타입을 저장(success, error, info 등의 타입), 기본값은 success
  const isVisible = ref(false); // 토스트가 화면에 표시될지 여부를 나타냄, 기본값은 false
  let timer = null; // 토스트 메시지의 표시 시간을 관리하기 위한 변수로 setTimeout의 ID를 저장, 기본값은 null

  // 토스트 알림을 화면에 표시하고, 일정 시간 후에 자동으로 숨김
  const showToast = (newMessage, newType = 'success', duration = 2000) => {
    // 기존 타이머가 존재한다면, clearTimeout을 호출하여 이전 타이머 취소
    if (timer) {
      clearTimeout(timer);
    }

    // 상태 업데이트
    message.value = newMessage;
    console.log('toastStore.message :' + message.value);
    type.value = newType;
    isVisible.value = true;

    // 자동으로 사라지도록 타이머 설정
    timer = setTimeout(() => {
      isVisible.value = false;
      timer = null;
    }, duration);
  };

  // 사용자가 수동으로 알림을 닫을 수 있게 함 ()
  const hideToast = () => {
    isVisible.value = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return {
    message,
    type,
    isVisible,
    showToast,
    hideToast,
  };
});
