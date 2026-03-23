<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const MAX_AGE_MONTHS = 216;

const ageMonths = ref("");
const router = useRouter();

const setAge = (months) => {
    ageMonths.value = months;
};

const goToSchedule = () => {
    const hasAge = String(ageMonths.value).trim() !== "";
    router.push(hasAge ? `/calendario?idade=${ageMonths.value}` : "/calendario");
};
</script>

<template>
    <div class="home">
        <section class="hero">
            <div class="hero-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
            <div class="container hero-inner">
                <div class="hero-text">
                    <div class="hero-tag">Para toda família brasileira 🇧🇷</div>
                    <h1>
                        Vacinas certas,<br />
                        <em>na hora certa.</em>
                    </h1>
                    <p class="hero-sub">
                        Calendário vacinal completo do SBIm + comparação de preços entre clínicas da sua cidade.
                        Simples, gratuito e sem complicação.
                    </p>
                    <div class="hero-actions">
                        <RouterLink to="/calendario" class="btn-primary">Ver calendário vacinal →</RouterLink>
                        <RouterLink to="/buscar" class="btn-secondary">Buscar por nome</RouterLink>
                    </div>
                </div>

                <div class="hero-card">
                    <div class="card-label">Quantos meses tem?</div>
                    <p class="card-sub">Descubra as vacinas do seu filho agora</p>
                    <div class="age-row">
                        <input
                            v-model="ageMonths"
                            type="number"
                            min="0"
                            :max="MAX_AGE_MONTHS"
                            placeholder="6"
                            class="age-input"
                            @keyup.enter="goToSchedule"
                        />
                        <span class="age-unit">meses</span>
                    </div>
                    <button class="btn-primary card-btn" @click="goToSchedule">Ver vacinas necessárias</button>
                    <div class="card-quick">
                        <span>Atalhos rápidos:</span>
                        <button @click="setAge(2)">2m</button>
                        <button @click="setAge(6)">6m</button>
                        <button @click="setAge(12)">12m</button>
                        <button @click="setAge(15)">15m</button>
                        <button @click="setAge(48)">4 anos</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats">
            <div class="container stats-inner">
                <div class="stat-item">
                    <strong>15+</strong>
                    <span>vacinas mapeadas</span>
                </div>
                <div class="stat-div"></div>
                <div class="stat-item">
                    <strong>SUS & Privado</strong>
                    <span>tudo comparado</span>
                </div>
                <div class="stat-div"></div>
                <div class="stat-item">
                    <strong>100% gratuito</strong>
                    <span>para sempre</span>
                </div>
                <div class="stat-div"></div>
                <div class="stat-item">
                    <strong>SBIm oficial</strong>
                    <span>fonte de dados</span>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <div class="section-label">O que você encontra aqui</div>
                <h2>Tudo que sua família <em>precisa saber</em> sobre vacinas</h2>
                <div class="features-grid">
                    <div class="feat feat-big">
                        <div class="feat-emoji">🗓</div>
                        <h3>Calendário por idade</h3>
                        <p>
                            Informe a idade em meses e veja exatamente quais vacinas seu filho precisa — baseado no
                            calendário oficial do SBIm e Ministério da Saúde.
                        </p>
                        <RouterLink to="/calendario" class="feat-link">Abrir calendário →</RouterLink>
                        <div class="feat-deco deco-1"></div>
                    </div>
                    <div class="feat">
                        <div class="feat-emoji">💰</div>
                        <h3>Compare preços</h3>
                        <p>Encontre a mesma vacina em clínicas próximas e economize sem abrir mão da qualidade.</p>
                        <RouterLink to="/buscar" class="feat-link">Comparar agora →</RouterLink>
                    </div>
                    <div class="feat">
                        <div class="feat-emoji">🏥</div>
                        <h3>SUS ou particular?</h3>
                        <p>Saiba quais vacinas são gratuitas na UBS e quais precisam ser tomadas na rede privada.</p>
                        <RouterLink to="/buscar" class="feat-link">Descobrir →</RouterLink>
                    </div>
                    <div class="feat feat-amber">
                        <div class="feat-emoji">🔔</div>
                        <h3>Em breve: lembretes</h3>
                        <p>Receba alertas por e-mail quando chegar a hora de tomar a próxima vacina.</p>
                        <span class="feat-badge">Chegando em breve</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.home {
    padding-top: 80px;
}

.hero {
    position: relative;
    overflow: hidden;
    padding: 80px 0 100px;
    min-height: 90vh;
    display: flex;
    align-items: center;
}

.hero-shapes {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}

.shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.5;
}

.shape-1 {
    width: 500px;
    height: 500px;
    background: var(--coral-100);
    top: -100px;
    right: -80px;
    animation: drift 12s ease-in-out infinite;
}

.shape-2 {
    width: 350px;
    height: 350px;
    background: var(--amber-100);
    bottom: 0;
    left: -60px;
    animation: drift 15s ease-in-out infinite reverse;
}

.shape-3 {
    width: 250px;
    height: 250px;
    background: var(--blue-100);
    top: 40%;
    left: 45%;
    animation: drift 10s ease-in-out infinite 3s;
}

@keyframes drift {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(20px, -20px) scale(1.05);
    }
}

.hero-inner {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 60px;
    align-items: center;
    position: relative;
}

.hero-tag {
    display: inline-block;
    padding: 6px 16px;
    background: var(--amber-100);
    color: var(--amber-600);
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 24px;
}

.hero-text h1 {
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 900;
    color: var(--text-main);
    margin-bottom: 20px;
}

.hero-text h1 em {
    color: var(--coral-500);
    font-style: italic;
}

.hero-sub {
    font-size: 1.1rem;
    color: var(--text-mid);
    max-width: 480px;
    line-height: 1.75;
    margin-bottom: 36px;
}

.hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.hero-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 36px;
    box-shadow: var(--shadow-lg);
    border: 1.5px solid var(--cream-mid);
    position: relative;
    overflow: hidden;
}

.hero-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--coral-500), var(--amber-400), var(--blue-400));
}

.card-label {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.card-sub {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 24px;
}

.age-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}

.age-input {
    width: 90px;
    padding: 12px 16px;
    background: var(--cream);
    border: 2px solid var(--cream-mid);
    border-radius: var(--radius-sm);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-main);
    text-align: center;
    transition: border-color 0.2s;
}

.age-input:focus {
    border-color: var(--coral-400);
    background: var(--white);
}

.age-unit {
    color: var(--text-mid);
    font-size: 1rem;
}

.card-btn {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
}

.card-quick {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: var(--text-light);
}

.card-quick button {
    padding: 4px 10px;
    background: var(--cream-dark);
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-mid);
    transition: all 0.2s;
}

.card-quick button:hover {
    background: var(--coral-100);
    color: var(--coral-600);
}

.stats {
    background: var(--text-main);
    padding: 32px 0;
}

.stats-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
}

.stat-item strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--coral-300);
}

.stat-item span {
    font-size: 0.8rem;
    color: var(--brown-200);
}

.stat-div {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
}

.features {
    padding: 100px 0;
}

.section-label {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--coral-500);
    background: var(--coral-50);
    padding: 6px 14px;
    border-radius: var(--radius-full);
    margin-bottom: 16px;
}

.features h2 {
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 48px;
    max-width: 560px;
}

.features h2 em {
    color: var(--coral-500);
    font-style: italic;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    gap: 20px;
}

.feat {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 36px;
    border: 1.5px solid var(--cream-mid);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.feat:hover {
    border-color: var(--coral-200);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.feat-big {
    grid-row: span 2;
    background: linear-gradient(145deg, var(--coral-50), var(--white));
    border-color: var(--coral-100);
}

.feat-amber {
    background: linear-gradient(145deg, var(--amber-100), var(--white));
    border-color: var(--amber-100);
}

.feat-emoji {
    font-size: 2.2rem;
    margin-bottom: 16px;
}

.feat h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.feat p {
    color: var(--text-mid);
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 20px;
}

.feat-link {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--coral-500);
    transition: color 0.2s;
}

.feat-link:hover {
    color: var(--coral-700);
}

.feat-badge {
    display: inline-block;
    padding: 4px 12px;
    background: var(--amber-100);
    color: var(--amber-600);
    border-radius: var(--radius-full);
    font-size: 0.78rem;
    font-weight: 600;
}

.feat-deco {
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--coral-100);
    opacity: 0.5;
}

@media (max-width: 900px) {
    .hero-inner {
        grid-template-columns: 1fr;
    }
    .hero-card {
        max-width: 480px;
    }
    .features-grid {
        grid-template-columns: 1fr;
    }
    .feat-big {
        grid-row: span 1;
    }
}
</style>
