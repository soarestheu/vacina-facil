# 💉 VacinaFácil

Calendário vacinal completo + comparação de preços entre clínicas. Baseado no calendário oficial do SBIm/Ministério da Saúde 2024.

## ✨ Funcionalidades

- Calendário vacinal do nascimento até a vida adulta
- Filtro por idade (meses ou anos) com atalhos rápidos
- Busca de vacinas por nome, doença ou fabricante
- Filtro SUS vs. rede privada
- Comparação de preços entre clínicas por cidade
- Indicação de vacinas gratuitas no SUS

## 🛠 Stack

| Camada     | Tecnologia            |
| ---------- | --------------------- |
| Frontend   | Vue 3 + Vite          |
| Roteamento | Vue Router 4          |
| Backend/DB | Supabase (PostgreSQL) |
| Deploy     | Vercel                |

## 📁 Estrutura do projeto

```
src/
├── data/         # Vacinas e calendário (estático, SBIm 2024)
├── composables/  # useVaccines, useCalendar
├── views/        # Home, Search, Schedule, VaccineDetail, About
├── components/   # Navbar, Footer
├── lib/          # Cliente Supabase
└── router/       # Rotas
```

## 📋 Roadmap

- [x] MVP — calendário + busca
- [ ] Preços reais de clínicas
- [ ] Lembretes por e-mail
- [ ] Geolocalização de clínicas
