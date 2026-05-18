<template>
  <div id="app" class="min-h-screen">
    <NavbarApp :settings="siteInfo" :menuItems="menuItems" />
    <router-view :pageData="pageData" />
    <FooterPage :settings="siteInfo" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import NavbarApp from './components/NavbarApp.vue';
import FooterPage from './components/FooterPage.vue';

const siteInfo = inject('siteInfo', {});
const menuItems = ref([]);
const pageData = ref({});

onMounted(() => {});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
