<template>
  <div class="page-shell">
    <div class="page-hero">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <router-link to="/listing" class="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700">
          <i class="fas fa-arrow-left"></i> Kembali
        </router-link>
        <h1 class="page-hero-title">{{ listing?.post?.title || 'Detail' }}</h1>
      </div>
    </div>

    <div class="page-section">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div class="overflow-hidden rounded-3xl border border-teal-100">
            <img
              :src="activeImage || listing?.post?.thumbnail_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'"
              :alt="listing?.post?.title"
              class="h-[420px] w-full object-cover"
            />
          </div>
          <div v-if="gallery.length > 1" class="mt-4 grid grid-cols-4 gap-3">
            <div
              v-for="(img, idx) in gallery"
              :key="idx"
              @click="activeImage = img"
              :class="['cursor-pointer overflow-hidden rounded-xl border-2 transition-all', activeImage === img ? 'border-teal-600' : 'border-transparent opacity-70 hover:opacity-100']"
            >
              <img :src="img" :alt="'Gallery ' + idx" class="h-20 w-full object-cover" />
            </div>
          </div>
        </div>

        <div>
          <div class="page-panel">
            <div class="chip-price mb-4 inline-block">{{ formatPrice(listing?.price) }}</div>
            <h2 class="text-2xl font-bold text-slate-900">{{ listing?.post?.title }}</h2>
            <p class="mt-2 text-slate-600">{{ listing?.post?.excerpt }}</p>

            <div class="mt-6 space-y-3">
              <div v-if="listing?.kabupaten" class="flex items-center gap-3 text-sm text-slate-600">
                <i class="fas fa-map-marker-alt text-teal-700"></i>
                <span>{{ listing.kabupaten }}, {{ listing.provinsi }}</span>
              </div>
              <div v-if="listing?.kecamatan" class="flex items-center gap-3 text-sm text-slate-600">
                <i class="fas fa-location-dot text-teal-700"></i>
                <span>{{ listing.kecamatan }}</span>
              </div>
            </div>

            <div v-if="listing?.values?.length" class="mt-6 grid grid-cols-2 gap-3">
              <div v-for="val in listing.values" :key="val.tag_name" class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-xs text-slate-500">{{ val.tag_name }}</p>
                <p class="font-semibold text-slate-900">{{ val.value }}</p>
              </div>
            </div>

            <div v-if="listing?.post?.categories?.length" class="mt-6 flex flex-wrap gap-2">
              <span v-for="cat in listing.post.categories" :key="cat.id" class="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                {{ cat.name }}
              </span>
            </div>

            <router-link to="/contact" class="btn-primary mt-8 w-full justify-center">
              Hubungi Kami <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="listing?.post?.content" class="page-panel mt-10">
        <h3 class="mb-4 text-xl font-bold text-slate-900">Deskripsi</h3>
        <div class="prose max-w-none text-slate-600" v-html="listing.post.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const route = useRoute();
const listing = ref(null);
const gallery = ref([]);
const activeImage = ref('');

const normalizeGallery = raw => {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter(Boolean)
      .map(item => (typeof item === 'string' ? item : item?.url || item?.src || ''))
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return normalizeGallery(parsed);
    } catch (err) {
      // treat as single URL / comma-separated list
    }
    return raw
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
};

const formatPrice = price => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const fetchDetail = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(API_ENDPOINTS.listingDetail(id));
    const data = response?.data?.data || response?.data || {};
    listing.value = data;
    const galleryRaw = data?.post?.gallery || data?.gallery || [];
    gallery.value = normalizeGallery(galleryRaw);
    if (data?.post?.thumbnail_url) gallery.value.unshift(data.post.thumbnail_url);
    gallery.value = [...new Set(gallery.value)];
    activeImage.value = gallery.value[0] || data?.post?.thumbnail_url || '';
  } catch (error) {
    console.error('Error fetching detail:', error);
  }
};

onMounted(() => {
  fetchDetail();
});
</script>
