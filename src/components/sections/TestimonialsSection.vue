<template>
  <section class="section-container testimonial-shell">
    <div class="testimonial-orb orb-a"></div>
    <div class="testimonial-orb orb-b"></div>

    <div class="section-head relative z-10">
      <span class="section-kicker testimonial-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-3">
      <article
        v-for="testimonial in testimonials"
        :key="testimonial.id || testimonial.name"
        class="testimonial-card group relative overflow-hidden p-7"
      >
        <div class="testimonial-bubble bubble-1"></div>
        <div class="testimonial-bubble bubble-2"></div>

        <div class="relative">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex text-amber-400">
              <i v-for="star in 5" :key="star" class="fas fa-star text-xs"></i>
            </div>
            <i class="fas fa-quote-right text-rose-300"></i>
          </div>

          <p class="mb-6 text-slate-600 italic leading-7">{{ testimonial.content }}</p>

          <div class="border-t border-rose-100 pt-4">
            <h4 class="font-bold text-slate-900">{{ testimonial.name }}</h4>
            <p class="text-sm text-slate-500">{{ testimonial.role }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

/* global defineProps */
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

const baseSection = {
  badge: 'Testimoni',
  title: 'Apa Kata Pasien Kami',
  subtitle: 'Cerita pasien setelah perawatan di klinik.',
};

const sectionState = ref({ ...baseSection });
const testimonials = ref([]);

const fallbackTestimonials = [
  { id: 1, name: 'Nadia', role: 'Pasien Whitening', content: '"Dokternya ramah dan hasilnya memuaskan."' },
];

const getCachedHomeData = () => {
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const parse = (d) => {
  if (!d) return null;
  if (typeof d === 'string') {
    try {
      return JSON.parse(d);
    } catch {
      return null;
    }
  }
  return d;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const stripHtml = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') return String(html);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const formatContent = (content) => {
  const text = stripHtml(content).trim();
  return text ? `"${text}"` : '""';
};

const applyContentFromProps = () => {
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || getCachedHomeData() || {};
  const getField = (obj, k1, k2) => (obj ? obj[k1] || obj[k2] || '' : '');
  const badgeObj = getItemByTag('testimoni_badge25', source)[0] || {};
  const titleObj = getItemByTag('testimoni_title25', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(titleObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(titleObj, 'content', 'subtitle') || baseSection.subtitle,
  };
};

const fetchTestimonials = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.testimonials);
    const data = response?.data?.data || response?.data || [];
    testimonials.value = (Array.isArray(data) ? data : []).map(item => ({
      id: item.id,
      name: item.author_name || item.title || 'Anonim',
      role: item.author_position || item.excerpt || '',
      content: formatContent(item.content || ''),
    }));
    if (!testimonials.value.length) testimonials.value = fallbackTestimonials;
  } catch {
    testimonials.value = fallbackTestimonials;
  }
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => {
  applyContentFromProps();
  fetchTestimonials();
});
</script>

<style scoped>
.testimonial-shell {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid rgba(244, 114, 182, 0.2);
  background: linear-gradient(180deg, rgba(255, 245, 247, 0.95), rgba(255, 255, 255, 0.98));
}

.testimonial-kicker {
  border-color: rgba(244, 114, 182, 0.3);
  background: rgba(255, 241, 242, 0.88);
  color: #be123c;
}

.testimonial-orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(251, 113, 133, 0.28), rgba(251, 113, 133, 0));
}

.orb-a {
  left: -3rem;
  top: -2.5rem;
  height: 9rem;
  width: 9rem;
}

.orb-b {
  right: -2rem;
  bottom: -2rem;
  height: 8rem;
  width: 8rem;
}

.testimonial-card {
  border-radius: 1.5rem;
  border: 1px solid rgba(244, 114, 182, 0.2);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.97), rgba(255, 241, 242, 0.72));
  box-shadow: 0 20px 35px -28px rgba(190, 24, 93, 0.25);
}

.testimonial-card:hover {
  transform: translateY(-4px);
  transition: transform 200ms ease;
}

.testimonial-bubble {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.bubble-1 {
  right: 1rem;
  top: 1rem;
  height: 0.9rem;
  width: 0.9rem;
  background: rgba(251, 113, 133, 0.22);
}

.bubble-2 {
  right: 2.2rem;
  top: 1.7rem;
  height: 0.5rem;
  width: 0.5rem;
  background: rgba(244, 114, 182, 0.26);
}
</style>
