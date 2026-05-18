<template>
  <section class="section-container services-shell">
    <div class="section-head services-head">
      <span class="section-kicker services-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title services-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle services-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(service, index) in sectionState.items"
        :key="index"
        class="service-card group relative overflow-hidden p-7 md:p-8"
      >
        <div class="service-card-glow absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-80 transition-transform duration-500 group-hover:scale-125"></div>
        <div class="service-card-stripe absolute inset-x-0 top-0 h-1.5"></div>
        <div class="relative">
          <div class="service-icon-wrap mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
            <i :class="service.icon || 'fas fa-home'" class="text-2xl"></i>
          </div>
          <h3 class="mb-3 text-xl font-bold text-slate-900">{{ service.title }}</h3>
          <p class="service-content text-slate-600">{{ service.content }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const baseSection = {
  badge: 'Layanan Kami',

  title: 'Perawatan Gigi Profesional & Modern',

  subtitle:
    'Kami menyediakan berbagai layanan kesehatan gigi untuk membantu Anda mendapatkan senyum yang sehat, nyaman, dan percaya diri',

  items: [
    {
      icon: 'fas fa-tooth',
      title: 'Pemeriksaan Gigi',
      content:
        'Pemeriksaan menyeluruh untuk menjaga kesehatan gigi dan mendeteksi masalah sejak dini',
    },

    {
      icon: 'fas fa-teeth',
      title: 'Scaling & Pembersihan',
      content:
        'Membersihkan karang gigi dan menjaga kebersihan mulut agar tetap sehat dan segar',
    },

    {
      icon: 'fas fa-syringe',
      title: 'Tambal Gigi',
      content:
        'Perawatan gigi berlubang dengan material berkualitas untuk hasil yang nyaman dan tahan lama',
    },

    {
      icon: 'fas fa-smile',
      title: 'Pemutihan Gigi',
      content:
        'Perawatan whitening modern untuk membantu mendapatkan senyum yang lebih cerah',
    },

    {
      icon: 'fas fa-user-doctor',
      title: 'Konsultasi Dokter Gigi',
      content:
        'Diskusikan kebutuhan dan kondisi kesehatan gigi Anda bersama dokter berpengalaman',
    },

    {
      icon: 'fas fa-heart-pulse',
      title: 'Perawatan Berkelanjutan',
      content:
        'Pendampingan dan kontrol rutin untuk menjaga kesehatan gigi jangka panjang',
    },
  ],
};

const sectionState = ref({ ...baseSection });

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(HOME_STORAGE_KEY); return raw ? JSON.parse(raw) : null; }
  catch (error) { console.warn('Failed to read cached home data', error); return null; }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch (err) { return null; } }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || cached || {};
  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');
  const badgeObj = getItemByTag('service_badge25', source)[0] || {};
  const mainObj = getItemByTag('service_main25', source)[0] || {};
  const itemObjs = getItemByTag('service_item25', source);
  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({ icon: getField(item, 'icon', 'iconClass'), title: getField(item, 'title', 'name'), content: getField(item, 'content', 'description') }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.services-shell {
  position: relative;
  border-radius: 2rem;
  background:
    radial-gradient(140% 110% at -5% -10%, rgba(253, 164, 175, 0.24), transparent 45%),
    radial-gradient(120% 100% at 105% 115%, rgba(244, 114, 182, 0.18), transparent 48%),
    linear-gradient(180deg, rgba(255, 245, 247, 0.98), rgba(255, 255, 255, 0.98));
  border: 1px solid rgba(244, 114, 182, 0.2);
}

.services-head {
  max-width: 46rem;
  margin-inline: auto;
  text-align: center;
}

.services-kicker {
  display: inline-flex;
  border-radius: 9999px;
  border: 1px solid rgba(244, 114, 182, 0.28);
  background: rgba(255, 241, 242, 0.85);
  padding: 0.45rem 0.85rem;
}

.services-title {
  letter-spacing: -0.02em;
}

.services-subtitle {
  max-width: 38rem;
  margin-inline: auto;
}

.service-card {
  border: 1px solid rgba(244, 114, 182, 0.22);
  border-radius: 1.5rem;
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 241, 242, 0.92)),
    linear-gradient(180deg, rgba(251, 113, 133, 0.08), rgba(255, 255, 255, 0));
  box-shadow: 0 20px 38px -30px rgba(15, 23, 42, 0.5);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(225, 29, 72, 0.35);
  box-shadow: 0 30px 52px -34px rgba(190, 24, 93, 0.35);
}

.service-card-glow {
  background: radial-gradient(circle at center, rgba(251, 113, 133, 0.34), rgba(251, 113, 133, 0));
}

.service-card-stripe {
  background: linear-gradient(90deg, #e11d48 0%, #fb7185 52%, #f9a8d4 100%);
}

.service-icon-wrap {
  background: linear-gradient(135deg, #e11d48, #fb7185);
  box-shadow: 0 14px 28px -18px rgba(190, 24, 93, 0.7);
}

.service-content {
  line-height: 1.75;
}
</style>
