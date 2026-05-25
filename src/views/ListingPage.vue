<template>
  <div class="page-shell">
    <div class="page-hero">
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
        <h1 class="page-hero-title">Solusi & Layanan</h1>
        <p class="page-hero-subtitle">Temukan berbagai layanan dan studi kasus yang kami kerjakan</p>
      </div>
    </div>

    <div class="page-section">
      <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input v-model="searchQuery" type="text" placeholder="Cari layanan..." class="surface-input" />
        <select v-model="selectedCategory" class="surface-select">
          <option :value="null">Semua Kategori</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <select v-model="sortBy" class="surface-select">
          <option value="newest">Terbaru</option>
          <option value="impact-high">Dampak Tertinggi</option>
          <option value="duration-fast">Durasi Tercepat</option>
        </select>
      </div>

      <div class="mb-8 flex flex-wrap gap-2">
        <button
          @click="selectedCategory = null"
          :class="['rounded-full border px-4 py-2 text-sm font-semibold transition-all', !selectedCategory ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-500']"
        >
          Semua
        </button>
        <button
          v-for="cat in categories"
          :key="'pill-' + cat.id"
          @click="selectedCategory = cat.id"
          :class="['rounded-full border px-4 py-2 text-sm font-semibold transition-all', selectedCategory === cat.id ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-500']"
        >
          {{ cat.name }}
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="listing in paginatedListings"
          :key="listing.post_id"
          class="group card cursor-pointer overflow-hidden"
          @click="$router.push(`/listing/${listing.post_id}`)"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80'"
              :alt="listing.post?.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"></div>
            <div class="chip-price absolute right-4 top-4">{{ formatPrice(listing.price) }}</div>
          </div>
          <div class="p-6">
            <h3 class="mb-2 line-clamp-2 text-lg font-bold text-slate-900">{{ listing.post?.title }}</h3>
            <p class="mb-3 line-clamp-2 text-sm text-slate-600">{{ listing.post?.excerpt }}</p>
            <div class="flex items-center text-sm text-slate-500">
              <i class="fas fa-map-marker-alt mr-2 text-teal-700"></i>
              {{ listing.kabupaten }}, {{ listing.provinsi }}
            </div>
          </div>
        </article>
      </div>

      <div v-if="!paginatedListings.length && !isLoading" class="py-20 text-center">
        <i class="fas fa-search mb-4 text-4xl text-slate-300"></i>
        <p class="text-lg text-slate-500">Tidak ada data ditemukan</p>
      </div>

      <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="page-pagination-btn">
          &laquo;
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="['page-pagination-btn', currentPage === page && 'page-pagination-btn-active']"
        >
          {{ page }}
        </button>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="page-pagination-btn">
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const listings = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const sortBy = ref('newest');
const currentPage = ref(1);
const perPage = 9;
const isLoading = ref(true);

const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const getValueByTags = (listing, tags) => {
  const values = listing?.values || [];
  const row = values.find(item => tags.includes((item?.tag_name || '').toLowerCase()));
  return row?.value ?? '';
};

const toNumber = raw => {
  if (raw === null || raw === undefined) return 0;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0;
  const normalized = String(raw).replace(',', '.');
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const getImpactScore = listing => {
  const fromTags = getValueByTags(listing, ['impact', 'dampak', 'impact_score', 'dampak_utama', 'hasil']);
  const fromPrice = toNumber(listing?.price);
  return toNumber(fromTags) || fromPrice || 0;
};

const getDurationInDays = listing => {
  const durationRaw = getValueByTags(listing, ['durasi', 'duration', 'project_duration', 'lama_proyek']);
  if (!durationRaw) return Number.MAX_SAFE_INTEGER;
  const value = toNumber(durationRaw);
  const text = String(durationRaw).toLowerCase();
  if (!value) return Number.MAX_SAFE_INTEGER;
  if (text.includes('tahun')) return value * 365;
  if (text.includes('minggu')) return value * 7;
  if (text.includes('hari')) return value;
  return value * 30;
};

const filteredListings = computed(() => {
  let result = [...listings.value];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      l => (l.post?.title || '').toLowerCase().includes(q) || (l.post?.excerpt || '').toLowerCase().includes(q)
    );
  }
  if (selectedCategory.value) {
    result = result.filter(l => l.post?.categories?.some(cat => cat.id === selectedCategory.value));
  }
  if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  } else if (sortBy.value === 'impact-high') {
    result.sort((a, b) => getImpactScore(b) - getImpactScore(a));
  } else if (sortBy.value === 'duration-fast') {
    result.sort((a, b) => getDurationInDays(a) - getDurationInDays(b));
  }
  return result;
});

const totalPages = computed(() => Math.ceil(filteredListings.value.length / perPage));
const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredListings.value.slice(start, start + perPage);
});

const formatPrice = price => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(API_ENDPOINTS.listings, { params: { listing_type: LISTING_TYPE } });
    const data = response?.data?.data || response?.data || [];
    listings.value = data.filter(l => l.listing_type === LISTING_TYPE);
    const categoriesMap = {};
    listings.value.forEach(listing => {
      (listing.post?.categories || []).forEach(cat => {
        if (cat.display_in === LISTING_DISPLAY_IN) {
          categoriesMap[cat.id] = { id: cat.id, name: cat.name, slug: cat.slug };
        }
      });
    });
    categories.value = Object.values(categoriesMap);
  } catch (error) {
    console.error('Error fetching listings:', error);
  } finally {
    isLoading.value = false;
  }
};

watch([searchQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1;
});

onMounted(() => {
  fetchData();
});
</script>
