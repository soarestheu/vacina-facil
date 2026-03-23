<script setup></script>

<template>
    <div class="not-found-page">
        <div class="container">
            <div class="not-found-content">
                <div class="not-found-icon">💉</div>
                <h1 class="not-found-title">404</h1>
                <p class="not-found-description">Página não encontrada</p>
                <RouterLink to="/" class="btn-primary">Voltar para o início</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.not-found-page {
    padding-top: 120px;
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.not-found-content {
    text-align: center;
}

.not-found-icon {
    font-size: 4rem;
    margin-bottom: 16px;
}

.not-found-title {
    font-size: 6rem;
    color: var(--coral-500);
    margin-bottom: 12px;
}

.not-found-description {
    color: var(--text-light);
    margin-bottom: 32px;
    font-size: 1.1rem;
}
</style>
