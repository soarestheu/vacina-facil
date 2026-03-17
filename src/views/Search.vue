<template>
  <div class="search-page">
    <div class="page-hero">
      <div class="container">
        <div class="page-tag">🔍 Busca de vacinas</div>
        <h1>Encontre e <em>compare</em></h1>
        <p>Busque qualquer vacina e veja onde encontrar — SUS ou rede particular.</p>
      </div>
    </div>

    <div class="container page-body">

      <!-- Busca -->
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input v-model="query" type="text" placeholder="Ex: BCG, Hepatite B, Pentavalente..." class="search-input"
          autofocus />
        <button v-if="query" class="clear-search" @click="query = ''">✕</button>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <button v-for="f in filters" :key="f.value" :class="['filter-btn', { active: activeFilter === f.value }]"
          @click="activeFilter = f.value">
          {{ f.icon }} {{ f.label }}
        </button>
      </div>

      <!-- Resultados -->
      <div class="results-header">
        <span class="results-count">{{ filteredVaccines.length }} vacinas encontradas</span>
      </div>

      <div class="vaccines-grid">
        <RouterLink v-for="vaccine in filteredVaccines" :key="vaccine.id" :to="`/vacina/${vaccine.slug}`"
          class="vaccine-card" :class="vaccine.sus ? 'card-sus' : 'card-private'">
          <div class="card-top">
            <div class="card-info">
              <h3>{{ vaccine.name }}</h3>
              <p class="card-manufacturer">{{ vaccine.manufacturer }}</p>
            </div>
            <span :class="['avail-badge', vaccine.sus ? 'badge-sus' : 'badge-private']">
              {{ vaccine.sus ? '🏥 SUS' : '🏦 Privada' }}
            </span>
          </div>
          <div class="diseases">
            <span v-for="d in vaccine.diseases" :key="d" class="disease-tag">{{ d }}</span>
          </div>
          <div class="card-footer">
            <span class="see-more">Ver detalhes e preços →</span>
          </div>
        </RouterLink>
      </div>

      <div v-if="filteredVaccines.length === 0" class="empty-state">
        <div class="empty-icon">😅</div>
        <h3>Nenhuma vacina encontrada</h3>
        <p>Tente buscar pelo nome da doença ou da vacina.</p>
        <button class="btn-primary" @click="query = ''; activeFilter = 'all'">Limpar busca</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useVacinas } from '@/composables/useVacinas.js'

const { query, activeFilter, filters, filteredVaccines } = useVacinas()
</script>

<style scoped>
.search-page {
  padding-top: 80px;
}

.page-hero {
  background: linear-gradient(135deg, var(--cream-dark), var(--amber-100));
  padding: 60px 0 48px;
  border-bottom: 1.5px solid var(--cream-mid);
}

.page-tag {
  display: inline-block;
  padding: 5px 14px;
  background: var(--white);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--amber-600);
  border: 1.5px solid var(--amber-100);
  margin-bottom: 16px;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 12px;
}

.page-hero h1 em {
  color: var(--amber-600);
  font-style: italic;
}

.page-hero p {
  color: var(--text-mid);
  max-width: 480px;
}

.page-body {
  padding: 48px 24px 80px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--white);
  border: 2px solid var(--cream-mid);
  border-radius: var(--radius-md);
  padding: 4px 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  transition: border-color 0.2s;
}

.search-box:focus-within {
  border-color: var(--amber-400);
}

.search-icon {
  font-size: 1.1rem;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  padding: 14px 0;
  font-size: 1rem;
  color: var(--text-main);
}

.search-input::placeholder {
  color: var(--text-light);
}

.clear-search {
  padding: 4px 10px;
  background: var(--cream-dark);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  color: var(--text-mid);
  transition: all 0.2s;
}

.clear-search:hover {
  background: var(--coral-100);
  color: var(--coral-500);
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.filter-btn {
  padding: 8px 18px;
  background: var(--white);
  border: 1.5px solid var(--cream-mid);
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-mid);
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--amber-300);
  color: var(--amber-600);
}

.filter-btn.active {
  background: var(--amber-500);
  color: var(--white);
  border-color: var(--amber-500);
}

.results-header {
  margin-bottom: 20px;
}

.results-count {
  font-size: 0.88rem;
  color: var(--text-light);
  font-weight: 500;
}

.vaccines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.vaccine-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1.5px solid var(--cream-mid);
  transition: all 0.25s;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vaccine-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-sus:hover {
  border-color: var(--sage-400);
}

.card-private:hover {
  border-color: var(--blue-400);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card-info h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.card-manufacturer {
  font-size: 0.8rem;
  color: var(--text-light);
}

.avail-badge {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.badge-sus {
  background: var(--sage-100);
  color: var(--sage-500);
}

.badge-private {
  background: var(--blue-100);
  color: var(--blue-500);
}

.diseases {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.disease-tag {
  padding: 3px 10px;
  background: var(--cream-dark);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-mid);
  font-weight: 500;
}

.card-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--cream-mid);
}

.see-more {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--coral-500);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-light);
  margin-bottom: 24px;
}
</style>
