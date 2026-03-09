<template>
  <div class="about-page">

    <div class="page-hero">
      <div class="container">
        <div class="page-tag">👋 Quem fez isso?</div>
        <h1>Sobre o <em>projeto</em></h1>
      </div>
    </div>

    <div class="container page-body">

      <div class="about-grid">

        <!-- Card principal -->
        <div class="creator-card">
          <div class="creator-avatar">MS</div>
          <div class="creator-info">
            <h2>Matheus Soares</h2>
            <p class="creator-role">Desenvolvedor Fullstack · Laravel & Vue.js</p>
            <p class="creator-bio">
              O VacinaFácil nasceu de uma necessidade real: quando minha filha começou a tomar as primeiras vacinas, percebi como era difícil saber quais vacinas ela precisava, quando tomar, e onde encontrar os melhores preços entre as clínicas.
            </p>
            <p class="creator-bio">
              Resolvi transformar esse problema num projeto open e gratuito — para que qualquer família brasileira tenha acesso fácil e claro a essa informação.
            </p>
            <a
              href="https://linkedin.com/in/soarestheu"
              target="_blank"
              rel="noopener"
              class="linkedin-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Conectar no LinkedIn
            </a>
          </div>
        </div>

        <!-- Cards de contexto -->
        <div class="context-cards">
          <div class="context-card">
            <div class="context-icon">💡</div>
            <h3>Como surgiu</h3>
            <p>Minha filha tinha 6 meses e eu precisava saber quais vacinas ela tomaria naquela consulta. Nenhum site era simples o suficiente — a maioria era PDFs do governo ou tabelas confusas.</p>
          </div>
          <div class="context-card">
            <div class="context-icon">🎯</div>
            <h3>O objetivo</h3>
            <p>Ser a referência mais simples e direta para calendário vacinal e comparação de preços no Brasil — gratuito, sem anúncios e sempre atualizado com o SBIm.</p>
          </div>
          <div class="context-card">
            <div class="context-icon">🛠</div>
            <h3>A stack</h3>
            <p>Vue 3 + Vite no frontend, hospedado na Vercel. Banco de dados no Supabase (PostgreSQL). Um side project feito nas horas vagas com muito carinho.</p>
          </div>
          <div class="context-card card-cta">
            <div class="context-icon">🤝</div>
            <h3>Quer contribuir?</h3>
            <p>Se você é uma clínica e quer aparecer aqui, ou tem sugestões de melhoria, me chame no LinkedIn!</p>
            <a href="https://linkedin.com/in/soarestheu" target="_blank" rel="noopener" class="cta-link">
              Falar com Matheus →
            </a>
          </div>
        </div>

      </div>

      <!-- Linha do tempo do projeto -->
      <div class="project-timeline">
        <h2>Evolução do <em>projeto</em></h2>
        <div class="milestones">
          <div class="milestone done">
            <div class="ms-dot"></div>
            <div class="ms-content">
              <strong>Fase 1 — MVP</strong>
              <p>Calendário vacinal completo + busca de vacinas por nome + diferenciação SUS vs. privada.</p>
              <span class="ms-status status-done">✓ Concluído</span>
            </div>
          </div>
          <div class="milestone">
            <div class="ms-dot"></div>
            <div class="ms-content">
              <strong>Fase 2 — Preços reais</strong>
              <p>Integração com clínicas para exibição e comparação de preços em tempo real.</p>
              <span class="ms-status status-progress">Em desenvolvimento</span>
            </div>
          </div>
          <div class="milestone">
            <div class="ms-dot"></div>
            <div class="ms-content">
              <strong>Fase 3 — Lembretes</strong>
              <p>Alertas por e-mail quando chegar a hora da próxima vacina do seu filho.</p>
              <span class="ms-status status-next">Em breve</span>
            </div>
          </div>
          <div class="milestone">
            <div class="ms-dot"></div>
            <div class="ms-content">
              <strong>Fase 4 — Geolocalização</strong>
              <p>Encontre clínicas próximas a você com disponibilidade e preços em tempo real.</p>
              <span class="ms-status status-next">Planejado</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.about-page { padding-top: 80px; }

.page-hero {
  background: linear-gradient(135deg, var(--cream-dark), var(--blue-100));
  padding: 60px 0 48px; border-bottom: 1.5px solid var(--cream-mid);
}
.page-tag {
  display: inline-block; padding: 5px 14px;
  background: var(--white); border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; color: var(--blue-500);
  border: 1.5px solid var(--blue-100); margin-bottom: 16px;
}
.page-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; }
.page-hero h1 em { color: var(--coral-500); font-style: italic; }

.page-body { padding: 56px 24px 80px; }

/* About grid */
.about-grid {
  display: grid; grid-template-columns: 380px 1fr;
  gap: 32px; margin-bottom: 72px; align-items: start;
}

/* Creator card */
.creator-card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 36px; border: 1.5px solid var(--cream-mid);
  box-shadow: var(--shadow-md); position: sticky; top: 100px;
}
.creator-avatar {
  width: 72px; height: 72px; border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--coral-500), var(--amber-400));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 900;
  color: var(--white); margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(232, 93, 58, 0.3);
}
.creator-info h2 { font-size: 1.4rem; font-weight: 900; margin-bottom: 4px; }
.creator-role {
  font-size: 0.85rem; color: var(--text-light); margin-bottom: 20px;
  font-weight: 500;
}
.creator-bio {
  font-size: 0.92rem; color: var(--text-mid); line-height: 1.75;
  margin-bottom: 14px;
}
.linkedin-btn {
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 8px; padding: 12px 22px;
  background: #0A66C2; color: var(--white);
  border-radius: var(--radius-full); font-size: 0.9rem; font-weight: 600;
  transition: all 0.2s; box-shadow: 0 4px 14px rgba(10, 102, 194, 0.3);
}
.linkedin-btn:hover {
  background: #004182; transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(10, 102, 194, 0.4);
}

/* Context cards */
.context-cards {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
}
.context-card {
  background: var(--white); border-radius: var(--radius-md);
  padding: 28px; border: 1.5px solid var(--cream-mid); transition: all 0.3s;
}
.context-card:hover { border-color: var(--coral-200); transform: translateY(-3px); box-shadow: var(--shadow-sm); }
.card-cta {
  background: linear-gradient(135deg, var(--coral-50), var(--white));
  border-color: var(--coral-100);
}
.context-icon { font-size: 1.8rem; margin-bottom: 12px; }
.context-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.context-card p { font-size: 0.88rem; color: var(--text-mid); line-height: 1.7; }
.cta-link {
  display: inline-block; margin-top: 14px;
  font-size: 0.88rem; font-weight: 700; color: var(--coral-500);
  transition: color 0.2s;
}
.cta-link:hover { color: var(--coral-700); }

/* Project timeline */
.project-timeline h2 {
  font-size: 1.6rem; font-weight: 900; margin-bottom: 36px;
}
.project-timeline h2 em { color: var(--coral-500); font-style: italic; }
.milestones { display: flex; flex-direction: column; gap: 0; }
.milestone {
  display: flex; gap: 20px; padding-bottom: 32px; opacity: 0.6;
}
.milestone.done { opacity: 1; }
.ms-dot {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  background: var(--cream-mid); margin-top: 4px;
  border: 2px solid var(--brown-200);
}
.milestone.done .ms-dot { background: var(--coral-500); border-color: var(--coral-500); }
.ms-content { flex: 1; }
.ms-content strong { display: block; font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.ms-content p { font-size: 0.88rem; color: var(--text-mid); margin-bottom: 10px; line-height: 1.6; }
.ms-status {
  display: inline-block; padding: 3px 12px;
  border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;
}
.status-done { background: var(--sage-100); color: var(--sage-500); }
.status-progress { background: var(--amber-100); color: var(--amber-600); }
.status-next { background: var(--cream-dark); color: var(--text-light); }

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
  .creator-card { position: static; }
  .context-cards { grid-template-columns: 1fr; }
}
</style>
