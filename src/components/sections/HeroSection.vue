<template>
  <section class="hero-shell">
    <div class="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:px-8 lg:px-10 lg:pb-14 lg:pt-10">
      <div class="hero-panel relative overflow-hidden rounded-[2rem]">
        <div class="hero-fade absolute inset-0"></div>
        <div class="hero-hills absolute inset-x-0 bottom-0 h-44 sm:h-56 md:h-64"></div>
        <div class="hero-grid absolute inset-y-0 right-0 hidden w-[42%] xl:block"></div>
        <div class="hero-orb hero-orb-one absolute -left-6 top-10 h-16 w-16 rounded-full"></div>
        <div class="hero-orb hero-orb-two absolute left-1/3 top-6 h-10 w-10 rounded-full"></div>
        <div class="hero-orb hero-orb-three absolute right-10 top-24 h-14 w-14 rounded-full"></div>
        <div class="hero-orb hero-orb-four absolute bottom-20 left-12 h-8 w-8 rounded-full"></div>

        <div class="hero-content relative px-5 py-12 sm:px-8 sm:py-16 md:py-20">
          <div class="grid items-start gap-10 xl:grid-cols-[0.96fr_1.04fr]">
            <div class="hero-showcase order-1 relative pb-10 xl:order-1 xl:pb-16">
              <div class="hero-image-frame rounded-[1.75rem] p-3">
                <div class="relative overflow-hidden rounded-[1.35rem] border border-white/50">
                  <img
                    :src="sectionState.image"
                    :alt="sectionState.imageTitle"
                    class="h-[360px] w-full object-cover md:h-[460px]"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent"></div>
                  <div class="absolute left-5 top-5 rounded-full border border-white/55 bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 backdrop-blur-sm">
                    {{ sectionState.badge }}
                  </div>
                  <div class="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/55 bg-white/80 p-5 backdrop-blur-md">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Dental Spotlight</p>
                    <h3 class="mt-2 text-2xl font-semibold text-slate-900">{{ sectionState.imageTitle }}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600">{{ sectionState.highlight }}</p>
                  </div>
                </div>
              </div>

              <div class="hero-floating-card absolute -bottom-4 right-4 hidden rounded-2xl border border-rose-100 bg-white/25 p-4 shadow-2xl shadow-rose-900/10 backdrop-blur-md xl:block">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{{ sectionState.tagTitle }}</p>
                <p class="mt-2 text-sm text-slate-600">{{ sectionState.tagDescription }}</p>
              </div>
            </div>

            <div class="order-2 max-w-3xl xl:order-2 xl:pt-6">
              <p class="hero-badge text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm">
                {{ sectionState.badge }}
              </p>

              <h1 class="hero-title mt-4 text-4xl leading-[1.02] text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                {{ sectionState.title }}
              </h1>

              <p class="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-200/90 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700 sm:text-sm">
                <i class="fas fa-tooth"></i>
                {{ sectionState.highlight }}
              </p>

              <p class="mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg">
                {{ sectionState.subtitle }}
              </p>

              <div class="mt-8 flex flex-wrap gap-3">
                <router-link :to="sectionState.primaryButton.link" class="btn-primary">
                  {{ sectionState.primaryButton.text }}
                </router-link>
                <router-link :to="sectionState.secondaryButton.link" class="btn-secondary">
                  {{ sectionState.secondaryButton.text }}
                </router-link>
              </div>

              <div class="hero-security mt-6 inline-flex items-center gap-3 rounded-xl px-4 py-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/40 bg-white text-rose-700">
                  <i class="fas fa-user-doctor"></i>
                </div>
                <p class="text-xs font-semibold text-slate-800 sm:text-sm">{{ securityLabel }}</p>
              </div>

              <div class="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
                <div
                  v-for="(attr, index) in sectionState.attributes"
                  :key="index"
                  class="hero-attr-chip rounded-xl border px-3 py-3 text-left text-xs font-semibold text-slate-700"
                >
                  <span class="block text-lg font-bold text-slate-900">{{ attr.value }}</span>
                  <span class="mt-1 block">{{ attr.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const baseSection = {
  badge: 'Klik Dokter Gigi',
  title: 'Perawatan Gigi Nyaman untuk Seluruh Keluarga',
  highlight: 'Senyum Sehat, Senyum Percaya Diri',
  subtitle:
    'Kami menghadirkan layanan perawatan gigi profesional dengan teknologi modern dan tim dokter berpengalaman untuk seluruh keluarga.',
  primaryButton: { text: 'Lihat Layanan', link: '/#services' },
  secondaryButton: { text: 'Reservasi Sekarang', link: '/contact' },

  image:
    'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1800&q=80',

  imageTitle: 'Ruang Perawatan Steril & Modern',

  tagTitle: 'Dokter Gigi Berpengalaman',
  tagDescription:
    'Didukung protokol sterilisasi ketat, konsultasi ramah, dan tindakan yang presisi untuk setiap pasien.',

  attributes: [
    { value: '15+', label: 'Dokter & Tim Medis' },
    { value: '5.000+', label: 'Pasien Tertangani' },
    { value: '24/7', label: 'Dukungan Reservasi' },
  ],
};

const sectionState = ref({ ...baseSection });
const securityLabel = 'Sterilisasi Alat Sesuai Standar Medis';

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Failed to read cached home data', error);
    return null;
  }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
  }
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
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  const badgeObj = getItemByTag('home_badge25', source)[0] || {};
  const mainObj = getItemByTag('home_main25', source)[0] || {};
  const primaryBtnObj = getItemByTag('home_buttonDaftar25', source)[0] || {};
  const secondaryBtnObj = getItemByTag('home_buttonKonsul25', source)[0] || {};
  const imageTitleObj = getItemByTag('home_image_title25', source)[0] || {};
  const tagObj = getItemByTag('home_tag25', source)[0] || {};
  const atributObjs = getItemByTag('home_atribut25', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    highlight: getField(mainObj, 'highlight', 'subtitle') || baseSection.highlight,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    primaryButton: {
      text: getField(primaryBtnObj, 'title', 'text') || baseSection.primaryButton.text,
      link: getField(primaryBtnObj, 'link', 'url') || baseSection.primaryButton.link,
    },
    secondaryButton: {
      text: getField(secondaryBtnObj, 'title', 'text') || baseSection.secondaryButton.text,
      link: getField(secondaryBtnObj, 'link', 'url') || baseSection.secondaryButton.link,
    },
    image: getField(imageTitleObj, 'image', 'url') || baseSection.image,
    imageTitle: getField(imageTitleObj, 'title', 'text') || baseSection.imageTitle,
    tagTitle: getField(tagObj, 'title', 'text') || baseSection.tagTitle,
    tagDescription: getField(tagObj, 'content', 'description') || baseSection.tagDescription,
    attributes: atributObjs.length > 0
      ? atributObjs.map(attr => ({
          value: getField(attr, 'title', 'value'),
          label: getField(attr, 'content', 'label'),
        }))
      : baseSection.attributes,
  };
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
});
</script>

<style scoped>
.hero-shell {
  min-height: auto;
  background: transparent;
}

.hero-panel {
  background-color: #ffffff;
  border: 1px solid rgba(244, 114, 182, 0.24);
  box-shadow: 0 28px 64px -42px rgba(225, 29, 72, 0.2);
}

.hero-fade {
  background-color: #ffffff;
}

.hero-hills {
  background:
    radial-gradient(60% 120% at 8% 100%, rgba(15, 23, 42, 0.18), transparent 66%),
    radial-gradient(52% 100% at 36% 100%, rgba(15, 23, 42, 0.14), transparent 68%),
    radial-gradient(48% 92% at 70% 100%, rgba(15, 23, 42, 0.16), transparent 70%),
    radial-gradient(42% 86% at 96% 100%, rgba(15, 23, 42, 0.14), transparent 72%);
  opacity: 0.45;
}

.hero-grid {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.24)),
    linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: auto, 28px 28px, 28px 28px;
  mask-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.85));
}

.hero-badge {
  color: #be123c;
}

.hero-title {
  font-family: 'Outfit', 'Manrope', sans-serif;
  letter-spacing: -0.03em;
}

.hero-image-frame {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(254, 205, 211, 0.45));
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 28px 60px -34px rgba(225, 29, 72, 0.24);
}

.hero-security {
  border: 1px solid rgba(244, 114, 182, 0.26);
  background: rgba(255, 255, 255, 0.86);
}

.hero-attr-chip {
  border-color: rgba(244, 114, 182, 0.24);
  background: rgba(255, 255, 255, 0.82);
}

.hero-floating-card {
  max-width: 260px;
}

.hero-orb {
  pointer-events: none;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(251, 113, 133, 0.22));
  border: 1px solid rgba(244, 114, 182, 0.24);
  box-shadow: 0 12px 24px -14px rgba(225, 29, 72, 0.4);
}

.hero-orb-one { opacity: 0.8; }
.hero-orb-two { opacity: 0.55; }
.hero-orb-three { opacity: 0.7; }
.hero-orb-four { opacity: 0.6; }
</style>
