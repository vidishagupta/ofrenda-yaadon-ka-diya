*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

# 🪔 Ofrenda: Yaadon ka Diya — Virtual Remembrance Altar with Open-Weight AI

> *"Sab kuch aapke device par. Koi account nahi."*  
> *(Everything stays on your device. Zero accounts required.)*

---

## 🌟 The Spark: Where Día de los Muertos Meets the Indian Diya

At first glance, ancient Mexico and India seem oceans apart. Yet, at their spiritual hearts lies an identical, radiant truth: **we do not fear our departed ancestors; we welcome, feed, and celebrate them with light and love.**

- In Mexican tradition, during **Día de los Muertos** (Day of the Dead), families build vibrant multi-tiered **ofrendas** decorated with glowing orange marigolds (*cempasúchil*), copal incense, and the favorite dishes of those who have crossed over to guide their spirits back home.
- In Indian culture, lighting a **Diya** (*Deepam / Yaadon ki Jyoti*) during Diwali, Pitru Paksha, and anniversaries creates a sacred bridge of light—symbolizing the eternal *Aatma* and carrying the warmth of memory across generations.

**Ofrenda: Yaadon ka Diya** is an interactive, digital remembrance altar builder that unites these two sacred traditions. By combining on-device privacy with **open-weight AI (Google's Gemma & Qwen)**, it transforms personal memories into an illuminated, cinematic tribute.

---

## 🎬 1080p Interactive Walkthrough & Live App

Watch how the application feels in action—complete with natural Indian voiceover, ambient score, live cursor interactions, photo upload, flame lighting, and streaming Hinglish remembrance:

{% youtube 07Xy2v-2z6I %}

### 🔗 Verified Project Links
- 🌐 **Live Web Application (Render):** [https://ofrenda-yaadon-ka-diya.onrender.com](https://ofrenda-yaadon-ka-diya.onrender.com)
- 📂 **GitHub Source Code:** [https://github.com/vidishagupta/ofrenda-yaadon-ka-diya](https://github.com/vidishagupta/ofrenda-yaadon-ka-diya)
- 🩺 **Health Check Endpoint:** [https://ofrenda-yaadon-ka-diya.onrender.com/health](https://ofrenda-yaadon-ka-diya.onrender.com/health)

{% github vidishagupta/ofrenda-yaadon-ka-diya %}

---

## 💡 The "Ghost in the Machine": Compassionate Mirror vs. Eerie Impersonator

When approaching Week 4's theme, *"Ghost in the Machine"*, many developers rush to build AI chatbots that attempt to impersonate a dead relative. The result is almost universally uncanny, emotionally hollow, and prone to hallucinating false statements about people who are no longer here to defend their truth.

**Ofrenda: Yaadon ka Diya** rejects the chatbot impersonator model entirely:

> **The machine should never pretend to "be" our loved ones.**  
> Instead, the machine acts as a **compassionate chronicler and mirror**—a respectful listener that takes only the exact sensory memories we share and arranges them into a sacred flame of gratitude.

### 🛡️ Strict Prompt Guardrails (Zero Hallucination)

To preserve emotional dignity, our AI prompt enforces **four unbreakable cardinal rules**:

1. **Zero Hallucination (Strict Constraint):** The model is strictly forbidden from inventing professions, hometowns, anecdotes, or family members. It uses **only** the names, foods, melodies, and memories typed by the user. If input is sparse, it writes around them with poetic, universal tenderness.
2. **Hard 180-Word Limit:** Letters are kept strictly under 180 words. Grief and remembrance lose their power when diluted by verbose LLM fluff.
3. **No Funeral Clichés:** Standard generic tropes—such as *"gone too soon"*, *"taken before their time"*, or *"rest in peace"*—are explicitly banned. The letter focuses exclusively on living warmth: the aroma of morning chai, the rhythm of a favorite song, and the joy of a shared laugh.
4. **Authentic Linguistic Syncretism:** Generates letters in natural conversational **Hinglish** (*"Aaj ofrenda par aapke naam ka diya roshan kiya hai... chai aur garam jalebi ki mehak..."*) or lyrical English.

```javascript
// System Prompt Guardrail enforcing dignity & truth
const SYSTEM_PROMPT = `You are a reverent chronicler for 'Ofrenda: Yaadon ka Diya'.
Write a short, tender remembrance letter honoring a departed loved one.

CARDINAL RULES:
1. Use ONLY the user-provided facts (name, relation, foods, songs, memories).
2. DO NOT invent or assume new facts, places, professions, or anecdotes.
3. NEVER use funeral clichés like 'gone too soon' or 'rest in peace'. Focus on celebrating living memory.
4. Keep the letter strictly UNDER 180 WORDS.
5. If language is Hinglish, write natural, warm conversational Hindi in Latin script.`;
```

---

## 🏛️ The Three-Tier Sacred Altar

In traditional ofrendas, tiers represent the progression from the earthly realm to the divine. *Ofrenda: Yaadon ka Diya* renders a responsive, illuminated 3-tier altar using pure CSS:

```
+---------------------------------------------------------------+
|         NIVEL 1: ETERNAL SPIRIT (AATMA & LIGHT)               |
|   - Ornate vintage golden oval portrait frame                 |
|   - Central sacred Diya with dual-layer flickering flame      |
|   - Name & Lifespan banner (e.g. "Dadi Savitri Devi")         |
+---------------------------------------------------------------+
|         NIVEL 2: BHOG & OFRENDAS (NOURISHMENT & SCENT)        |
|   - Illustrated offering plates of favorite comfort foods     |
|     (Garam garam jalebi, Masala chai, Pan de muerto)          |
|   - Smoking brass burner with Copal & Chandan Dhoop           |
+---------------------------------------------------------------+
|         NIVEL 3: SUR & YAADEIN (MELODIES & EARTH)             |
|   - Retro cassette cards of cherished songs & melodies        |
|   - Memory blossoms pinned to marigold garlands               |
|   - Floating, fluttering cempasúchil (marigold) petals        |
+---------------------------------------------------------------+
```

### 🕯️ Pure CSS Dual-Layer Flame & Animation
The central diya does not use heavy GIF or canvas renders. It uses hardware-accelerated CSS pseudo-elements:
- An inner white-hot core (`#fff`) pulsing at 0.18s jitter.
- An outer golden-amber teardrop (`#ff9e00` to `#ffd166`) with radial glow filter.
- Dynamic glowing aura that gently breathes when idle and pulses rapidly while the AI streams tokens.
- **Accessibility:** Fully honors `prefers-reduced-motion` for motion-sensitive users.

---

## 🔒 Why Open Innovation Matters for Sacred Memories

The official challenge asks: *Why does open innovation matter for what you built?*

Here is our honest answer:

### 1. Sovereignty of Grief: No Corporate Data Harvesting
Grief, family anecdotes, childhood nicknames, and private recipes are the most vulnerable personal data human beings hold. **Sacred memories should never become training data for closed commercial AI conglomerates.**
- *Ofrenda* operates with **zero database**. 
- 100% of altar data, photos, and letters are stored exclusively in the user's browser `localStorage`.
- When run locally with Ollama, family stories never touch the internet.

### 2. Immunity from Deprecation & Corporate Gatekeeping
Commercial AI APIs routinely deprecate models, hike token prices, or enforce crude blanket safety filters that frequently misclassify death rituals and ancestor honoring as "harmful content."  
An open-weight model (Gemma 2, Qwen) stored on your hard drive is yours forever. No board meeting or corporate acquisition can revoke your right to remember your grandmother.

### 3. Cultural Preservation Beyond Silicon Valley Monoculture
Closed APIs are predominantly trained and aligned on Western cultural norms. Preserving non-Western traditions—such as blending Mexican Day of the Dead with Indian Diya rituals in conversational **Hinglish**—requires open models that can be prompted, adapted, and hosted freely without corporate sanitization.

---

## 🛠️ System Architecture & Tech Stack

```
                     +------------------------------------+
                     |         Browser Client             |
                     |  - Semantic HTML5 & Modern CSS3    |
                     |  - Pure Vanilla JS (ES Modules)    |
                     |  - LocalStorage Memory State       |
                     |  - html2canvas PNG + TXT Export    |
                     +-----------------+------------------+
                                       |
                              HTTP POST (SSE Stream)
                                       |
                                       v
                     +------------------------------------+
                     |     Node.js + Express Backend      |
                     |        (Live on Render)            |
                     |  - Native fetch & SSE streaming    |
                     |  - Health check at /health         |
                     |  - Strict prompt sanitization      |
                     +-----------------+------------------+
                                       |
                        +--------------+--------------+
                        |                             |
                        v                             v
           [Local Offline Inference]      [Production Hosted Cloud]
             Ollama (Gemma 2 / Qwen)       Render + Open Weights (Groq)
             http://localhost:11434/v1      OpenAI-Compatible Endpoint
```

### Technical Specifications
| Layer | Technologies Used | Key Purpose |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express, Native `fetch` | Server-Sent Events (SSE) token streaming & health monitoring |
| **Frontend** | Vanilla HTML5, CSS3 Variables, ES6 JS | Zero framework overhead (<30KB footprint), instant 60fps load |
| **AI Layer** | Open-Weight Gemma 2 & Qwen 2.5 | OpenAI-compatible streaming interface; local or hosted |
| **Styling** | Midnight indigo (`#070913`), Marigold (`#ff8500`) | Cinematic Día de los Muertos & Diwali nocturnal visual aesthetic |
| **Deployment** | Render Web Service (`render.yaml`) | High availability, continuous deployment, `/health` monitoring |
| **Exports** | `html2canvas` & Blob API | Instant high-resolution PNG altar download & `.txt` tribute file |

---

## 🪔 Interactive Features Walkthrough

1. **Multi-Altar Tabs:** Honor multiple ancestors (e.g., *Dadi Savitri Devi*, *Dada ji*, *Abuelita*) with independent tabs and memory state.
2. **On-Device Photo Cropping:** Drop any JPG/PNG photo. It gets encoded client-side into a Data URI and mounted into the golden oval altar frame.
3. **Real-Time Token Streaming:** Click *"Light the Diya (Diya Jalayein)"*—watch the sacred flame awaken as words appear token-by-token on vintage parchment.
4. **Extra Diya Tributes:** Click *"+ Light Extra Diya"* to place additional named candles on the altar shelf for other loved ones.
5. **High-Resolution PNG Export:** Capture the full 3-tier illuminated altar as a 2x supersampled PNG to share with family or print.
6. **Chitthi Text Export:** Download the remembrance letter with tribute metadata as a `.txt` keepsake.

---

## 🚀 How to Run Locally in 2 Minutes

```bash
# 1. Clone the repository
git clone https://github.com/vidishagupta/ofrenda-yaadon-ka-diya.git
cd ofrenda-yaadon-ka-diya

# 2. Install dependencies
npm install

# 3. Pull an open-weight model with Ollama
ollama run gemma2:9b

# 4. Start the server
npm start
```
Visit `http://localhost:3000` and light your first diya!

---

## 🌺 Closing Reflection

A computer program can never replace the touch of a mother's hand, the sound of a grandfather's laugh, or the wisdom in an elder's eyes.

But code *can* be a sanctuary. When built with open-weight models, respectful boundaries, and uncompromising privacy, technology can give our collective memories a warm place to rest.

May the light of your diya never flicker out. 🪔🏵️

---

*Built with love, code, and marigolds for Dev.to Hacktoberfest Open-Source AI Challenge 2026.*
