import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'VacinaFácil — Busque e compare vacinas' }
  },
  {
    path: '/buscar',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    meta: { title: 'Buscar Vacinas — VacinaFácil' }
  },
  {
    path: '/calendario',
    name: 'Calendar',
    component: () => import('@/views/Schedule.vue'),
    meta: { title: 'Calendário Vacinal — VacinaFácil' }
  },
  {
    path: '/vacina/:slug',
    name: 'VaccineDetail',
    component: () => import('@/views/VaccineDetail.vue'),
    meta: { title: 'Detalhes da Vacina — VacinaFácil' }
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: 'Sobre o Projeto — VacinaFácil' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.afterEach((to) => {
  document.title = to.meta.title || 'VacinaFácil'
})

export default router
