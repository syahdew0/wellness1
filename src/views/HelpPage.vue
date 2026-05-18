<template>
  <main class="page-shell">
    <div class="page-hero">
      <div class="section-container">
        <h1 class="page-hero-title">{{ sectionState.heroTitle }}</h1>
        <p class="page-hero-subtitle">{{ sectionState.heroSubtitle }}</p>
      </div>
    </div>

    <div class="page-section section-container">
      <div class="mx-auto mb-12 max-w-2xl">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari bantuan..."
            class="surface-input rounded-full pl-14"
          >
          <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in categories"
          :key="category.id"
          class="card help-category-card cursor-pointer p-6 text-center transition-all hover:shadow-xl"
          :class="selectedCategory === category.id ? 'help-category-card-active' : ''"
          @click="selectedCategory = category.id"
        >
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100/80">
            <i :class="category.icon" class="text-3xl text-rose-700"></i>
          </div>
          <h3 class="mb-2 text-lg font-bold text-slate-900">{{ category.title }}</h3>
          <p class="text-sm text-slate-600">{{ category.count }} artikel</p>
        </div>
      </div>

      <div class="mx-auto max-w-4xl">
        <h2 class="mb-8 text-3xl font-bold text-slate-900">{{ sectionState.questionTitle }}</h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            class="card faq-card overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="faq-trigger flex w-full items-center justify-between p-6 text-left transition-colors"
            >
              <h3 class="pr-4 text-lg font-semibold text-slate-900">
                {{ faq.question }}
              </h3>
              <i
                :class="[
                  'fas transition-transform duration-300',
                  openFaq === index ? 'fa-chevron-up' : 'fa-chevron-down'
                ]"
              ></i>
            </button>
            <div
              v-show="openFaq === index"
              class="faq-answer px-6 pb-6 text-slate-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <div class="card help-cta-card mx-auto mt-12 max-w-4xl p-8 text-center">
        <h3 class="mb-4 text-2xl font-bold text-slate-900">{{ sectionState.serviceTitle }}</h3>
        <p class="mb-6 text-slate-600">{{ sectionState.serviceSubtitle }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a :href="sectionState.mailButton.link" class="btn-primary">
            <i class="fas fa-envelope"></i>
            {{ sectionState.mailButton.text }}
          </a>
          <router-link :to="sectionState.liveButton.link" class="btn-secondary">
            <i class="fas fa-phone"></i>
            {{ sectionState.liveButton.text }}
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const HOME_PAGE = 'Help';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const searchQuery = ref('');
const selectedCategory = ref(null);
const openFaq = ref(0);

const baseSection = {
  heroTitle: 'Pusat Bantuan',

  heroSubtitle:
    'Temukan informasi dan jawaban seputar layanan perawatan gigi kami',

  questionTitle: 'Pertanyaan Umum',

  serviceTitle: 'Masih Butuh Bantuan?',

  serviceSubtitle:
    'Tim dokter dan customer service kami siap membantu Anda memilih perawatan gigi yang tepat.',

  mailButton: {
    text: 'Email Support',
    link: 'mailto:support@dentalclinic.com',
  },

  liveButton: {
    text: 'Hubungi Klinik',
    link: '/contact',
  },

  categories: [
    { id: 1, title: 'Perawatan Gigi', icon: 'fas fa-tooth', count: 8 },

    { id: 2, title: 'Reservasi', icon: 'fas fa-calendar-check', count: 6 },

    { id: 3, title: 'Konsultasi', icon: 'fas fa-user-doctor', count: 5 },

    { id: 4, title: 'Whitening', icon: 'fas fa-smile', count: 4 },

    { id: 5, title: 'Pembayaran', icon: 'fas fa-credit-card', count: 7 },

    { id: 6, title: 'Lainnya', icon: 'fas fa-question-circle', count: 4 },
  ],

  faqs: [
    {
      category: 1,
      question: 'Kapan waktu terbaik untuk memeriksa gigi?',
      answer:
        'Kami menyarankan pemeriksaan gigi rutin setiap 6 bulan sekali untuk menjaga kesehatan gigi dan mulut.',
    },

    {
      category: 1,
      question: 'Apakah scaling gigi terasa sakit?',
      answer:
        'Sebagian besar pasien hanya merasakan sedikit tidak nyaman. Dokter kami akan memastikan proses berjalan senyaman mungkin.',
    },

    {
      category: 2,
      question: 'Bagaimana cara membuat janji konsultasi?',
      answer:
        'Anda dapat melakukan reservasi melalui form kontak, WhatsApp, atau telepon klinik kami.',
    },

    {
      category: 2,
      question: 'Apakah bisa datang tanpa reservasi?',
      answer:
        'Bisa, namun kami tetap menyarankan reservasi agar Anda mendapatkan jadwal yang lebih nyaman.',
    },

    {
      category: 3,
      question: 'Apakah tersedia konsultasi untuk anak-anak?',
      answer:
        'Ya, kami melayani konsultasi dan perawatan khusus anak dengan pendekatan yang ramah dan nyaman.',
    },

    {
      category: 4,
      question: 'Berapa lama proses whitening gigi?',
      answer:
        'Perawatan whitening biasanya berlangsung sekitar 60–90 menit tergantung kondisi gigi pasien.',
    },

    {
      category: 4,
      question: 'Apakah hasil whitening bisa bertahan lama?',
      answer:
        'Dengan perawatan yang baik dan menjaga pola makan, hasil whitening dapat bertahan cukup lama.',
    },

    {
      category: 5,
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer:
        'Kami menerima pembayaran tunai, transfer bank, kartu debit/kredit, dan e-wallet tertentu.',
    },
  ],
};

const sectionState = ref({ ...baseSection });
const categories = computed(() => sectionState.value.categories || []);
const faqs = computed(() => sectionState.value.faqs || []);

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
    } catch (error) {
      return null;
    }
  }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag] ?? allData?.[String(tag).toLowerCase()] ?? allData?.[String(tag).toUpperCase()];
  if (!section && allData && typeof allData === 'object') {
    const matchedKey = Object.keys(allData).find((key) => String(key).toLowerCase() === String(tag).toLowerCase());
    if (matchedKey) {
      const parseItem = (item) => parse(item) || {};
      const matchedSection = allData[matchedKey];
      return Array.isArray(matchedSection) ? matchedSection.map(parseItem) : [parseItem(matchedSection)];
    }
  }
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

const toCount = (raw, fallback) => {
  const parsed = Number.parseInt(String(raw), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toCategoryId = (raw, fallback) => {
  const parsed = Number.parseInt(String(raw), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const titleObj = getItemByTag('title25', source)[0] || {};
  const categoriesObjs = getItemByTag('categories25', source);
  const questionObj = getItemByTag('question25', source)[0] || {};
  const subQuestionObjs = getItemByTag('sub_question25', source);
  const serviceObj = getItemByTag('service25', source)[0] || {};
  const mailObj = getItemByTag('bt_mail25', source)[0] || {};
  const liveObj = getItemByTag('bt_live25', source)[0] || {};

  const mappedCategories = categoriesObjs.length > 0
    ? categoriesObjs.map((item, index) => ({
        id: toCategoryId(getField(item, 'id', 'category') || getField(item, 'category_id', 'value'), index + 1),
        title: getField(item, 'title', 'name') || `Kategori ${index + 1}`,
        icon: getField(item, 'icon', 'iconClass') || 'fas fa-question-circle',
        count: toCount(getField(item, 'count', 'total') || getField(item, 'content', 'description'), 0),
      }))
    : baseSection.categories;

  const mappedFaqs = subQuestionObjs.length > 0
    ? subQuestionObjs.map((item, index) => ({
        category: toCategoryId(getField(item, 'category', 'category_id') || getField(item, 'id', 'value'), 1),
        question: getField(item, 'title', 'question') || `Pertanyaan ${index + 1}`,
        answer: getField(item, 'content', 'answer') || '-',
      }))
    : baseSection.faqs;

  sectionState.value = {
    heroTitle: getField(titleObj, 'title', 'heading') || baseSection.heroTitle,
    heroSubtitle: getField(titleObj, 'content', 'subtitle') || baseSection.heroSubtitle,
    questionTitle: getField(questionObj, 'title', 'heading') || baseSection.questionTitle,
    serviceTitle: getField(serviceObj, 'title', 'heading') || baseSection.serviceTitle,
    serviceSubtitle: getField(serviceObj, 'content', 'subtitle') || baseSection.serviceSubtitle,
    mailButton: {
      text: getField(mailObj, 'title', 'text') || baseSection.mailButton.text,
      link: getField(mailObj, 'link', 'url') || baseSection.mailButton.link,
    },
    liveButton: {
      text: getField(liveObj, 'title', 'text') || baseSection.liveButton.text,
      link: getField(liveObj, 'link', 'url') || baseSection.liveButton.link,
    },
    categories: mappedCategories,
    faqs: mappedFaqs,
  };
};

const fetchHelpPageData = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.customPages, {
      params: { isFrontend: true, page: HOME_PAGE },
    });
    const incoming = res?.data?.data || res?.data || {};
    if (incoming && typeof incoming === 'object' && Object.keys(incoming).length > 0) {
      localStorage.setItem(HOME_STORAGE_KEY, JSON.stringify(incoming));
      applyContentFromProps();
    }
  } catch (error) {
    console.warn('Failed to fetch help page data', error);
  }
};

const filteredFaqs = computed(() => {
  let result = faqs.value;

  if (selectedCategory.value) {
    result = result.filter((faq) => faq.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((faq) =>
      String(faq.question || '').toLowerCase().includes(query) ||
      String(faq.answer || '').toLowerCase().includes(query)
    );
  }

  return result;
});

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

watch(categories, (newCategories) => {
  if (!newCategories.some((item) => item.id === selectedCategory.value)) {
    selectedCategory.value = null;
  }
});

onMounted(() => {
  applyContentFromProps();
  fetchHelpPageData();
});
</script>

<style scoped>
.page-shell {
  background:
    radial-gradient(120% 88% at 0% 0%, rgba(253, 164, 175, 0.34), transparent 50%),
    radial-gradient(105% 84% at 100% 100%, rgba(244, 114, 182, 0.26), transparent 52%),
    linear-gradient(180deg, #fff7fb 0%, #ffffff 45%);
  min-height: 100vh;
}

.page-hero {
  padding: 2.5rem 0 1.25rem;
}

.page-hero-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #0f172a;
  font-weight: 800;
}

.page-hero-subtitle {
  margin-top: 0.85rem;
  max-width: 40rem;
  color: #475569;
  font-size: 1.05rem;
}

.page-section {
  padding-bottom: 3.5rem;
}

.surface-input {
  width: 100%;
  border: 1px solid rgba(244, 114, 182, 0.35);
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  padding: 0.9rem 1rem;
  box-shadow: 0 14px 28px -24px rgba(15, 23, 42, 0.42);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.surface-input:focus {
  border-color: rgba(225, 29, 72, 0.5);
  box-shadow: 0 0 0 3px rgba(251, 113, 133, 0.14);
}

.help-category-card {
  border: 1px solid rgba(244, 114, 182, 0.28);
  border-radius: 1rem;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 241, 242, 0.88));
  box-shadow: 0 18px 32px -28px rgba(190, 24, 93, 0.34);
}

.help-category-card:hover {
  transform: translateY(-4px);
  border-color: rgba(225, 29, 72, 0.4);
}

.help-category-card-active {
  border-color: rgba(225, 29, 72, 0.58);
  box-shadow: 0 20px 36px -28px rgba(190, 24, 93, 0.44);
}

.faq-card {
  border: 1px solid rgba(244, 114, 182, 0.28);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.95);
}

.faq-trigger:hover {
  background: rgba(255, 241, 242, 0.7);
}

.faq-answer {
  line-height: 1.8;
}

.help-cta-card {
  border: 1px solid rgba(244, 114, 182, 0.34);
  border-radius: 1.25rem;
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 241, 242, 0.9)),
    linear-gradient(180deg, rgba(251, 113, 133, 0.08), rgba(255, 255, 255, 0));
}
</style>
