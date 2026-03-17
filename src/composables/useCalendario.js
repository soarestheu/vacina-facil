import { ref, computed } from 'vue'
import { vaccines, schedule } from '@/data/vaccines.js'

export function useCalendario() {
  const filterValue = ref(null)
  const unit = ref('meses')
  const showGestante = ref(false)

  const quickAges = [
    { label: 'Ao nascer', months: 0 },
    { label: '2m', months: 2 },
    { label: '6m', months: 6 },
    { label: '12m', months: 12 },
    { label: '15m', months: 15 },
    { label: '4 anos', months: 48 },
    { label: '9 anos', months: 108 },
  ]

  const filterAgeMonths = computed(() => {
    if (filterValue.value === null || filterValue.value === '') return null
    return unit.value === 'anos' ? filterValue.value * 12 : filterValue.value
  })

  const filteredSchedule = computed(() => {
    let list = schedule

    if (!showGestante.value) {
      list = list.filter(s => !s.gestante)
    }

    if (filterAgeMonths.value !== null) {
      list = list.filter(s =>
        s.gestante || (filterAgeMonths.value >= s.age_months_min && filterAgeMonths.value <= s.age_months_max)
      )
      if (!showGestante.value) {
        list = list.filter(s => !s.gestante)
      }
    }

    return list
  })

  function switchUnit(newUnit) {
    if (unit.value === newUnit) return
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

  function getVaccine(id) {
    return vaccines.find(v => v.id === id)
  }

  function isCurrentAge(item) {
    if (filterAgeMonths.value === null || item.gestante) return false
    return filterAgeMonths.value >= item.age_months_min && filterAgeMonths.value <= item.age_months_max
  }

  return {
    filterValue,
    unit,
    showGestante,
    filterAgeMonths,
    filteredSchedule,
    quickAges,
    switchUnit,
    applyQuick,
    isQuickActive,
    clearFilter,
    getVaccine,
    isCurrentAge,
  }
}
