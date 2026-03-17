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
            <div v-if="regularSchedule.length > 0">
              <div v-for="s in regularSchedule" :key="s.age_label" class="schedule-row">
                <span class="schedule-age">{{ s.age_label }}</span>
                <span class="schedule-note">{{ s.notes }}</span>
              </div>
            </div>
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

      <!-- Preços -->
      <div class="prices-section">
        <div class="prices-header">
          <h2>💰 Comparar preços em clínicas</h2>
          <p class="prices-sub">Preços atualizados pelas próprias clínicas · Salvador/BA</p>
        </div>

        <!-- Loading -->
        <div v-if="loadingPrices" class="price-placeholder">
          <div class="placeholder-card" v-for="i in 3" :key="i">
            <div class="ph-bar ph-name"></div>
            <div class="ph-bar ph-price"></div>
          </div>
        </div>

        <!-- Sem resultados -->
        <div v-else-if="clinicPrices.length === 0" class="no-prices">
          <div class="no-prices-icon">🏥</div>
          <p>Nenhuma clínica cadastrada para esta vacina ainda.</p>
        </div>

        <!-- Lista de preços -->
        <div v-else class="prices-list">
          <div v-for="(item, index) in clinicPrices" :key="item.clinics.id" class="price-card"
            :class="{ 'price-best': index === 0 }">
            <div class="price-card-left">
              <span v-if="index === 0" class="best-badge">🏆 Menor preço</span>
              <h4>{{ item.clinics.name }}</h4>
              <p class="clinic-address">📍 {{ item.clinics.address }} · {{ item.clinics.city }}/{{ item.clinics.state }}
              </p>
              <a v-if="item.clinics.phone" :href="`tel:${item.clinics.phone}`" class="clinic-phone">
                📞 {{ item.clinics.phone }}
              </a>
            </div>
            <div class="price-card-right">
              <span class="price-value">
                {{ item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </span>
              <span class="price-updated">
                Atualizado em {{ new Date(item.updated_at).toLocaleDateString('pt-BR') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Alerta SUS -->
        <div class="sus-alert" v-if="vaccine.sus && !vaccine.gestante">
          <span class="alert-icon">💡</span>
          <div>
            <strong>Esta vacina é gratuita no SUS!</strong>
            <p>Procure a UBS mais próxima de você para tomar gratuitamente, sem precisar pagar.</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase.js'
import { vaccines, schedule } from '@/data/vaccines.js'

const route = useRoute()
const vaccine = computed(() => vaccines.find(v => v.slug === route.params.slug))

const clinicPrices = ref([])
const loadingPrices = ref(true)

const regularSchedule = computed(() => {
  if (!vaccine.value) return []
  return schedule.filter(s => !s.gestante && s.vaccine_ids.includes(vaccine.value.id))
})

const gestanteSchedule = computed(() => {
  if (!vaccine.value) return []
  return schedule.filter(s => s.gestante && s.vaccine_ids.includes(vaccine.value.id))
})

async function fetchPrices() {
  if (!vaccine.value) return
  loadingPrices.value = true

  const { data, error } = await supabase
    .from('clinic_prices')
    .select(`
      price,
      updated_at,
      clinics (
        id, name, address, city, state, phone
      )
    `)
    .eq('vaccine_id', vaccine.value.id)
    .order('price', { ascending: true })

  if (!error && data) clinicPrices.value = data
  loadingPrices.value = false
}

onMounted(fetchPrices)
watch(() => route.params.slug, fetchPrices)
</script>

<style scoped>
.detail-page {
  padding-top: 100px;
  padding-bottom: 80px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-mid);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 0;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--coral-500);
}

.detail-hero {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  margin-bottom: 56px;
  align-items: start;
}

.detail-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.avail-badge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 700;
}

.badge-sus {
  background: var(--sage-100);
  color: var(--sage-500);
}

.badge-private {
  background: var(--blue-100);
  color: var(--blue-500);
}

.badge-gestante {
  background: #FCE4EC;
  color: #C2185B;
}

.detail-left h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  margin-bottom: 8px;
}

.manufacturer {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 28px;
}

.diseases-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-light);
  margin-bottom: 10px;
}

.diseases-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.disease-pill {
  padding: 6px 16px;
  background: var(--cream-dark);
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-mid);
  border: 1.5px solid var(--cream-mid);
}

.schedule-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1.5px solid var(--cream-mid);
  box-shadow: var(--shadow-sm);
}

.schedule-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.schedule-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid var(--cream-mid);
}

.schedule-row:last-child {
  border-bottom: none;
}

.schedule-age {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--coral-500);
}

.schedule-note {
  font-size: 0.82rem;
  color: var(--text-light);
  line-height: 1.5;
}

.no-schedule {
  font-size: 0.88rem;
  color: var(--text-light);
  font-style: italic;
}

.gestante-block {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1.5px dashed #F8BBD0;
}

.gestante-block-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Prices */
.prices-section {
  margin-top: 8px;
}

.prices-header {
  margin-bottom: 24px;
}

.prices-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 4px;
}

.prices-sub {
  color: var(--text-light);
  font-size: 0.88rem;
}

.price-placeholder {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.placeholder-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1.5px solid var(--cream-mid);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ph-bar {
  background: var(--cream-mid);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

.ph-name {
  height: 16px;
  width: 70%;
}

.ph-price {
  height: 28px;
  width: 45%;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.no-prices {
  text-align: center;
  padding: 48px 0;
}

.no-prices-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.no-prices p {
  color: var(--text-light);
}

.prices-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.price-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 24px 28px;
  border: 1.5px solid var(--cream-mid);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: all 0.2s;
  flex-wrap: wrap;
}

.price-card:hover {
  border-color: var(--coral-200);
  box-shadow: var(--shadow-sm);
}

.price-best {
  border-color: var(--amber-400);
  background: linear-gradient(135deg, var(--amber-100), var(--white));
}

.price-card-left {
  flex: 1;
}

.best-badge {
  display: inline-block;
  padding: 3px 12px;
  margin-bottom: 8px;
  background: var(--amber-400);
  color: var(--brown-700);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
}

.price-card-left h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.clinic-address {
  font-size: 0.83rem;
  color: var(--text-light);
  margin-bottom: 4px;
}

.clinic-phone {
  font-size: 0.83rem;
  color: var(--blue-500);
  font-weight: 500;
  transition: color 0.2s;
}

.clinic-phone:hover {
  color: var(--blue-700);
}

.price-card-right {
  text-align: right;
  flex-shrink: 0;
}

.price-value {
  display: block;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text-main);
}

.price-best .price-value {
  color: var(--amber-600);
}

.price-updated {
  font-size: 0.75rem;
  color: var(--text-light);
}

.sus-alert {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--sage-100);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  border: 1.5px solid var(--sage-400);
  margin-top: 24px;
}

.alert-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.sus-alert strong {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 4px;
  color: var(--sage-500);
}

.sus-alert p {
  font-size: 0.85rem;
  color: var(--text-mid);
}

.not-found {
  text-align: center;
  padding: 80px 0;
}

.nf-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.not-found h2 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.not-found p {
  color: var(--text-light);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .detail-hero {
    grid-template-columns: 1fr;
  }

  .price-placeholder {
    grid-template-columns: 1fr;
  }

  .price-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .price-card-right {
    text-align: left;
  }
}
</style>