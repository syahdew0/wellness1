<template>
  <main class="page-shell">
    <section class="page-section">
      <div class="page-panel">
        <h1 class="text-3xl font-bold">{{ detail?.post?.title || 'Detail Layanan' }}</h1>
        <p class="mt-3 text-slate-600">{{ detail?.post?.content }}</p>

        <div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <img
            v-for="(img, i) in gallery"
            :key="i"
            :src="img"
            class="h-28 w-full rounded-lg object-cover"
            alt="Gallery"
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const route = useRoute();
const detail = ref(null);

const normalizeGallery = (raw) => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw
      .filter(Boolean)
      .map((item) => (typeof item === 'string' ? item : item?.url || item?.src || ''))
      .filter(Boolean);
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return normalizeGallery(parsed);
    } catch (err) {
      // Fallback: treat string as single/comma-separated URL list.
    }

    return raw
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [];
};

const gallery = computed(() => normalizeGallery(detail.value?.post?.gallery));

const fetchDetail = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.listingDetail(route.params.id));
    detail.value = res?.data?.data || res?.data || null;
  } catch {
    detail.value = null;
  }
};

onMounted(() => fetchDetail());
</script>
