<template>
  <footer class="footer">
    <div class="footer-inner container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-dots">
              <span class="d1"></span><span class="d2"></span><span class="d3"></span>
            </div>
            <span>Vacina<em>Fácil</em></span>
          </div>
          <p>Informação vacinal clara e acessível<br>para toda família brasileira. 🇧🇷</p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <strong>Produto</strong>
            <RouterLink to="/calendario">Calendário Vacinal</RouterLink>
            <RouterLink to="/buscar">Buscar Vacinas</RouterLink>
          </div>
          <div class="link-group">
            <strong>Fontes</strong>
            <a href="https://sbim.org.br" target="_blank" rel="noopener">SBIm</a>
            <a href="https://www.gov.br/saude" target="_blank" rel="noopener">Ministério da Saúde</a>
          </div>
          <div class="link-group">
            <strong>Criador</strong>
            <RouterLink to="/sobre">Sobre o projeto</RouterLink>
            <a href="https://linkedin.com/in/soarestheu" target="_blank" rel="noopener" class="linkedin-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Matheus Soares
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="disclaimer">⚕️ As informações são baseadas no calendário oficial do SBIm e Ministério da Saúde. Consulte sempre um profissional de saúde.</p>
        <p class="copy">
          Feito com ❤️ por
          <a href="https://linkedin.com/in/soarestheu" target="_blank" rel="noopener">Matheus Soares</a>
          · {{ new Date().getFullYear() }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--text-main); color: var(--cream); margin-top: 80px; }
.footer-inner { padding: 60px 24px 32px; }
.footer-top {
  display: flex; justify-content: space-between; gap: 48px;
  flex-wrap: wrap; margin-bottom: 48px;
}
.logo {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;
}
.logo em { color: var(--coral-300); font-style: italic; }
.logo-dots { display: flex; align-items: center; gap: 3px; }
.logo-dots span { width: 8px; height: 8px; border-radius: 50%; display: block; }
.d1 { background: var(--coral-400); }
.d2 { background: var(--amber-400); width: 10px; height: 10px; }
.d3 { background: var(--blue-400); }
.footer-brand p { color: var(--brown-200); font-size: 0.9rem; line-height: 1.7; }

.footer-links { display: flex; gap: 48px; flex-wrap: wrap; }
.link-group { display: flex; flex-direction: column; gap: 10px; }
.link-group strong {
  font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--brown-400); margin-bottom: 4px;
}
.link-group a { color: var(--brown-200); font-size: 0.9rem; transition: color 0.2s; }
.link-group a:hover { color: var(--coral-300); }

.linkedin-link {
  display: inline-flex; align-items: center; gap: 7px;
}
.linkedin-link svg { flex-shrink: 0; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 24px; display: flex; flex-direction: column; gap: 8px;
}
.disclaimer { font-size: 0.8rem; color: var(--brown-400); max-width: 600px; }
.copy { font-size: 0.8rem; color: var(--brown-400); }
.copy a { color: var(--coral-300); font-weight: 600; transition: color 0.2s; }
.copy a:hover { color: var(--coral-400); }
</style>
