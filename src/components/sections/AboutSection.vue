<template>
  <section class="section-container">
    <div class="about-shell relative overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12">
      <div class="about-orb orb-a"></div>
      <div class="about-orb orb-b"></div>
      <div class="about-orb orb-c"></div>
      <div class="relative">
        <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span class="section-kicker">{{ sectionState.badge }}</span>
            <div class="about-divider mt-3 mb-6"></div>
            <h2 class="about-title max-w-2xl text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              {{ sectionState.title }}
            </h2>
          </div>
          <p class="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            {{ sectionState.content }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div class="order-2 xl:order-1">
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="(attr, index) in sectionState.attributes"
                :key="index"
                class="about-feature-card p-5"
              >
                <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
                  <i class="fas fa-circle-notch text-sm"></i>
                </div>
                <h4 class="font-medium text-slate-900">{{ attr.title }}</h4>
                <p class="mt-1 text-sm leading-6 text-slate-500">{{ attr.content }}</p>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-3 gap-3">
              <div
                v-for="(attr, index) in sectionState.attributes.slice(0,3)"
                :key="'stat-' + index"
                class="about-stat-chip rounded-2xl px-4 py-4"
              >
                <p class="about-stat-val text-2xl font-semibold">{{ attr.value }}</p>
                <p class="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">{{ attr.label }}</p>
              </div>
            </div>
          </div>

          <div class="order-1 xl:order-2">
            <div class="about-image-wrap relative overflow-hidden rounded-[2rem]">
              <img
                :src="sectionState.image"
                :alt="sectionState.title"
                class="h-[360px] w-full object-cover md:h-[480px]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent"></div>
              <div class="absolute left-4 top-4 rounded-full border border-white/60 bg-white/88 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-700 backdrop-blur-md">
                About Us
              </div>
              <div class="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/60 bg-white/88 p-5 backdrop-blur-md">
                <p class="text-[10px] font-medium uppercase tracking-[0.24em] text-rose-700">Core Value</p>
                <p class="mt-2 text-lg font-semibold text-slate-900">Integrity, Innovation, Impact</p>
                <p class="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  Pendekatan kerja yang rapi, kolaboratif, dan dibangun untuk hasil bisnis yang relevan.
                </p>
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
  badge: 'Klinik Gigi Profesional',

  title: 'Partner Terbaik untuk Kesehatan & Senyum Anda',

  content:
    'Kami adalah klinik gigi profesional yang menghadirkan layanan perawatan modern untuk seluruh keluarga. Dengan dokter gigi berpengalaman, teknologi terkini, dan pelayanan yang nyaman, kami membantu menjaga kesehatan gigi serta meningkatkan rasa percaya diri setiap pasien.',

  image:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=80',

  attributes: [
    {
      title: 'Pelayanan Profesional',
      content: 'Ditangani langsung oleh dokter gigi berpengalaman dan terpercaya',
    },
    {
      title: 'Teknologi Modern',
      content: 'Menggunakan peralatan terkini untuk hasil perawatan yang optimal',
    },
    {
      title: 'Nyaman & Ramah',
      content: 'Suasana klinik nyaman dengan pelayanan yang peduli pada pasien',
    },
    {
      title: 'Fokus pada Kesehatan',
      content: 'Berorientasi pada kesehatan gigi jangka panjang dan senyum terbaik',
    },
  ],
};

const sectionState = ref({ ...baseSection });

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

  const badgeObj = getItemByTag('about_badge25', source)[0] || {};
  const mainObj = getItemByTag('about_main25', source)[0] || {};
  const atributObjs = getItemByTag('about_atribut25', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    content: getField(mainObj, 'content', 'subtitle') || baseSection.content,
    image: getField(mainObj, 'image', 'url') || baseSection.image,
    attributes: atributObjs.length > 0
      ? atributObjs.map((attr, index) => ({
          title: getField(attr, 'title', 'name'),
          content: getField(attr, 'content', 'description'),
          value: getField(attr, 'value', 'stat') || baseSection.attributes[index % baseSection.attributes.length].value,
          label: getField(attr, 'label', 'unit') || baseSection.attributes[index % baseSection.attributes.length].label,
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
.about-shell {
  background: var(--color-bg, #ffffff);
  border: 1px solid rgba(251, 113, 133, 0.22);
  box-shadow: 0 20px 60px -40px rgba(225, 29, 72, 0.18);
}

.about-orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(251, 113, 133, 0.26), rgba(251, 113, 133, 0));
}

.orb-a {
  left: -2.5rem;
  top: -2rem;
  height: 7.5rem;
  width: 7.5rem;
}

.orb-b {
  right: 8%;
  top: 12%;
  height: 1.2rem;
  width: 1.2rem;
  background: rgba(244, 114, 182, 0.28);
}

.orb-c {
  right: -2.5rem;
  bottom: -2rem;
  height: 8rem;
  width: 8rem;
}

.about-divider {
  width: 40px;
  height: 2px;
  background: #fb7185;
  border-radius: 2px;
}

.about-title {
  font-family: 'Playfair Display', 'Georgia', serif;
  letter-spacing: -0.02em;
}

.about-image-wrap {
  border: 1px solid rgba(251, 113, 133, 0.25);
}

.about-stat-chip {
  background: rgba(255, 241, 242, 0.9);
  border: 0.5px solid rgba(251, 113, 133, 0.22);
}

.about-stat-val {
  font-family: 'Playfair Display', 'Georgia', serif;
  color: #0f172a;
}

.about-feature-card {
  background: #ffffff;
  border: 0.5px solid rgba(251, 113, 133, 0.2);
  border-left: 2.5px solid #fb7185;
  border-radius: 0.875rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
