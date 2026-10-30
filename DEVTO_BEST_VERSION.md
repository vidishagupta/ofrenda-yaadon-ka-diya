*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

# 🪔 Ofrenda: Yaadon ka Diya — Virtual Remembrance Altar with Open-Weight AI

> *"Sab kuch aapke device par. Koi account nahi."*  
> *(Everything stays on your personal device. Zero accounts required.)*

---

## 🕊️ A Quiet Sunday Morning: Why I Built This

Every Sunday morning, my grandmother (**Dadi Savitri Devi**) would wake up before the sun to boil masala chai in her small, dented silver saucepan. She would send us down the street to fetch hot, syrupy jalebis from the neighborhood halwai, and as the kitchen filled with the aroma of roasted cardamom and fried sugar, she would quietly hum Lata Mangeshkar’s *“Lag Ja Gale”* under her breath.

When she passed away in 2021, the hardest part of grief wasn't a sudden crisis. It was the crushing quiet of Sunday mornings. It was realizing that all the tiny, sensory details that made up her soul—the sound of her glass bangles, the extra pinch of ginger in the tea, her laughter until tears rolled down her cheeks—were now held only in my fragile memory.

When I saw the prompt for **Week 4 of the Hacktoberfest Open-Source AI Challenge: "Ghost in the Machine"**, my heart initially sank. 

In recent months, we’ve all seen Silicon Valley hype cycle around "grief-tech"—companies promising that if you upload your deceased parent's text messages and voice notes, an AI chatbot will let you "talk to their ghost." 

To me, that felt heartbreakingly wrong. Grief is not an interactive customer support bot. Our ancestors are not LLM conversational agents to be hallucinated by statistical next-token prediction. It turns sacred remembrance into an uncanny valley puppet show.

I asked myself: **What if the machine doesn't try to be a ghost at all? What if technology could simply be a humble, sacred altar?**

---

## 🏵️ The Bridge: Where Día de los Muertos Meets the Indian Diya

That question led me to look at two ancient traditions separated by oceans, yet identical in heart:

```
        MEXICAN OFRENDA                           INDIAN DIYA
  (Día de los Muertos Tradition)             (Deepam / Pitru Smriti)
  +----------------------------+             +----------------------------+
  | Orange Cempasúchil Petals  |  <=======>  | Sacred Marigold Garlands   |
  | 3-Tier Wooden Altar Steps  |    SHARED   | 3 Spheres (Soul, Body, Earth|
  | Favorite Comfort Foods     |    TRUTH    | Bhog & Prasad Offerings    |
  | Copal Incense to Guide     |   OF LOVE   | Chandan & Copal Dhoop      |
  | Lighting Candles for Spirit|             | Lighting Sacred Diya Flame |
  +----------------------------+             +----------------------------+
```

In Mexican tradition, during **Día de los Muertos**, families build multi-tiered **ofrendas**. You don't pretend the dead are still mortal; you lay out their favorite dishes, scatter bright orange marigolds (*cempasúchil*), and burn copal resin so their spirit feels loved and remembered.

In Indian tradition, we light a **Diya** (*Deepam / Yaadon ki Jyoti*). The flame represents the eternal *Aatma*—the indestructible soul that has crossed the river of time. We offer *bhog* (their favorite sweets) and sit together recounting the exact memories that made them who they were.

**Ofrenda: Yaadon ka Diya** is my tribute to this shared human impulse: a virtual, interactive 3-tier remembrance altar powered by **open-weight AI (Gemma 2 & Qwen 2.5)** and built with **uncompromising on-device privacy**.

---

## 🎬 1080p Interactive Walkthrough & Live App

Watch how the application feels in action—complete with natural Indian voiceover, ambient score, live cursor interactions, photo upload, flame lighting, and streaming Hinglish remembrance:

{% youtube 07Xy2v-2z6I %}

### 🔗 Verified Project Links
- 🌐 **Live Web Application (Render):** [https://ofrenda-yaadon-ka-diya.onrender.com](https://ofrenda-yaadon-ka-diya.onrender.com)
- 📂 **GitHub Source Code:** [https://github.com/vidishagupta/ofrenda-yaadon-ka-diya](https://github.com/vidishagupta/ofrenda-yaadon-ka-diya)
- 🩺 **Production Health Check:** [https://ofrenda-yaadon-ka-diya.onrender.com/health](https://ofrenda-yaadon-ka-diya.onrender.com/health)

{% github vidishagupta/ofrenda-yaadon-ka-diya %}

---

## 💡 The "Ghost in the Machine": Compassionate Mirror vs. Eerie Impersonator

Here is the foundational philosophy behind *Ofrenda*:

> **The machine should never pretend to "be" our loved ones.**  
> Instead, the machine is a **compassionate chronicler and mirror**—a reverent listener that gathers the specific living details we choose to honor (the jalebi, the chai, the melody, the laughter) and weaves them into a tender remembrance letter (*Yaadon ki Chitthi*).

### 🛡️ Strict Prompt Guardrails (Zero Hallucination)

To protect the sanctity of family memory, our AI system prompt enforces **four unbreakable cardinal rules**:

1. **Strict Zero Hallucination:** The model must **ONLY** use the explicit facts typed by the user. If the user only enters "loves tea and Sunday mornings", the AI is forbidden from making up that she was a doctor, or had a golden retriever, or lived in Paris. If input is sparse, it writes around those exact memories with universal emotional tenderness.
2. **Hard 180-Word Ceiling:** Grief diluted by verbosity becomes hollow. The letter is kept strictly under 180 words—lyrical, focused, and intimate.
3. **Ban on Funeral Clichés:** Generic tropes—like *"gone too soon"*, *"taken before their time"*, or *"rest in peace"*—are strictly banned. The focus is 100% on living gratitude: the sweetness of the food, the melody of the song, and the warmth of the presence.
4. **Natural Conversational Hinglish:** The model crafts the letter in the comforting, authentic cadence of everyday Indian homes—natural Hindi in Latin script with English warmth (*"Aaj ofrenda par aapka diya roshan kiya hai, pyaari Dadi... chai aur jalebi ki mehak..."*).

```javascript
// System Prompt Guardrail: Emotional Dignity & Zero Hallucination
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

In ofrenda lore, an altar’s tiers mirror the sacred journey between worlds. In *Ofrenda*, every tier is dynamically generated in real-time as you type, rendered in cinematic midnight indigo (`#070913`) and marigold orange (`#ff8500`):

```
+---------------------------------------------------------------+
|         NIVEL 1: ETERNAL SPIRIT (AATMA & LIGHT)               |
|   - Ornate vintage golden oval portrait frame                 |
|   - Central sacred Diya with dual-layer flickering flame      |
|   - Name & Lifespan banner (e.g., "Dadi Savitri Devi")        |
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
The central diya does not use heavy GIF assets or CPU-intensive canvas loops. It is crafted entirely with hardware-accelerated CSS:
- An inner white-hot core (`#fff`) pulsing at 0.18s organic jitter.
- An outer golden-amber teardrop (`#ff9e00` to `#ffd166`) with radial glow filter.
- Dynamic glowing aura that gently breathes when idle and pulses rapidly while the AI streams tokens.
- **Accessibility:** Fully honors `prefers-reduced-motion` for motion-sensitive users.

---

## 🔒 Why Open Innovation Matters for Sacred Memories

The official Hacktoberfest Week 4 prompt asks:  
**Why does open innovation matter for what you built?**

Here is my core conviction:

### 1. Sovereignty of Grief: No Corporate Data Harvesting
Grief, family anecdotes, childhood nicknames, and private tears are the most vulnerable personal data human beings hold. **Sacred memories should never become training data for closed commercial AI conglomerates.**
- *Ofrenda* operates with **zero database**.
- 100% of altar data, photos, and letters are stored exclusively in the user's browser `localStorage`.
- When run locally with Ollama, family stories never touch the internet.
- Notice our app's pledge banner: *"Sab kuch aapke device par. Koi account nahi."*

### 2. Immunity from Deprecation & Corporate Gatekeeping
Commercial AI APIs routinely deprecate models, hike token prices, or enforce crude blanket safety filters that frequently misclassify death rituals and ancestor honoring as "harmful content."  
An open-weight model (Gemma 2, Qwen) stored on your hard drive is yours forever. No board meeting or corporate acquisition can revoke your right to remember your grandmother.

### 3. Cultural Preservation Beyond Silicon Valley Monoculture
Closed APIs are predominantly trained and aligned on Western corporate standards. Preserving non-Western traditions—such as blending Mexican Day of the Dead with Indian Diya rituals in conversational **Hinglish**—requires open models that can be prompted, adapted, and hosted freely without corporate sanitization.

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

*Built with love, code, and marigolds by Vidisha Gupta for Dev.to Hacktoberfest Open-Source AI Challenge 2026.*
