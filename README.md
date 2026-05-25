# Ringkasan Sumber Content

Hasil pengecekan seluruh file di project menunjukkan:

## 1) Content diambil dari tag apa saja (nama tag)
Tag yang dipakai di fungsi `getItemByTag(...)`:

- `home_badge25`
- `home_main25`
- `home_buttonDaftar25`
- `home_buttonKonsul25`
- `home_image_title25`
- `home_tag25`
- `home_atribut25`
- `about_badge25`
- `about_main25`
- `about_atribut25`
- `propertyList_badge25`
- `propertyList_main25`
- `propertyList_button25`
- `service_badge25`
- `service_main25`
- `service_item25`
- `testimoni_badge25`
- `testimoni_title25`
- `faq_title25`
- `faq_item25`
- `contact_home_badge25`
- `contact_home_main25`
- `title25`
- `categories25`
- `question25`
- `sub_question25`
- `service25`
- `bt_mail25`
- `bt_live25`

Tambahan pada halaman listing (bukan `getItemByTag`, tapi dari `listing.values`):

- `impact`
- `dampak`
- `impact_score`
- `dampak_utama`
- `hasil`
- `durasi`
- `duration`
- `project_duration`
- `lama_proyek`

## 2) Home Page apa yang dipakai
Nilai `HOME_PAGE` yang ditemukan di kode:

- `Home`
  - dipakai di `PageManagement.vue` dan mayoritas section home.
- `Help`
  - dipakai di `HelpPage.vue`.

## 3) Sumber endpoint data halaman
Pengambilan data halaman memakai endpoint:

- `API_ENDPOINTS.customPages` -> `${API_URL}/apis/custom-pages/frontend`

Dengan parameter:

- untuk Home: `page=Home`
- untuk Help: `page=Help`

## 4) Catatan
Tidak ditemukan properti bernama `home_page` secara literal di kode.
Yang ada adalah konstanta `HOME_PAGE` dengan nilai `Home` dan `Help`.
