import { vaccines } from "@/data/vaccines.js";
import { computed, ref } from "vue";

const VACCINE_FILTER = {
    ALL: "all",
    SUS: "sus",
    PRIVATE: "private",
};

const FILTERS = [
    { value: VACCINE_FILTER.ALL, label: "Todas", icon: "💉" },
    { value: VACCINE_FILTER.SUS, label: "Gratuitas (SUS)", icon: "🏥" },
    { value: VACCINE_FILTER.PRIVATE, label: "Rede Privada", icon: "🏦" },
];

const matchesAvailability = (vaccine, activeFilter) => {
    if (activeFilter === VACCINE_FILTER.SUS) return vaccine.sus;
    if (activeFilter === VACCINE_FILTER.PRIVATE) return !vaccine.sus;
    return true;
};

const matchesQuery = (vaccine, normalizedQuery) =>
    vaccine.name.toLowerCase().includes(normalizedQuery) ||
    vaccine.diseases.some((disease) => disease.toLowerCase().includes(normalizedQuery)) ||
    vaccine.manufacturer.toLowerCase().includes(normalizedQuery);

export const useVaccines = () => {
    const searchQuery = ref("");
    const activeFilter = ref(VACCINE_FILTER.ALL);

    const filteredVaccines = computed(() => {
        const normalizedQuery = searchQuery.value.trim().toLowerCase();

        return vaccines
            .filter((vaccine) => matchesAvailability(vaccine, activeFilter.value))
            .filter((vaccine) => !normalizedQuery || matchesQuery(vaccine, normalizedQuery));
    });
    const clearSearch = () => {
        searchQuery.value = "";
        activeFilter.value = VACCINE_FILTER.ALL;
    };

    return {
        searchQuery,
        activeFilter,
        filters: FILTERS,
        filteredVaccines,
        clearSearch,
    };
};
