# Landing Page Definition — Dinnartec

## Overview

- **Purpose:** Present Dinnartec to potential clients and communicate our value proposition
- **Languages:** Spanish (default) / English (toggle)
- **Style:** Modern, serious, minimal
- **Colors:** Black and white only
- **Logo:** Text "Dinnartec" (temporary until visual logo is ready)
- **Domain:** dinnartec.com (purchased on GoDaddy)

---

## Structure

### 1. Header (fixed)

| Element | Description |
|---------|-------------|
| Logo | "Dinnartec" as text |
| Navigation | Solutions · Factory · Contact |
| Language toggle | EN / ES |

**Behavior:** Sticky on scroll, subtle background blur on scroll.

---

### 2. Hero Section

**Content (EN):**
```
Dinnartec

Innovating the future, improving the present.

We are a technology company that builds solutions with AI 
to optimize businesses and create products that scale globally.

[Schedule a call]
```

**Content (ES):**
```
Dinnartec

Innovando el futuro, mejorando el presente.

Somos una empresa de tecnología que construye soluciones con IA 
para optimizar negocios y crear productos que escalan globalmente.

[Agenda una llamada]
```

**CTA Button:** Links to Calendly (or booking tool).

---

### 3. About Section

**Title (EN):** What is Dinnartec?  
**Title (ES):** ¿Qué es Dinnartec?

**Content (EN):**
```
Dinnartec is a technology company founded by developers with one goal: 
build solutions that transform industries.

We are not a traditional agency. We are builders who combine technical 
execution with strategic thinking. We were born with the mindset of 
great tech companies, understanding that the path is built step by step.

Our name represents our pillars:
Development · Investigation · Innovation · Adaptation · Revolution · Technology
```

**Content (ES):**
```
Dinnartec es una empresa de tecnología fundada por desarrolladores con un objetivo: 
construir soluciones que transformen industrias.

No somos una agencia tradicional. Somos builders que combinan ejecución técnica 
con pensamiento estratégico. Nacimos con la mentalidad de las grandes empresas 
tecnológicas, entendiendo que el camino se construye paso a paso.

Nuestro nombre representa nuestros pilares:
Desarrollo · Investigación · Innovación · Adaptación · Revolución · Tecnología
```

---

### 4. Solutions Section

**Title (EN):** Dinnartec Solutions  
**Title (ES):** Dinnartec Solutions

**Subtitle (EN):** We optimize businesses with technology and AI.  
**Subtitle (ES):** Optimizamos negocios con tecnología e IA.

**Content (EN):**
```
We identify inefficiencies, design strategies, and implement solutions 
that generate real impact: more revenue, lower costs, greater efficiency.

We don't sell hours. We sell results.
```

**Content (ES):**
```
Identificamos ineficiencias, diseñamos estrategias e implementamos soluciones 
que generan impacto real: más ingresos, menos costos, mayor eficiencia.

No vendemos horas. Vendemos resultados.
```

**How we work (EN):**

| Step | Title | Description |
|------|-------|-------------|
| 01 | Diagnosis | We analyze your business to identify high-impact opportunities |
| 02 | Optimization Sprint | We execute concrete solutions in short cycles (2-4 weeks) |
| 03 | Ongoing Support | We maintain, adjust, and improve implemented solutions |

**How we work (ES):**

| Step | Title | Description |
|------|-------|-------------|
| 01 | Diagnóstico | Analizamos tu negocio para identificar oportunidades de alto impacto |
| 02 | Sprint de Optimización | Ejecutamos soluciones concretas en ciclos cortos (2-4 semanas) |
| 03 | Acompañamiento continuo | Mantenemos, ajustamos y mejoramos las soluciones implementadas |

**CTA (EN):** Let's talk about your project →  
**CTA (ES):** Hablemos de tu proyecto →

---

### 5. Factory Section

**Title (EN):** Dinnartec Factory  
**Title (ES):** Dinnartec Factory

**Subtitle (EN):** Our proprietary products vertical.  
**Subtitle (ES):** Nuestra vertical de productos propios.

**Content (EN):**
```
The best products don't come from ideas — they come from real friction.

Factory takes the patterns we detect while solving problems and turns 
them into independent products that scale globally.

We're currently building. Stay tuned.
```

**Content (ES):**
```
Los mejores productos no nacen de ideas — nacen de fricción real.

Factory toma los patrones que detectamos resolviendo problemas y los 
convierte en productos independientes que escalan globalmente.

Estamos construyendo. Pronto verás más.
```

**Visual:** Minimal "Coming Soon" or "In Development" badge.

---

### 6. Contact Section

**Title (EN):** Let's build something together  
**Title (ES):** Construyamos algo juntos

**Content (EN):**
```
Have a project in mind? Want to optimize your business? 
Let's talk.
```

**Content (ES):**
```
¿Tienes un proyecto en mente? ¿Quieres optimizar tu negocio? 
Hablemos.
```

**Elements:**

1. **Schedule a call button**
   - EN: "Schedule a call"
   - ES: "Agenda una llamada"
   - Links to: Calendly (URL TBD)

2. **Contact form**
   - Fields: Name, Email, Message
   - Submit button (EN): "Send message"
   - Submit button (ES): "Enviar mensaje"
   - Sends to: dinnartec@gmail.com

**Alternative contact:**
```
Or email us directly at dinnartec@gmail.com
```

---

### 7. Footer

| Element | Content |
|---------|---------|
| Copyright | © 2026 Dinnartec. All rights reserved. |
| Navigation | Solutions · Factory · Contact |
| Social links | (TBD - LinkedIn, X/Twitter when ready) |

---

## Design Notes

### Typography
- **Headings:** Sans-serif, bold, clean (suggest: Inter, Geist, or similar)
- **Body:** Same family, regular weight
- **Hierarchy:** Clear contrast between H1, H2, body text

### Spacing
- Generous whitespace between sections
- Consistent padding (suggest: 80-120px between sections)
- Comfortable line height for readability

### Visual Elements
- No images for now (add later as needed)
- Subtle animations on scroll (optional)
- Hover states on buttons and links
- Divider lines between sections (thin, subtle)

### Buttons
- Primary: Black background, white text
- Hover: Slight opacity change or subtle animation
- Border radius: Minimal (0-4px) for modern look

### Responsive
- Must look polished on both mobile and desktop
- Mobile-first approach in CSS
- Hamburger menu on mobile
- Stack elements vertically on small screens

---

## Technical Requirements

- **Framework:** Astro
- **UI Components:** React Icons, shadcn/ui (optional, not mandatory)
- **i18n:** Support for ES (default) / EN with easy toggle
- **Form handling:** Email delivery to dinnartec@gmail.com
- **Analytics:** TBD (Google Analytics or Plausible)
- **Hosting:** TBD (likely Vercel)
- **Domain:** dinnartec.com (GoDaddy)

### Responsive Design
- Mobile-first approach
- Must look good on both mobile and desktop
- Hamburger menu on mobile
- Stack elements vertically on small screens
- Test breakpoints: 375px (mobile), 768px (tablet), 1024px+ (desktop)

---

## Pending Items

- [ ] Calendly link for scheduling
- [x] Domain: dinnartec.com (purchased)
- [ ] Social media links
- [ ] Logo (visual version)
- [ ] Brand colors (currently B&W, may evolve)
- [ ] Hosting setup (likely Vercel)
- [ ] Form backend (email service)

---

*Document version: 1.0 — January 2026*