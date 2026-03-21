<template>
    <nav :class="['navbar', { scrolled: isScrolled }]">
        <div class="navbar-inner">
            <RouterLink to="/" class="logo">
                <div class="logo-mark">
                    <span class="logo-dot dot-1"></span>
                    <span class="logo-dot dot-2"></span>
                    <span class="logo-dot dot-3"></span>
                </div>
                <span class="logo-text">Vacina<em>Fácil</em></span>
            </RouterLink>

            <div class="nav-links">
                <RouterLink to="/calendario" class="nav-link"> <span class="nav-icon">🗓</span> Calendário </RouterLink>
                <RouterLink to="/buscar" class="nav-link"> <span class="nav-icon">🔍</span> Buscar </RouterLink>
            </div>

            <RouterLink to="/calendario" class="btn-nav"> Ver meu calendário </RouterLink>

            <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
                <span :class="['bar', { open: menuOpen }]"></span>
            </button>
        </div>

        <Transition name="slide-up">
            <div v-if="menuOpen" class="mobile-menu">
                <RouterLink to="/calendario" class="mobile-link" @click="menuOpen = false"
                    >🗓 Calendário Vacinal</RouterLink
                >
                <RouterLink to="/buscar" class="mobile-link" @click="menuOpen = false">🔍 Buscar Vacinas</RouterLink>
            </div>
        </Transition>
    </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const isScrolled = ref(false);
const menuOpen = ref(false);
function handleScroll() {
    isScrolled.value = window.scrollY > 20;
}
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 20px 0;
    transition: all 0.3s ease;
}
.navbar.scrolled {
    background: rgba(250, 247, 242, 0.92);
    backdrop-filter: blur(16px);
    padding: 14px 0;
    box-shadow: 0 2px 20px rgba(44, 26, 14, 0.08);
}
.navbar-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 32px;
}
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
}
.logo-mark {
    display: flex;
    align-items: center;
    gap: 3px;
}
.logo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
}
.dot-1 {
    background: var(--coral-500);
}
.dot-2 {
    background: var(--amber-400);
    width: 10px;
    height: 10px;
}
.dot-3 {
    background: var(--blue-400);
}
.logo-text {
    color: var(--text-main);
}
.logo-text em {
    color: var(--coral-500);
    font-style: italic;
}

.nav-links {
    display: flex;
    gap: 4px;
    margin-left: auto;
}
.nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: var(--radius-full);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-mid);
    transition: all 0.2s;
}
.nav-link:hover,
.nav-link.router-link-active {
    color: var(--coral-500);
    background: var(--coral-50);
}
.nav-icon {
    font-size: 0.85rem;
}

.btn-nav {
    padding: 10px 22px;
    background: var(--coral-500);
    color: var(--white);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(232, 93, 58, 0.25);
}
.btn-nav:hover {
    background: var(--coral-400);
    transform: translateY(-1px);
}

.menu-toggle {
    display: none;
}

.mobile-menu {
    background: var(--white);
    border-top: 1px solid var(--cream-mid);
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.mobile-link {
    padding: 12px 16px;
    border-radius: var(--radius-sm);
    font-weight: 500;
    color: var(--text-mid);
    transition: all 0.2s;
}
.mobile-link:hover {
    background: var(--coral-50);
    color: var(--coral-500);
}

@media (max-width: 640px) {
    .nav-links,
    .btn-nav {
        display: none;
    }
    .menu-toggle {
        display: block;
        margin-left: auto;
        width: 36px;
        height: 36px;
        background: var(--cream-dark);
        border-radius: var(--radius-sm);
        font-size: 1.1rem;
    }
}
</style>
