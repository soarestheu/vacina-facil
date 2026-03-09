<template>
  <div class="schedule-page">
    <div class="page-hero">
      <div class="container">
        <div class="page-tag">📅 Baseado no calendário SBIm 2024</div>
        <h1>Calendário <em>Vacinal</em></h1>
        <p>Veja quais vacinas seu filho precisa por idade — do nascimento até a vida adulta.</p>
      </div>
    </div>

    <div class="container page-body">

      <!-- Filtro por idade -->
      <div class="filter-card">
        <div class="filter-left">
          <span class="filter-icon">🎯</span>
          <div>
            <strong>Filtrar por idade</strong>
            <p>Mostre apenas as vacinas de uma faixa específica</p>
          </div>
        </div>
        <div class="filter-right">

          <!-- Toggle Meses / Anos -->
          <div class="unit-toggle">
            <button :class="['toggle-btn', { active: unit === 'meses' }]" @click="switchUnit('meses')">Meses</button>
            <button :class="['toggle-btn', { active: unit === 'anos' }]" @click="switchUnit('anos')">Anos</button>
          </div>

          <div class="input-group">
            <input
              v-model.number="filterValue"
              type="number" min="0" :max="unit === 'meses' ? 11 : 18"
              :placeholder="unit === 'meses' ? 'Ex: 6' : 'Ex: 4'"
              class="filter-input"
            />
            <span>{{ unit }}</span>
            <button v-if="filterValue !== null && filterValue !== ''" class="clear-btn" @click="clearFilter">
              ✕ Limpar
            </button>
          </div>

          <!-- Atalhos -->
          <div class="quick-ages">
            <button
              v-for="q in quickAges"
              :key="q.label"
              :class="['quick-btn', { active: isQuickActive(q) }]"
              @click="applyQuick(q)"
            >
              {{ q.label }}
            </button>
          </div>

        </div>
      </div>

      <!-- Toggle Gestantes -->
      <div class="gestante-toggle" @click="showGestante = !showGestante">
        <div class="gestante-toggle-left">
          <span class="gestante-icon">🤰</span>
          <div>
            <strong>Incluir vacinas para gestantes</strong>
            <p>Exibe as recomendações específicas para grávidas</p>
          </div>
        </div>
        <div :class="['toggle-switch', { on: showGestante }]">
          <div class="toggle-knob"></div>
        </div>
      </div>

      <!-- Legenda -->
      <div class="legend">
        <div class="legend-item">
          <span class="badge sus">SUS</span>
          <span>Disponível gratuitamente na UBS</span>
        </div>
        <div class="legend-item">
          <span class="badge private">Privada</span>
          <span>Apenas rede particular</span>
        </div>
        <div class="legend-item" v-if="showGestante">
          <span class="badge gestante">Gestante</span>
          <span>Específica para gestantes</span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <div
          v-for="(item, i) in filteredSchedule"
          :key="i"
          class="timeline-item"
          :class="{ highlight: isCurrentAge(item), 'is-gestante': item.gestante }"
        >
          <div class="timeline-marker">
            <div class="marker-dot" :class="{ 'dot-gestante': item.gestante }"></div>
            <div class="marker-line" v-if="i < filteredSchedule.length - 1"></div>
          </div>

          <div class="timeline-content">
            <div class="timeline-header">
              <h3>{{ item.age_label }}</h3>
              <span v-if="item.gestante" class="gestante-badge">🤰 Gestantes</span>
              <span v-else-if="isCurrentAge(item)" class="now-badge">✨ Agora</span>
            </div>
            <p v-if="item.notes" class="timeline-notes">{{ item.notes }}</p>
            <div class="vaccines-list">
              <RouterLink
                v-for="vid in item.vaccine_ids"
                :key="vid"
                :to="`/vacina/${getVaccine(vid)?.slug}`"
                class="vaccine-chip"
                :class="getVaccine(vid)?.sus ? 'chip-sus' : 'chip-private'"
              >
                <span class="chip-name">{{ getVaccine(vid)?.name }}</span>
                <span class="chip-badge">{{ getVaccine(vid)?.sus ? 'SUS' : 'Privada' }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredSchedule.length === 0" class="empty-state">
        <div class="empty-icon">🤷</div>
        <h3>Nenhuma faixa encontrada</h3>
        <p>Tente outro valor de idade ou <button @click="clearFilter">limpe o filtro</button> para ver tudo.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { vaccines, schedule } from '@/data/vaccines.js'

const route = useRoute()
const filterValue = ref(null)
const unit = ref('meses')
const showGestante = ref(false)

// Idade em meses normalizada para filtrar
const filterAgeMonths = computed(() => {
  if (filterValue.value === null || filterValue.value === '') return null
  return unit.value === 'anos' ? filterValue.value * 12 : filterValue.value
})

const quickAges = [
  { label: 'Ao nascer', months: 0 },
  { label: '2m',        months: 2 },
  { label: '6m',        months: 6 },
  { label: '12m',       months: 12 },
  { label: '15m',       months: 15 },
  { label: '4 anos',    months: 48 },
  { label: '9 anos',    months: 108 },
]

function switchUnit(newUnit) {
  if (unit.value === newUnit) return
  // Converte o valor atual ao trocar de unidade
  if (filterValue.value !== null && filterValue.value !== '') {
    if (newUnit === 'anos') {
      filterValue.value = Math.round(filterValue.value / 12)
    } else {
      filterValue.value = filterValue.value * 12
    }
  }
  unit.value = newUnit
}

function applyQuick(q) {
  if (q.months < 12) {
    unit.value = 'meses'
    filterValue.value = q.months
  } else {
    unit.value = 'anos'
    filterValue.value = Math.round(q.months / 12)
  }
}

function isQuickActive(q) {
  return filterAgeMonths.value === q.months
}

function clearFilter() {
  filterValue.value = null
}

onMounted(() => {
  if (route.query.idade) {
    const months = Number(route.query.idade)
    if (months >= 12) {
      unit.value = 'anos'
      filterValue.value = Math.round(months / 12)
    } else {
      unit.value = 'meses'
      filterValue.value = months
    }
  }
})

function getVaccine(id) {
  return vaccines.find(v => v.id === id)
}

function isCurrentAge(item) {
  if (filterAgeMonths.value === null || item.gestante) return false
  return filterAgeMonths.value >= item.age_months_min && filterAgeMonths.value <= item.age_months_max
}

const filteredSchedule = computed(() => {
  let list = schedule

  // Filtra gestantes pelo toggle
  if (!showGestante.value) {
    list = list.filter(s => !s.gestante)
  }

  // Filtra por idade se preenchido
  if (filterAgeMonths.value !== null) {
    list = list.filter(s =>
      s.gestante || (filterAgeMonths.value >= s.age_months_min && filterAgeMonths.value <= s.age_months_max)
    )
    // Se gestante ativo, mantém o bloco de gestantes mesmo com filtro
    if (!showGestante.value) {
      list = list.filter(s => !s.gestante)
    }
  }

  return list
})
</script>

<style scoped>
.schedule-page { padding-top: 80px; }

.page-hero {
  background: linear-gradient(135deg, var(--cream-dark), var(--coral-50));
  padding: 60px 0 48px; border-bottom: 1.5px solid var(--cream-mid);
}
.page-tag {
  display: inline-block; padding: 5px 14px;
  background: var(--white); border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; color: var(--coral-500);
  border: 1.5px solid var(--coral-100); margin-bottom: 16px;
}
.page-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; margin-bottom: 12px; }
.page-hero h1 em { color: var(--coral-500); font-style: italic; }
.page-hero p { color: var(--text-mid); font-size: 1rem; max-width: 500px; }

.page-body { padding: 48px 24px 80px; }

/* Filter card */
.filter-card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 28px 32px; border: 1.5px solid var(--cream-mid);
  box-shadow: var(--shadow-sm); margin-bottom: 16px;
  display: flex; align-items: flex-start; gap: 24px; flex-wrap: wrap;
}
.filter-left {
  display: flex; align-items: flex-start; gap: 14px; min-width: 200px;
}
.filter-icon { font-size: 1.8rem; }
.filter-left strong { display: block; font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.filter-left p { font-size: 0.85rem; color: var(--text-light); }
.filter-right { flex: 1; display: flex; flex-direction: column; gap: 14px; }

/* Unit toggle */
.unit-toggle {
  display: inline-flex; background: var(--cream-dark);
  border-radius: var(--radius-full); padding: 3px; gap: 2px;
  align-self: flex-start;
}
.toggle-btn {
  padding: 6px 18px; border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; color: var(--text-mid);
  transition: all 0.2s; background: none;
}
.toggle-btn.active {
  background: var(--white); color: var(--coral-500);
  box-shadow: var(--shadow-sm);
}

.input-group { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.filter-input {
  width: 80px; padding: 10px 14px;
  background: var(--cream); border: 2px solid var(--cream-mid);
  border-radius: var(--radius-sm); font-size: 1.1rem; font-weight: 700;
  color: var(--text-main); text-align: center; transition: border-color 0.2s;
}
.filter-input:focus { border-color: var(--coral-400); background: var(--white); }
.input-group span { color: var(--text-mid); font-size: 0.95rem; }
.clear-btn {
  padding: 6px 14px; background: var(--cream-dark);
  border-radius: var(--radius-full); font-size: 0.82rem;
  font-weight: 600; color: var(--text-mid); transition: all 0.2s;
}
.clear-btn:hover { background: var(--coral-100); color: var(--coral-600); }
.quick-ages { display: flex; gap: 6px; flex-wrap: wrap; }
.quick-btn {
  padding: 5px 14px; background: var(--cream-dark);
  border-radius: var(--radius-full); font-size: 0.82rem;
  font-weight: 600; color: var(--text-mid); transition: all 0.2s;
}
.quick-btn:hover { background: var(--coral-50); color: var(--coral-500); }
.quick-btn.active { background: var(--coral-500); color: var(--white); }

/* Gestante toggle */
.gestante-toggle {
  background: var(--white); border-radius: var(--radius-md);
  padding: 20px 24px; border: 1.5px solid var(--cream-mid);
  margin-bottom: 24px; display: flex; align-items: center;
  justify-content: space-between; gap: 16px; cursor: pointer;
  transition: border-color 0.2s;
}
.gestante-toggle:hover { border-color: var(--coral-200); }
.gestante-toggle-left { display: flex; align-items: center; gap: 14px; }
.gestante-icon { font-size: 1.6rem; }
.gestante-toggle-left strong { display: block; font-size: 0.95rem; font-weight: 700; margin-bottom: 3px; }
.gestante-toggle-left p { font-size: 0.82rem; color: var(--text-light); }

.toggle-switch {
  width: 44px; height: 24px; border-radius: var(--radius-full);
  background: var(--cream-mid); flex-shrink: 0;
  position: relative; transition: background 0.25s;
}
.toggle-switch.on { background: var(--coral-500); }
.toggle-knob {
  position: absolute; top: 3px; left: 3px;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--white); box-shadow: var(--shadow-sm);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toggle-switch.on .toggle-knob { transform: translateX(20px); }

/* Legend */
.legend { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 40px; }
.legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--text-mid); }
.badge { padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; }
.badge.sus { background: var(--sage-100); color: var(--sage-500); }
.badge.private { background: var(--blue-100); color: var(--blue-500); }
.badge.gestante { background: #FCE4EC; color: #C2185B; }

/* Timeline */
.timeline { display: flex; flex-direction: column; }
.timeline-item { display: flex; gap: 20px; padding-bottom: 36px; transition: all 0.3s; }

.timeline-item.highlight .timeline-content {
  background: linear-gradient(135deg, var(--coral-50), var(--white));
  border-color: var(--coral-200);
  box-shadow: 0 0 0 3px rgba(232, 93, 58, 0.1);
}
.timeline-item.highlight .marker-dot {
  background: var(--coral-500);
  box-shadow: 0 0 0 4px rgba(232, 93, 58, 0.2);
  transform: scale(1.3);
}
.timeline-item.is-gestante .timeline-content {
  background: linear-gradient(135deg, #FEF0F5, var(--white));
  border-color: #F8BBD0;
}

.timeline-marker {
  display: flex; flex-direction: column; align-items: center;
  padding-top: 20px; flex-shrink: 0; width: 20px;
}
.marker-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--brown-200); flex-shrink: 0; transition: all 0.3s;
}
.marker-dot.dot-gestante { background: #F48FB1; }
.marker-line { flex: 1; width: 2px; background: var(--cream-mid); margin-top: 6px; }

.timeline-content {
  flex: 1; background: var(--white);
  border: 1.5px solid var(--cream-mid); border-radius: var(--radius-md);
  padding: 24px 28px; transition: all 0.3s;
}
.timeline-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.timeline-header h3 { font-size: 1.05rem; font-weight: 700; }
.now-badge {
  padding: 3px 12px; background: var(--coral-500); color: var(--white);
  border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700;
}
.gestante-badge {
  padding: 3px 12px; background: #FCE4EC; color: #C2185B;
  border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700;
}
.timeline-notes { font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px; font-style: italic; }
.vaccines-list { display: flex; flex-wrap: wrap; gap: 8px; }

.vaccine-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: var(--radius-full);
  font-size: 0.85rem; font-weight: 600; border: 1.5px solid;
  transition: all 0.2s; cursor: pointer;
}
.chip-sus { background: var(--sage-100); color: var(--sage-500); border-color: var(--sage-100); }
.chip-sus:hover { background: var(--sage-500); color: var(--white); }
.chip-private { background: var(--blue-100); color: var(--blue-500); border-color: var(--blue-100); }
.chip-private:hover { background: var(--blue-500); color: var(--white); }
.chip-badge {
  padding: 1px 7px; background: rgba(255,255,255,0.5);
  border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 700;
}

.empty-state { text-align: center; padding: 80px 0; }
.empty-icon { font-size: 3rem; margin-bottom: 16px; }
.empty-state h3 { font-size: 1.3rem; margin-bottom: 8px; }
.empty-state p { color: var(--text-light); }
.empty-state button { color: var(--coral-500); font-weight: 600; background: none; text-decoration: underline; }
</style>
