# 🪔 Ofrenda: Yaadon ka Diya

> **Dev.to Hacktoberfest Open-Source AI Challenge — Week 4**  
> *Theme: Ghost in the Machine / Día de los Muertos*

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![AI: Open-Weight Gemma](https://img.shields.io/badge/Model-Gemma%20(Open--Weight)-ff8500.svg)](https://ai.google.dev/gemma)
[![Deployment: Render](https://img.shields.io/badge/Deploy-Render-46e3b7.svg)](render.yaml)
[![Privacy: 100% Client-Side Storage](https://img.shields.io/badge/Privacy-100%25%20On--Device-2ec4b6.svg)](#privacy-first-architecture)

---

## 🌟 What is "Ofrenda: Yaadon ka Diya"?

**Ofrenda: Yaadon ka Diya** is a virtual remembrance altar builder fusing the Mexican tradition of **Día de los Muertos** (*ofrendas*, cempasúchil/marigold petals, copal incense) with the Indian tradition of lighting a **Diya** (*Deepam / Yaadon ki Jyoti*) for departed ancestors.

Users honor their loved ones by entering their name, relation, lifespan, favorite foods, favorite songs, and 2–3 cherished personal memories. An **open-weight model (Gemma via Ollama or any OpenAI-compatible open endpoint)** weaves these memories into an intimate, warm remembrance letter streamed in **Hinglish** or **English**.

The remembrance is presented on an illuminated **3-tier glowing altar**:
- **Nivel 1 (Eternal Spirit / Aatma):** Golden framed portrait, lifespan banner, and central sacred flame (*Diya*).
- **Nivel 2 (Nourishment / Bhog):** Illustrated offering cards of favorite foods and copal/chandan dhoop.
- **Nivel 3 (Melodies & Earth / Sur aur Yaadein):** Favorite song cards, memory blossoms, and marigold petals (*cempasúchil / genda ke phool*).

---

## 🔒 Privacy-First Architecture: *"Sab kuch aapke device par. Koi account nahi."*

When remembering loved ones, we share private tears, kitchen secrets, and vulnerable memories. **Ofrenda: Yaadon ka Diya** has zero tracking, no cloud database, and no accounts:
- **Altar Data & Photos:** Kept strictly inside the browser’s `localStorage`. Photos are converted to local data URIs and **never** transmitted to any server.
- **Open-Weight AI:** Runs offline with open-weight Gemma on your machine. Your personal memories never touch closed proprietary API servers.
- **Full Portability:** Download your altar as a high-resolution **PNG image** or export the remembrance letter as a clean **`.txt`** file anytime.

---

## 🧠 Strict AI Rules & The Model Prompt

The AI chronicler strictly abides by three cardinal rules:
1. **Zero Hallucination:** The model must **ONLY** use the specific details entered by the user (name, relation, favorite foods, songs, memories). It will never invent professions, pets, places, or fictional details. If a detail is missing, it writes around it with tender warmth.
2. **Strict Brevity:** The letter is kept strictly under **180 words** to remain focused and poetic.
3. **No Funeral Cliches:** Forbidden from using generic tropes like *"gone too soon"*, *"taken before their time"*, or *"rest in peace"*. Instead, it celebrates living memory, sensory flavors, and the warmth of their presence.
4. **Authentic Hinglish / English:** Supports natural conversational Hinglish (Hindi in Latin script with words like *aapki yaad*, *sukoon*, *chai*, *hasi*) or lyrical English.

---

## 🚀 Quickstart (Running Locally with Ollama)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Ollama](https://ollama.ai/) installed on your machine

### 2. Pull the Open-Weight Gemma Model
In your terminal, pull and run Gemma 2:
```bash
# Pull Gemma 2 (9B or 2B)
ollama pull gemma2:9b

# Keep Ollama running in the background
ollama run gemma2:9b
```
*(Ollama serves an OpenAI-compatible API locally at `http://localhost:11434/v1`)*

### 3. Clone and Run the App
```bash
# Navigate to project folder
cd "c:/Users/Asus/New folder"

# Install dependencies
npm install

# Start the application
npm start
```

Open your browser at **`http://localhost:3000`**.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Local server port | `3000` |
| `AI_BASE_URL` | OpenAI-compatible endpoint | `http://localhost:11434/v1` (Ollama) |
| `AI_MODEL` | Model identifier | `gemma2:9b` |
| `AI_API_KEY` | API key (if using hosted endpoint) | `ollama` |

### Using Hosted Open-Weight Endpoints (For Cloud / Render Deployments)
You can connect to any hosted open-weight provider running Gemma:

#### 1. Groq (Ultra-fast open weights)
```env
AI_BASE_URL=https://api.groq.com/openai/v1
AI_MODEL=gemma2-9b-it
AI_API_KEY=gsk_your_groq_api_key
```

#### 2. OpenRouter (Open-weight Gemma / Mistral)
```env
AI_BASE_URL=https://openrouter.ai/api/v1
AI_MODEL=google/gemma-2-9b-it:free
AI_API_KEY=sk-or-v1-your_openrouter_key
```

#### 3. Together AI
```env
AI_BASE_URL=https://api.together.xyz/v1
AI_MODEL=google/gemma-2-9b-it
AI_API_KEY=your_together_api_key
```

---

## ☁️ Deploying to Render (One-Click)

This repository includes a [`render.yaml`](render.yaml) Blueprint:

1. Push your repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), choose **Blueprints** -> **New Blueprint Instance**.
3. Connect your repository.
4. Set the `AI_API_KEY` and select your hosted open-weight provider (e.g., Groq `gemma2-9b-it`).
5. Render will build and deploy the web service automatically!

---

## 💡 Why Open Innovation Matters

### 1. Sacred Sovereignty & Grief
Grief is our most vulnerable human experience. When honoring departed parents, grandparents, or dear friends, we share sacred family lore: childhood nicknames, favorite street-side dishes, private jokes, and dates of loss. **Sacred family memories should not become training data for opaque corporate LLMs.** Open-weight models empower users to keep their memories strictly on their personal hardware.

### 2. Resilience against Model Sunsets & Gatekeeping
Commercial AI APIs regularly deprecate model checkpoints, change pricing tiers, or enforce blunt safety filters that misinterpret authentic cultural mourning as "sensitive content." An open-weight model weights file (like Google Gemma) downloaded to your drive is yours forever. No board meeting or corporate pivot can revoke your ability to remember.

### 3. Fostering Cultural Syncretism
Language and heritage are syncretic. Fusing the Mexican *ofrenda* with the Indian *diya* in conversational Hinglish requires open architectures that can be prompted, adapted, and run without centralized linguistic homogenization. Open innovation allows communities across the globe to build digital folklore that respects both ancestral roots and modern code.

### 4. "Ghost in the Machine" with Integrity
In this challenge theme, open models serve not to create an uncanny digital clone or counterfeit ghost of the deceased, but rather to act as a **compassionate mirror**—an empathetic machine honoring the real memories human beings hold in their hearts.

---

## 🎨 Tech Stack & Design Highlights

- **Backend:** Node.js + Express (lightweight, zero heavy frameworks, native streaming SSE)
- **Frontend:** Plain Semantic HTML5, CSS3 Custom Properties, Vanilla JavaScript (ES Modules)
- **Visual Design:**
  - Midnight indigo background (`#070913`, `#0e1224`)
  - Marigold orange (`#ff8500`, `#ff9e00`) and sacred candle yellow (`#ffe066`)
  - CSS realistic flame animation with multi-layer flicker and glowing aura
  - Traditional *papel picado* garland banners with scalloped cutouts
  - Gentle drifting marigold petals (with full `prefers-reduced-motion` compliance)
  - Accessible color contrast conforming to WCAG AA/AAA guidelines
- **Exports:** High-resolution PNG via `html2canvas` + UTF-8 text file archive.

---

## 📜 License

Distributed under the [MIT License](LICENSE). Open for all who cherish memories.

