<template>
  <header class="navbar-shell sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
      <router-link to="/" class="flex items-center gap-3">
        <img v-if="showLogo" :src="logo" alt="Logo" class="h-10 w-10 rounded object-contain" @error="logoError = true" />
        <span class="text-lg font-bold text-slate-900">{{ siteTitle }}</span>
      </router-link>

      <button class="navbar-toggle rounded-lg border px-3 py-2 md:hidden" @click="isOpen = !isOpen">
        <i class="fa-solid fa-bars"></i>
      </button>

      <ul class="hidden items-center gap-2 md:flex">
        <li v-for="item in menus" :key="item.id">
          <router-link :to="getMenuTo(item)" :target="item.target" class="muted-link">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>

    <div v-if="isOpen" class="mobile-panel border-t border-slate-200 px-4 py-3 md:hidden">
      <router-link
        v-for="item in menus"
        :key="`mobile-${item.id}`"
        :to="getMenuTo(item)"
        :target="item.target"
        class="mobile-link block py-2"
        @click="isOpen = false"
      >
        {{ item.title }}
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import API_ENDPOINTS, { API_URL } from '@/config/api';

/* global defineProps */
const props = defineProps({
  settings: { type: Object, default: () => ({}) },
  menuItems: { type: Array, default: () => [] },
});

const isOpen = ref(false);
const logo = ref('');
const logoError = ref(false);
const menus = ref([]);

const siteTitle = computed(() => (
  props.settings?.site_title ||
  props.settings?.siteTitle ||
  props.settings?.title ||
  'Company Profile'
));
const showLogo = computed(() => Boolean(logo.value) && !logoError.value);

const defaultMenuItems = [
  { id: 1, title: 'Home', path: '/', target: '_self', parent_id: null },
  { id: 2, title: 'Listing', path: '/listing', target: '_self', parent_id: null },
  { id: 3, title: 'About', path: '#about', target: '_self', parent_id: null },
  { id: 4, title: 'Contact', path: '/contact', target: '_self', parent_id: null },
  { id: 5, title: 'Help', path: '/help', target: '_self', parent_id: null },
];

const getMenuTo = (item) => {
  const rawPath = (item?.path || '/').trim();

  if (rawPath === '/') {
    return '#/';
  }

  if (rawPath.startsWith('#') && !rawPath.startsWith('#/')) {
    return { path: '/', hash: rawPath };
  }

  return rawPath;
};

const joinUrl = (base, path) => {
  if (!path) return base;
  const cleanBase = String(base || '').replace(/\/$/, '');
  const cleanPath = String(path).replace(/^\//, '');
  return `${cleanBase}/${cleanPath}`;
};

const fetchLogo = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.settingLogo);
    const raw = res?.data?.data || res?.data || {};
    const candidate = raw.logo || raw.icon || raw.value;
    logoError.value = false;
    if (candidate) {
      logo.value = /^https?:\/\//i.test(candidate) ? candidate : joinUrl(API_URL, candidate);
    } else {
      logo.value = '';
    }
  } catch (error) {
    console.warn('Failed to fetch logo, using settings', error);
    logoError.value = false;
    logo.value = props.settings?.logo || '';
  }
};

const fetchMenu = async () => {
  try {
    const menuGroup = window.MENU_GROUP_SLUG || 'main';
    const response = await axios.get(API_ENDPOINTS.menuListByGroup(menuGroup));
    const items = response?.data?.data || response?.data || [];

    if (items.length > 0) {
      menus.value = [...items]
        .sort((a, b) => {
          const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
          const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          const idA = Number.isFinite(Number(a?.id)) ? Number(a.id) : Number.MAX_SAFE_INTEGER;
          const idB = Number.isFinite(Number(b?.id)) ? Number(b.id) : Number.MAX_SAFE_INTEGER;
          return idA - idB;
        })
        .map((item) => ({
          id: item.id,
          title: item.title || item.label || item.name || 'Tanpa Judul',
          path: item.path || item.url || item.link || '/',
          target: item.target || (item.open_in_new_tab ? '_blank' : '_self'),
          parent_id: item.parent_id || null,
          order: item.order,
        }));
    } else {
      menus.value = defaultMenuItems;
    }
  } catch (error) {
    console.warn('Failed to fetch menu, using defaults', error);
    menus.value = defaultMenuItems;
  }
};

onMounted(() => {
  fetchLogo();
  fetchMenu();
});
</script>

<style scoped>
.navbar-shell {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.9)),
    linear-gradient(90deg, rgba(219, 234, 254, 0.34), rgba(186, 230, 253, 0.2));
  box-shadow: 0 12px 28px -24px rgba(30, 64, 175, 0.35);
}

.navbar-toggle {
  border-color: rgba(148, 163, 184, 0.45);
  color: #1e3a8a;
  background: rgba(255, 255, 255, 0.92);
}

.navbar-toggle:hover {
  border-color: rgba(37, 99, 235, 0.55);
  color: #1d4ed8;
}

.muted-link {
  display: inline-flex;
  border-radius: 0.7rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #334155;
  transition: background-color 160ms ease, color 160ms ease;
}

.muted-link:hover {
  color: #1d4ed8;
  background: rgba(219, 234, 254, 0.62);
}

.mobile-panel {
  background: rgba(255, 255, 255, 0.95);
}

.mobile-link {
  border-radius: 0.65rem;
  color: #334155;
  font-weight: 600;
  padding-left: 0.65rem;
  padding-right: 0.65rem;
}

.mobile-link:hover {
  color: #1d4ed8;
  background: rgba(219, 234, 254, 0.58);
}
</style>
