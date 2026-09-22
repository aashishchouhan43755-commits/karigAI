# karigAi (कारीगAI) — Artisan Heritage & Fair Living Wage Platform
**Creator:** Aashish Chouhan ([aashishchouhan43755@gmail.com](mailto:aashishchouhan43755@gmail.com))  
**Target Beneficiaries:** Marginalized Indian Traditional Artisans, Craft Clusters, Cooperatives & Fair Trade Buyers  

---

## 🌟 Executive Overview
**karigAi** bridges the gap between ancient Indian craftsmanship and global modern commerce. Millions of rural Indian artisans possess world-class generational talent (Madhubani, Blue Pottery, Bastar Dhokra, Channapatna Toys, Ajrakh, Thanjavur, Varanasi Silk) yet suffer from extreme exploitation by middlemen, lack of digital cataloging skills, language barriers, and undervaluation of their labor.

karigAi provides an intuitive, low-literacy-friendly, voice-first AI platform built specifically for Indian craft communities:
1. **AI Studio Image Enhancement:** Transforms rough smartphone photos taken in humble workshops into professional studio showcase assets with cultural backdrops, lighting correction, micro-texture sharpening, and authentic GI Tag digital watermarks.
2. **Multilingual Voice-Based Auto-Cataloging:** Artisans speak naturally in their native mother tongue (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, English). Powered by Gemini 3.8-Flash, karigAi extracts cultural lineages, translates poetic stories, identifies sacred motifs, and drafts bilingual export-ready listings.
3. **Dynamic Living Wage Pricing Engine:** Calculates fair minimum and retail prices by factoring in raw material costs, artisanal labor hours at a guaranteed living wage (₹180/hr benchmark), GI heritage rarity premiums, and transparent wholesale tiers (10-49 units, 50+ units).
4. **Low-Literacy & Elder-Friendly Mobile UX:** Audio read-aloud buttons, large high-contrast tactile action targets, audio feedback, visual icon cues, and minimal typing.
5. **Direct B2B & Buyer Marketplace Linkage:** Connects interior designers, boutique resorts, and global fair-trade export houses directly to rural artisan cooperatives, bypassing predatory middlemen with direct WhatsApp & UPI settlement links.
6. **Cooperative & NGO Impact Dashboard:** Provides verifiable metrics on fair wage compliance, female artisan participation, middleman bypass savings, and registered GI craft clusters.

---

## 🛠️ Architecture & Tech Stack

- **Frontend & Mobile UI:** React 19, TypeScript, Tailwind CSS v4, Motion animations, Lucide heritage icons, Web Speech Recognition & Web Audio API synthesis.
- **Backend Service:** Express.js REST API with modular routing, payload scaling, and Vite middleware.
- **AI Intelligence:** `@google/genai` with `gemini-3.8-flash` for multimodal craft cataloging and vision interpretation; structured heuristic fallback engine ensuring 100% offline/local reliability without API keys.
- **Fair Pricing Engine:** Deterministic living wage and GI scarcity algorithm.
- **Data Layer:** In-memory transactional craft repository seeded with 8 major Indian GI craft clusters.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js 20+ (Node 22 recommended)
- npm 10+

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional - runs with fallback out of the box)
cp .env.example .env

# 3. Start local development server (Express + Vite on Port 3000)
npm run dev

# 4. Open in browser:
# http://localhost:3000
```

### Running Tests
```bash
npm test
```

### Docker Deployment
```bash
docker compose up --build
```

---

## 👥 Git Branching Strategy for SIH Team Collaboration
To enable safe concurrent collaboration across team members during the hackathon:

| Branch Name | Owner / Work Area | Focus |
|-------------|-------------------|-------|
| `main` | Team Lead | Stable, tested demo releases |
| `feature/ai-cataloging` | AI/ML Engineer | Gemini prompt engineering, multi-language speech parsing |
| `feature/image-studio` | Frontend / Computer Vision | Studio filters, canvas compositing, watermark stamping |
| `feature/pricing-engine`| Backend Engineer | Labor benchmarks, export pricing, B2B wholesale logic |
| `feature/artisan-ux` | UI/UX Designer / Dev | Low-literacy ergonomics, audio-first cues, Indian visual identity |
| `feature/b2b-linkage` | Full-stack Dev | Enquiries, WhatsApp connector, cooperative dashboard |

---

## 🇮🇳 Heritage Craft Clusters Supported in Demo
- **Mithila / Madhubani Painting** (Ranti Village, Bihar — GI Certified)
- **Jaipur Blue Pottery** (Sanganer, Rajasthan — GI Certified)
- **Bastar Dhokra Lost-Wax Bell Metal** (Kondagaon, Chhattisgarh — GI Certified)
- **Channapatna Wooden Toys** (Ramanagara, Karnataka — GI Certified)
- **Kutch Ajrakh Hand-Block Print** (Ajrakhpur, Gujarat — GI Certified)
