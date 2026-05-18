<template>
  <main class="page-shell">
    <div class="page-hero">
      <div class="section-container">
        <h1 class="page-hero-title">Hubungi Kami</h1>
        <p class="page-hero-subtitle">Kami siap membantu Anda menemukan properti impian</p>
      </div>
    </div>

    <div class="page-section section-container">
      <div class="mx-auto max-w-3xl">
        <div class="space-y-6">
          <div class="card contact-card flex items-start gap-4 p-6">
            <div class="icon-orb">
              <i class="fas fa-phone text-xl"></i>
            </div>
            <div>
              <h3 class="mb-2 font-bold text-slate-900">Telepon</h3>
              <a href="tel:+6281234567890" class="muted-link">
                +62 812 3456 7890
              </a>
            </div>
          </div>

          <div class="card contact-card flex items-start gap-4 p-6">
            <div class="icon-orb">
              <i class="fas fa-envelope text-xl"></i>
            </div>
            <div>
              <h3 class="mb-2 font-bold text-slate-900">Email</h3>
              <a href="mailto:info@company.com" class="muted-link">
                info@company.com
              </a>
            </div>
          </div>

          <div class="card contact-card flex items-start gap-4 p-6">
            <div class="icon-orb">
              <i class="fas fa-map-marker-alt text-xl"></i>
            </div>
            <div>
              <h3 class="mb-2 font-bold text-slate-900">Alamat</h3>
              <p class="text-slate-600">
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          <div class="card contact-card flex items-start gap-4 p-6">
            <div class="icon-orb">
              <i class="fas fa-clock text-xl"></i>
            </div>
            <div>
              <h3 class="mb-2 font-bold text-slate-900">Jam Operasional</h3>
              <p class="text-slate-600">
                Senin - Jumat: 09:00 - 17:00<br>
                Sabtu: 09:00 - 14:00<br>
                Minggu: Tutup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

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

.contact-card {
  border: 1px solid rgba(244, 114, 182, 0.28);
  border-radius: 1rem;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(255, 241, 242, 0.88));
  box-shadow: 0 18px 32px -28px rgba(190, 24, 93, 0.34);
}

.icon-orb {
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #e11d48;
  background: rgba(255, 228, 230, 0.8);
  border: 1px solid rgba(244, 114, 182, 0.4);
}

.muted-link {
  color: #475569;
  transition: color 150ms ease;
}

.muted-link:hover {
  color: #e11d48;
}
</style>
