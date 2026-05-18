<template>
  <section class="section-container faq-shell">
    <div class="faq-orb orb-a"></div>
    <div class="faq-orb orb-b"></div>

    <div class="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="relative z-10 lg:sticky lg:top-24 lg:h-fit">
        <span class="section-kicker faq-kicker">{{ sectionState.badge }}</span>
        <h2 class="section-title mt-4 text-left">{{ sectionState.title }}</h2>
        <p class="mt-4 max-w-md text-slate-600">
          Temukan jawaban singkat seputar perawatan gigi, reservasi, dan proses layanan di klinik kami.
        </p>
      </div>

      <div class="relative z-10 space-y-4">
        <article
          v-for="(faq, index) in sectionState.items"
          :key="index"
          class="faq-card overflow-hidden"
        >
          <button
            @click="openFaq = openFaq === index ? null : index"
            class="faq-trigger flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
          >
            <h3 class="pr-2 text-base font-semibold text-slate-900 md:text-lg">{{ faq.question }}</h3>
            <span class="faq-icon" :class="openFaq === index ? 'faq-icon-open' : 'faq-icon-closed'">
              <i :class="openFaq === index ? 'fas fa-minus' : 'fas fa-plus'"></i>
            </span>
          </button>

          <div v-show="openFaq === index" class="px-5 pb-5 text-sm leading-7 text-slate-600 md:px-6 md:pb-6">
            {{ faq.answer }}
          </div>
        </article>
      </div>
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
  badge: 'FAQ',
  title: 'Pertanyaan yang Sering Diajukan',
  items: [
    {
      question: 'Apakah perlu membuat janji sebelum datang?',
      answer: 'Ya, kami menyarankan reservasi terlebih dahulu agar Anda mendapatkan jadwal pemeriksaan yang nyaman dan tanpa antre panjang.',
    },
    {
      question: 'Apakah klinik melayani perawatan untuk anak-anak?',
      answer: 'Tentu. Kami menyediakan layanan perawatan gigi anak dengan pendekatan yang ramah dan nyaman.',
    },
    {
      question: 'Berapa lama proses scaling atau pembersihan gigi?',
      answer: 'Durasi scaling biasanya sekitar 30–60 menit tergantung kondisi kebersihan dan kesehatan gigi pasien.',
    },
    {
      question: 'Apakah perawatan pemutihan gigi aman?',
      answer: 'Ya, prosedur whitening dilakukan menggunakan metode dan bahan yang aman di bawah pengawasan dokter gigi profesional.',
    },
    {
      question: 'Bagaimana cara memulai konsultasi?',
      answer: 'Anda dapat menghubungi kami melalui form kontak atau nomor WhatsApp untuk menentukan jadwal konsultasi dan pemeriksaan awal.',
    },
  ],
};

const sectionState = ref({ ...baseSection });
const openFaq = ref(0);

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

const applyContentFromProps = () => {
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || getCachedHomeData() || {};
  const getField = (obj, k1, k2) => (obj ? obj[k1] || obj[k2] || '' : '');
  const titleObj = getItemByTag('faq_title25', source)[0] || {};
  const itemObjs = getItemByTag('faq_item25', source);

  sectionState.value = {
    badge: getField(titleObj, 'title', 'badge') || baseSection.badge,
    title: getField(titleObj, 'content', 'heading') || baseSection.title,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          question: getField(item, 'title', 'question'),
          answer: getField(item, 'content', 'answer'),
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => applyContentFromProps());
</script>

<style scoped>
.faq-shell {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid rgba(244, 114, 182, 0.2);
  background: linear-gradient(180deg, rgba(255, 245, 247, 0.94), rgba(255, 255, 255, 0.98));
}

.faq-kicker {
  border-color: rgba(244, 114, 182, 0.28);
  background: rgba(255, 241, 242, 0.9);
  color: #be123c;
}

.faq-orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(251, 113, 133, 0.24), rgba(251, 113, 133, 0));
}

.orb-a {
  top: -2rem;
  right: -2rem;
  height: 7rem;
  width: 7rem;
}

.orb-b {
  left: -1.5rem;
  bottom: -2rem;
  height: 6rem;
  width: 6rem;
}

.faq-card {
  border-radius: 1rem;
  border: 1px solid rgba(244, 114, 182, 0.2);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.98), rgba(255, 241, 242, 0.7));
  box-shadow: 0 14px 30px -26px rgba(190, 24, 93, 0.35);
}

.faq-trigger {
  transition: background-color 180ms ease;
}

.faq-trigger:hover {
  background: rgba(255, 241, 242, 0.45);
}

.faq-icon {
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid;
  font-size: 0.7rem;
  transition: all 180ms ease;
}

.faq-icon-open {
  border-color: rgba(225, 29, 72, 0.35);
  background: #e11d48;
  color: white;
}

.faq-icon-closed {
  border-color: rgba(148, 163, 184, 0.4);
  color: #64748b;
  background: rgba(255, 255, 255, 0.9);
}
</style>
