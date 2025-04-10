<script setup>
import Sidebar from './components/layout/Sidebar.vue';
import Header from './components/layout/Header.vue';
// import {onMounted} from 'vue';

// const useUserStore from '@/store/'

// onMounted(() => {
//   useUserStore.initializeStore();
// });
</script>

<template>
  <div class="container">
    <!-- Sidebar 컴포넌트 -->
    <Sidebar />
    <!-- Main Content -->
    <main class="main-content">
      <!-- Header 컴포넌트-->
      <Header />
      <!-- Blue Banner -->
      <section class="banner"></section>
      <!-- White Content Box -->
      <section class="content-box">
        <router-view />
      </section>
    </main>
  </div>
</template>
