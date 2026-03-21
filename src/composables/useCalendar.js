import { findVaccineById, schedule } from '@/data/vaccines.js'
import { computed, ref } from 'vue'

const MONTHS_PER_YEAR = 12
const NO_FILTER       = null

const AGE_UNIT = {
  MONTHS: 'meses',
  YEARS:  'anos',
}

const AGE_LIMITS = {
  MONTHS: { min: 0, max: 11  },
  YEARS:  { min: 0, max: 18  },
}

const QUICK_AGES = [
  { label: 'Ao nascer', months: 0   },
  { label: '2m',        months: 2   },
  { label: '6m',        months: 6   },
  { label: '12m',       months: 12  },
  { label: '15m',       months: 15  },
  { label: '4 anos',    months: 48  },
  { label: '9 anos',    months: 108 },
]

const toMonths = (value, unit) =>
  unit === AGE_UNIT.YEARS ? value * MONTHS_PER_YEAR : value

const isWithinAgeRange = (ageMonths, scheduleItem) =>
  ageMonths >= scheduleItem.age_months_min && ageMonths <= scheduleItem.age_months_max

const convertToUnit = (value, targetUnit) =>
  targetUnit === AGE_UNIT.YEARS
    ? Math.round(value / MONTHS_PER_YEAR)
    : value * MONTHS_PER_YEAR

const matchesScheduleFilter = (scheduleItem, currentAgeMonths, showGestante) => {
  if (scheduleItem.gestante) return showGestante
  if (currentAgeMonths === NO_FILTER) return true
  return isWithinAgeRange(currentAgeMonths, scheduleItem)
}

export const useCalendar = () => {
  const filterValue  = ref(NO_FILTER)
  const unit         = ref(AGE_UNIT.MONTHS)
  const showGestante = ref(false)

  const currentLimits = computed(() =>
    unit.value === AGE_UNIT.YEARS ? AGE_LIMITS.YEARS : AGE_LIMITS.MONTHS
  )

  const filterAgeMonths = computed(() => {
    if (filterValue.value === NO_FILTER) return NO_FILTER
    return toMonths(filterValue.value, unit.value)
  })

  const filteredSchedule = computed(() =>
    schedule.filter(scheduleItem =>
      matchesScheduleFilter(scheduleItem, filterAgeMonths.value, showGestante.value)
    )
  )

  const clampToLimits = (value, limits) =>
    Math.min(Math.max(value, limits.min), limits.max)

  const switchUnit = (newUnit) => {
    if (unit.value === newUnit) return
    if (filterValue.value !== NO_FILTER) {
      filterValue.value = convertToUnit(filterValue.value, newUnit)
    }
    unit.value = newUnit
  }

  const applyQuick = (quickAge) => {
    const isUnderOneYear = quickAge.months < MONTHS_PER_YEAR
    unit.value           = isUnderOneYear ? AGE_UNIT.MONTHS : AGE_UNIT.YEARS
    filterValue.value    = isUnderOneYear ? quickAge.months : Math.round(quickAge.months / MONTHS_PER_YEAR)
  }

  const onFilterInput = (rawValue) => {
    if (rawValue === '' || rawValue === null) {
      filterValue.value = NO_FILTER
      return
    }
    filterValue.value = clampToLimits(Number(rawValue), currentLimits.value)
  }

  const isQuickActive = (quickAge) => filterAgeMonths.value === quickAge.months

  const clearFilter = () => { filterValue.value = NO_FILTER }

  const isCurrentAge = (scheduleItem) => {
    if (filterAgeMonths.value === NO_FILTER || scheduleItem.gestante) return false
    return isWithinAgeRange(filterAgeMonths.value, scheduleItem)
  }

  return {
    filterValue,
    unit,
    showGestante,
    filteredSchedule,
    quickAges: QUICK_AGES,
    currentLimits,
    switchUnit,
    applyQuick,
    onFilterInput,
    isQuickActive,
    clearFilter,
    isCurrentAge,
    getVaccine: findVaccineById,
  }
}
