<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-icon">💉</div>
        <h1>404</h1>
        <p>Página não encontrada</p>
        <RouterLink to="/" class="btn-primary">Voltar para o início</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  padding-top: 120px;
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}
.not-found-content {
  text-align: center;
}
.not-found-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}
h1 {
  font-size: 6rem;
  color: var(--green-400);
  margin-bottom: 12px;
}
p {
  color: var(--gray-400);
  margin-bottom: 32px;
  font-size: 1.1rem;
}
.btn-primary {
  display: inline-block;
  padding: 14px 28px;
  background: var(--green-500);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: var(--green-400);
  transform: translateY(-2px);
}
</style>
