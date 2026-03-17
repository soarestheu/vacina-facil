import { ref, computed } from 'vue'
import { vaccines } from '@/data/vaccines.js'

export function useVacinas() {
  const query = ref('')
  const activeFilter = ref('all')

  const filters = [
    { value: 'all', label: 'Todas', icon: '💉' },
    { value: 'sus', label: 'Gratuitas (SUS)', icon: '🏥' },
    { value: 'private', label: 'Rede Privada', icon: '🏦' },
  ]

  const filteredVaccines = computed(() => {
    let list = vaccines
    if (activeFilter.value === 'sus') list = list.filter(v => v.sus)
    if (activeFilter.value === 'private') list = list.filter(v => !v.sus)
    if (query.value.trim()) {
      const q = query.value.toLowerCase()
      list = list.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.diseases.some(d => d.toLowerCase().includes(q)) ||
        v.manufacturer.toLowerCase().includes(q)
      )
    }
    return list
  })

  return { query, activeFilter, filters, filteredVaccines }
}
