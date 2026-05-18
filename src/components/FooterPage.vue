<template>
  <footer class="footer-shell relative overflow-hidden border-t border-rose-200/40">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-20 top-8 h-56 w-56 rounded-full bg-rose-300/20 blur-3xl"></div>
      <div class="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl"></div>
    </div>

    <div class="section-container relative py-12">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <h3 class="text-xl font-bold text-slate-900">{{ siteTitle }}</h3>
          <p class="mt-2 text-sm text-slate-600">{{ siteDescription }}</p>
          <div class="mt-4 flex items-center gap-3 text-slate-600">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noreferrer"
              class="social-link"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-semibold text-slate-900">Menu</h4>
          <ul class="mt-2 space-y-2 text-sm">
            <li v-for="m in footerMenus" :key="m.id">
              <router-link :to="m.path" class="muted-link">{{ m.title }}</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-slate-900">Kontak</h4>
          <p class="mt-2 text-sm text-slate-600">{{ contactAddress }}</p>
          <p class="text-sm text-slate-600">{{ contactPhone }}</p>
          <p class="text-sm text-slate-600">{{ contactEmail }}</p>
        </div>
      </div>
      <p class="mt-8 border-t border-rose-200/60 pt-5 text-xs text-slate-500">© {{ year }} {{ siteTitle }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

/* global defineProps */
const props = defineProps({
  settings: { type: Object, default: () => ({}) },
});

const footerMenus = ref([]);
const year = new Date().getFullYear();

const siteTitle = computed(() => props.settings?.site_title || 'Company Profile');
const siteDescription = computed(() => props.settings?.site_description || 'Partner tepercaya untuk solusi bisnis, strategi pertumbuhan, dan eksekusi proyek yang berdampak.');
const contactAddress = computed(() => props.settings?.contact_address || props.settings?.address || 'Jakarta, Indonesia');
const contactPhone = computed(() => props.settings?.contact_phone || props.settings?.phone || '+62 123 4567 890');
const contactEmail = computed(() => props.settings?.contact_email || props.settings?.email || 'hello@companyprofile.com');

const socialLinks = ref([
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
  { name: 'YouTube', icon: 'fab fa-youtube', url: '#' },
]);

const defaultFooterMenus = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Listing', path: '/listing' },
  { id: 3, title: 'Contact', path: '/contact' },
  { id: 4, title: 'Help', path: '/help' },
];

const fetchFooter = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.FOOTER_MENU);
    const items = res?.data?.data || res?.data || [];

    if (items.length > 0) {
      footerMenus.value = items.map((item) => ({
        id: item.id,
        title: item.title || item.label || item.name || 'Menu',
        path: item.path || item.url || item.link || '/',
      }));
    } else {
      footerMenus.value = defaultFooterMenus;
    }
  } catch (error) {
    console.warn('Failed to fetch footer menu, using defaults', error);
    footerMenus.value = defaultFooterMenus;
  }
};

onMounted(fetchFooter);
</script>

<style scoped>
.footer-shell {
  background:
    linear-gradient(180deg, rgba(255, 250, 252, 0.96), rgba(255, 247, 250, 0.94)),
    linear-gradient(90deg, rgba(251, 113, 133, 0.14), rgba(244, 114, 182, 0.12));
}

.muted-link {
  color: #475569;
  transition: color 150ms ease;
}

.muted-link:hover {
  color: #e11d48;
}

.social-link {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(244, 114, 182, 0.35);
  background: rgba(251, 113, 133, 0.08);
  color: #e11d48;
  transition: all 150ms ease;
}

.social-link:hover {
  border-color: rgba(225, 29, 72, 0.6);
  background: rgba(251, 113, 133, 0.18);
  color: #be123c;
}
</style>
