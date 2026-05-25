# Ringkasan Sumber Content

Hasil pengecekan seluruh file di project menunjukkan sumber konten diambil dari tag tertentu melalui `getItemByTag(...)`.

## 1) Mapping tag ke file/section

| Tag | File | Section/Komponen |
|---|---|---|
| `home_badge25` | `src/components/sections/HeroSection.vue` | Hero |
| `home_main25` | `src/components/sections/HeroSection.vue` | Hero |
| `home_buttonDaftar25` | `src/components/sections/HeroSection.vue` | Hero (Primary Button) |
| `home_buttonKonsul25` | `src/components/sections/HeroSection.vue` | Hero (Secondary Button) |
| `home_image_title25` | `src/components/sections/HeroSection.vue` | Hero (Image + Image Title) |
| `home_tag25` | `src/components/sections/HeroSection.vue` | Hero (Floating Tag) |
| `home_atribut25` | `src/components/sections/HeroSection.vue` | Hero (Attributes) |
| `about_badge25` | `src/components/sections/AboutSection.vue` | About |
| `about_main25` | `src/components/sections/AboutSection.vue` | About |
| `about_atribut25` | `src/components/sections/AboutSection.vue` | About (Attributes) |
| `propertyList_badge25` | `src/components/sections/companyListSection.vue` | Company/List |
| `propertyList_main25` | `src/components/sections/companyListSection.vue` | Company/List |
| `propertyList_button25` | `src/components/sections/companyListSection.vue` | Company/List (Button) |
| `service_badge25` | `src/components/sections/ServicesSection.vue` | Services |
| `service_main25` | `src/components/sections/ServicesSection.vue` | Services |
| `service_item25` | `src/components/sections/ServicesSection.vue` | Services (Items) |
| `testimoni_badge25` | `src/components/sections/TestimonialsSection.vue` | Testimonials |
| `testimoni_title25` | `src/components/sections/TestimonialsSection.vue` | Testimonials |
| `faq_title25` | `src/components/sections/FAQSection.vue` | FAQ |
| `faq_item25` | `src/components/sections/FAQSection.vue` | FAQ (Items) |
| `contact_home_badge25` | `src/components/sections/ContactSection.vue` | Contact |
| `contact_home_main25` | `src/components/sections/ContactSection.vue` | Contact |
| `title25` | `src/views/HelpPage.vue` | Help (Hero Title/Subtitle) |
| `categories25` | `src/views/HelpPage.vue` | Help (Category Cards) |
| `question25` | `src/views/HelpPage.vue` | Help (Question Title) |
| `sub_question25` | `src/views/HelpPage.vue` | Help (FAQ Items) |
| `service25` | `src/views/HelpPage.vue` | Help (CTA Service) |
| `bt_mail25` | `src/views/HelpPage.vue` | Help (Mail Button) |
| `bt_live25` | `src/views/HelpPage.vue` | Help (Live/Contact Button) |

## 2) Tag tambahan di Listing (bukan `getItemByTag`)

Di `src/views/ListingPage.vue`, data diambil dari `listing.values[].tag_name` untuk sorting/logic:

- `impact`
- `dampak`
- `impact_score`
- `dampak_utama`
- `hasil`
- `durasi`
- `duration`
- `project_duration`
- `lama_proyek`

## 3) Home page yang dipakai

Nilai konstanta `HOME_PAGE` yang ditemukan:

- `Home`
  - dipakai di: `src/views/PageManagement.vue` dan semua section home (`Hero`, `About`, `Company/List`, `Services`, `Testimonials`, `FAQ`, `Contact`).
- `Help`
  - dipakai di: `src/views/HelpPage.vue`.

## 4) Endpoint sumber data halaman

Data custom page diambil dari:

- `API_ENDPOINTS.customPages` -> `${API_URL}/apis/custom-pages/frontend`

Dengan parameter:

- Home: `page=Home`
- Help: `page=Help`

## 5) Catatan

Tidak ditemukan properti literal `home_page` di kode.
Yang ada adalah konstanta `HOME_PAGE`.
