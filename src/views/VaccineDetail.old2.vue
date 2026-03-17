<template>
  <div class="detail-page">
    <div class="container" v-if="vaccine">
      <RouterLink to="/buscar" class="back-link">← Voltar para busca</RouterLink>

      <div class="detail-hero">
        <div class="detail-left">
          <div class="detail-badges">
            <span :class="['avail-badge', vaccine.sus ? 'badge-sus' : 'badge-private']">
              {{ vaccine.sus ? '🏥 Disponível no SUS' : '🏦 Apenas rede privada' }}
            </span>
            <span v-if="vaccine.gestante" class="avail-badge badge-gestante">🤰 Indicada para gestantes</span>
          </div>
          <h1>{{ vaccine.name }}</h1>
          <p class="manufacturer">Fabricante: <strong>{{ vaccine.manufacturer }}</strong></p>

          <div class="diseases-section">
            <p class="diseases-label">Protege contra:</p>
            <div class="diseases-list">
              <span v-for="d in vaccine.diseases" :key="d" class="disease-pill">{{ d }}</span>
            </div>
          </div>
        </div>

        <div class="detail-right">
          <div class="schedule-card">
            <h3>🗓 Quando tomar?</h3>

            <!-- Faixas etárias normais -->
            <div v-if="regularSchedule.length > 0">
              <div v-for="s in regularSchedule" :key="s.age_label" class="schedule-row">
                <span class="schedule-age">{{ s.age_label }}</span>
                <span class="schedule-note">{{ s.notes }}</span>
              </div>
            </div>

            <!-- Bloco gestante separado, se a vacina for recomendada para gestantes -->
            <div v-if="gestanteSchedule.length > 0" class="gestante-block">
              <div class="gestante-block-title">🤰 Para gestantes</div>
              <div v-for="s in gestanteSchedule" :key="s.age_label" class="schedule-row">
                <span class="schedule-age">{{ s.age_label }}</span>
                <span class="schedule-note">{{ s.notes }}</span>
              </div>
            </div>

            <p v-if="regularSchedule.length === 0 && gestanteSchedule.length === 0" class="no-schedule">
              Consulte um profissional de saúde para indicação.
            </p>
          </div>
        </div>
      </div>

      <!-- Preços placeholder -->
      <div class="prices-section">
        <h2>💰 Comparar preços em clínicas</h2>
        <p class="prices-sub">Em breve você poderá comparar os preços entre clínicas da sua cidade.</p>
        <div class="price-placeholder">
          <div class="placeholder-card" v-for="i in 3" :key="i">
            <div class="ph-bar ph-name"></div>
            <div class="ph-bar ph-price"></div>
          </div>
        </div>
        <div class="sus-alert" v-if="vaccine.sus && !vaccine.gestante">
          <span class="alert-icon">💡</span>
          <div>
            <strong>Esta vacina é gratuita no SUS!</strong>
            <p>Procure a UBS mais próxima de você para tomar gratuitamente.</p>
          </div>
        </div>
      </div>

    </div>

    <div class="container not-found" v-else>
      <div class="nf-icon">💉</div>
      <h2>Vacina não encontrada</h2>
      <p>Esta vacina não está em nosso banco de dados ainda.</p>
      <RouterLink to="/buscar" class="btn-primary">Ver todas as vacinas</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { vaccines, schedule } from '@/data/vaccines.js'

const route = useRoute()
const vaccine = computed(() => vaccines.find(v => v.slug === route.params.slug))

// Faixas normais (sem gestante)
const regularSchedule = computed(() => {
  if (!vaccine.value) return []
  return schedule.filter(s => !s.gestante && s.vaccine_ids.includes(vaccine.value.id))
})

// Faixas gestante — só exibe se a vacina for indicada para gestantes
const gestanteSchedule = computed(() => {
  if (!vaccine.value) return []
  return schedule.filter(s => s.gestante && s.vaccine_ids.includes(vaccine.value.id))
})
</script>

<style scoped>
.detail-page { padding-top: 100px; padding-bottom: 80px; }
.back-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--text-mid); font-size: 0.9rem; font-weight: 600;
  padding: 8px 0; margin-bottom: 32px; transition: color 0.2s;
}
.back-link:hover { color: var(--coral-500); }

.detail-hero {
  display: grid; grid-template-columns: 1fr 380px;
  gap: 40px; margin-bottom: 56px; align-items: start;
}
.detail-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.avail-badge {
  display: inline-block; padding: 5px 14px;
  border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 700;
}
.badge-sus { background: var(--sage-100); color: var(--sage-500); }
.badge-private { background: var(--blue-100); color: var(--blue-500); }
.badge-gestante { background: #FCE4EC; color: #C2185B; }

.detail-left h1 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; margin-bottom: 8px; }
.manufacturer { color: var(--text-light); font-size: 0.9rem; margin-bottom: 28px; }
.diseases-label {
  font-size: 0.85rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--text-light); margin-bottom: 10px;
}
.diseases-list { display: flex; flex-wrap: wrap; gap: 8px; }
.disease-pill {
  padding: 6px 16px; background: var(--cream-dark);
  border-radius: var(--radius-full); font-size: 0.88rem;
  font-weight: 600; color: var(--text-mid); border: 1.5px solid var(--cream-mid);
}

.schedule-card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 28px; border: 1.5px solid var(--cream-mid); box-shadow: var(--shadow-sm);
}
.schedule-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
.schedule-row {
  display: flex; flex-direction: column; gap: 4px;
  padding: 12px 0; border-bottom: 1px solid var(--cream-mid);
}
.schedule-row:last-child { border-bottom: none; }
.schedule-age { font-weight: 700; font-size: 0.9rem; color: var(--coral-500); }
.schedule-note { font-size: 0.82rem; color: var(--text-light); line-height: 1.5; }
.no-schedule { font-size: 0.88rem; color: var(--text-light); font-style: italic; }

.gestante-block {
  margin-top: 16px; padding-top: 16px;
  border-top: 1.5px dashed #F8BBD0;
}
.gestante-block-title {
  font-size: 0.82rem; font-weight: 700; color: #C2185B;
  margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;
}

.prices-section h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
.prices-sub { color: var(--text-light); margin-bottom: 24px; }
.price-placeholder { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.placeholder-card {
  background: var(--white); border-radius: var(--radius-md);
  padding: 24px; border: 1.5px solid var(--cream-mid);
  display: flex; flex-direction: column; gap: 12px;
}
.ph-bar { background: var(--cream-mid); border-radius: 4px; animation: pulse 1.5s ease-in-out infinite; }
.ph-name { height: 16px; width: 70%; }
.ph-price { height: 24px; width: 45%; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.sus-alert {
  display: flex; align-items: flex-start; gap: 16px;
  background: var(--sage-100); border-radius: var(--radius-md);
  padding: 20px 24px; border: 1.5px solid var(--sage-400);
}
.alert-icon { font-size: 1.5rem; flex-shrink: 0; }
.sus-alert strong { display: block; font-size: 0.95rem; margin-bottom: 4px; color: var(--sage-500); }
.sus-alert p { font-size: 0.85rem; color: var(--text-mid); }

.not-found { text-align: center; padding: 80px 0; }
.nf-icon { font-size: 4rem; margin-bottom: 16px; }
.not-found h2 { font-size: 1.5rem; margin-bottom: 8px; }
.not-found p { color: var(--text-light); margin-bottom: 24px; }

@media (max-width: 768px) {
  .detail-hero { grid-template-columns: 1fr; }
  .price-placeholder { grid-template-columns: 1fr; }
}
</style>
