# Copilot Instructions — vacina-facil

## Visão geral do projeto
Este é um projeto **frontend SPA** chamado `vacina-facil`, focado em facilitar
o agendamento e controle de vacinas. É uma aplicação Vue 3 com roteamento via
Vue Router e backend-as-a-service via Supabase.

## Stack técnica
- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Build tool**: Vite 5
- **Roteamento**: Vue Router 4
- **Backend/DB/Auth**: Supabase JS v2
- **Sem CSS framework** (estilização própria, salvo indicação contrária)

## Padrões obrigatórios de código

### Vue
- Sempre use `<script setup>` com Composition API
- Prefira `ref()` e `computed()` a `reactive()` para estado simples
- Componentes em PascalCase: `VacinaCard.vue`, `AgendamentoModal.vue`
- Props tipadas com `defineProps<{...}>()`
- Emits declarados com `defineEmits<{...}>()`
- Evite Options API

### Supabase
- Crie um singleton em `src/lib/supabase.js` com `createClient`
- Use `async/await` com tratamento de erro via desestruturação:
  `const { data, error } = await supabase.from(...)`
- Nunca exponha a service_role key — use apenas a anon key no frontend
- Autenticação via `supabase.auth.*`

### Vue Router
- Rotas definidas em `src/router/index.js`
- Use navigation guards (`beforeEach`) para rotas protegidas
- Prefira `useRouter()` e `useRoute()` dentro dos componentes

### Estrutura de pastas esperada
```
src/
  assets/
  components/      # componentes reutilizáveis
  views/           # páginas (mapeadas no router)
  composables/     # lógica reutilizável (useAuth, useVacinas...)
  lib/             # supabase.js, helpers
  router/
    index.js
  App.vue
  main.js
```

## Comportamento esperado do agente

- Ao sugerir um novo componente, sempre use `<script setup>` + template + style scoped
- Ao criar queries Supabase, inclua tratamento de erro e loading state
- Ao criar rotas novas, atualize `src/router/index.js` e adicione guard se for rota autenticada
- Ao criar composables, siga o padrão `useNomeDaFuncionalidade.js` retornando refs e funções
- Prefira composables a lógica inline em views
- Não instale dependências desnecessárias — a stack já cobre o essencial
- Sempre considere responsividade (mobile-first)

## Contexto de domínio
O sistema lida com:
- **Usuários** (pacientes e responsáveis)
- **Vacinas** (nome, dose, intervalo recomendado)
- **Agendamentos** (data, status, unidade de saúde)
- **Carteirinha de vacinação** (histórico de doses tomadas)

Tabelas prováveis no Supabase: `users`, `vacinas`, `agendamentos`, `doses_aplicadas`

## O que NÃO fazer
- Não use Vue 2 ou Options API
- Não use Vuex (use composables ou Pinia se precisar de estado global)
- Não faça chamadas Supabase direto nas views — use composables
- Não ignore erros do Supabase silenciosamente