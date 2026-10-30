---
title: Ofrenda: Yaadon ka Diya — Virtual Remembrance Altar with Open-Weight AI
published: true
tags: devchallenge, hf26challenge, ai, opensource
canonical_url: https://ofrenda-yaadon-ka-diya.onrender.com
cover_image: https://raw.githubusercontent.com/vidishagupta/ofrenda-yaadon-ka-diya/main/demo/thumbnail.png
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

## 🪔 What I Built: "Ofrenda: Yaadon ka Diya"

At the intersection of Mexican and Indian heritage lies a profound shared truth: **we do not fear our dead; we celebrate and feed them with our love.**

In Mexican tradition, during **Día de los Muertos**, families build vibrant multi-tiered *ofrendas* decorated with bright orange marigolds (*cempasúchil*), copal incense, and the favorite foods of departed ancestors to guide their spirits back home. In Indian traditions, lighting a **Diya** (*Deepam / Yaadon ki Jyoti*) creates a sacred bridge of light, illuminating the eternal bond with our ancestors across generations.

**Ofrenda: Yaadon ka Diya** is a virtual, interactive remembrance altar builder. You enter your loved one's name, relation, lifespan, favorite comfort foods, cherished songs, and 2–3 short memories. 

An **open-weight AI model** (Google's **Gemma** via local Ollama or hosted open weights on **Render**) acts as a tender chronicler, weaving these specific personal memories into a warm, heartfelt remembrance letter streamed live in **natural conversational Hinglish** or **lyrical English**.

The result is displayed as an illuminated, cinematic **3-tier altar**:
- **Nivel 1 (Eternal Spirit / Aatma):** Vintage golden picture frame holding their photo, lifespan banner, and the central sacred Diya with realistic dual-layer CSS flame flicker and warm glowing aura.
- **Nivel 2 (Bhog & Ofrendas / Nourishment & Light):** Illustrated offering plates of their favorite foods (from *garam garam jalebi* to *pan de muerto*) and a smoking copal & chandan dhoop burner.
- **Nivel 3 (Sur & Yaadein / Melodies & Earth):** Retro cassette cards of the songs they loved to sing, memory blossoms pinned to marigold garlands, and scattered marigold petals.

---

## 🌐 Live Demo & Open-Source Links

- 🌟 **Live Interactive Web App (Render):** [https://ofrenda-yaadon-ka-diya.onrender.com](https://ofrenda-yaadon-ka-diya.onrender.com)
- 📂 **GitHub Repository:** [https://github.com/vidishagupta/ofrenda-yaadon-ka-diya](https://github.com/vidishagupta/ofrenda-yaadon-ka-diya)
- 🩺 **Production Health Check:** [https://ofrenda-yaadon-ka-diya.onrender.com/health](https://ofrenda-yaadon-ka-diya.onrender.com/health)
- 🎥 **1080p Demo Video:** [demo/ofrenda_demo_1080p.mp4](https://github.com/vidishagupta/ofrenda-yaadon-ka-diya/raw/main/demo/ofrenda_demo_1080p.mp4)

---

## 💡 The "Ghost in the Machine": Compassionate Mirror, Not Uncanny Impersonator

When approaching Week 4's theme, *"Ghost in the Machine"*, many projects attempt to create an AI chatbot that pretends to "be" a dead person—an uncanny, often eerie illusion that frequently hallucinates false memories and feels emotionally hollow.

**Ofrenda: Yaadon ka Diya** takes the opposite philosophy:
> The machine is not a ghost impersonating our loved ones. The machine is a **compassionate mirror**—an empathetic, sacred chronicler that reflects and holds the living memories *we* provide, arranging them into a flame of gratitude.

To guarantee emotional dignity, our AI prompt enforces **strict cardinal rules**:
1. **Zero Hallucination:** The model must **ONLY** use details typed by the user. It will never invent professions, pets, hometowns, or fictional anecdotes. If details are sparse, it writes around them with universal emotional warmth.
2. **Strict Word Limit:** Letters are kept strictly under **180 words** to remain concentrated, lyrical, and heartfelt.
3. **No Funeral Clichés:** Banned from using generic phrases like *"gone too soon"*, *"taken before their time"*, or *"rest in peace"*. Instead, the focus is entirely on living celebration—the crackle of morning jalebi, the rhythm of a favorite ghazal, and the warmth of a shared laugh.

---

## 🔒 Why Open Innovation Matters for Sacred Memories

The Week 4 challenge asks: *Why does open innovation matter for what you built?*

### 1. Sacred Sovereignty & Privacy: *"Sab kuch aapke device par. Koi account nahi."*
Grief and family memories are the most private, vulnerable data human beings possess. When remembering our grandparents or parents, we share childhood nicknames, kitchen recipes, and private tears. **Sacred family memories should never become training data for closed commercial LLMs.**
- In *Ofrenda*, **zero user data touches a database**. All altar state and photos live solely in browser `localStorage`.
- When run locally via Ollama, family stories never leave the user's laptop.

### 2. Immunity from Model Sunsets & Gatekeeping
Commercial AI APIs routinely deprecate model checkpoints, change pricing tiers, or enforce blunt safety filters that misinterpret cultural mourning and death rituals as "unsafe content." 
An open-weight model (like Gemma 2 or Qwen) downloaded to your drive is yours forever. No board meeting or corporate pivot can revoke your ability to remember.

### 3. Fostering Cultural Syncretism Without Homogenization
Bridging Mexican *Día de los Muertos* with Indian *Diya* rituals in authentic conversational **Hinglish** (*"Aaj ofrenda par aapka diya roshan kiya hai... chai aur jalebi ki mehak..."*) requires open architectures that can be prompted and shaped without corporate filters sanitizing non-Western folk traditions.

---

## 🛠️ How It Works & Verified Tech Stack

### Architecture Overview

```
                      +---------------------------------------+
                      |          Browser (Client)             |
                      |  - Vanilla HTML5 / CSS3 / ES Modules  |
                      |  - 3-Tier Altar with Realistic CSS    |
                      |  - Photo Upload (100% on-device)      |
                      |  - Multi-Ofrenda Manager (Storage)    |
                      |  - PNG Export (html2canvas) & TXT     |
                      +-------------------+-------------------+
                                          |
                                    HTTP POST (SSE)
                                          |
                                          v
                      +---------------------------------------+
                      |         Node.js + Express Backend     |
                      |          (Hosted live on Render)      |
                      |  - /health (Health & Uptime Check)    |
                      |  - /api/generate (SSE Token Stream)   |
                      |  - Strict Prompt Guardrails           |
                      +-------------------+-------------------+
                                          |
                         +----------------+---------------+
                         |                                |
                         v                                v
       [Local Mode: Offline Ollama]          [Cloud Mode: Render]
       http://localhost:11434/v1             Hosted Open Weights (Groq)
       Gemma 2 / Open Weights                OpenAI-Compatible Streaming
```

### Key Technical Details
- **Backend:** Node.js + Express with native `fetch` streaming using Server-Sent Events (SSE).
- **Frontend:** Zero heavy frameworks (no React, Vue, or Angular bundle bloat). Built entirely with semantic HTML5, CSS custom properties, and vanilla JS.
- **Cinematic Design:** Deep nocturnal indigo (`#070913`, `#0e1224`), marigold orange (`#ff8500`), and golden candle flame highlights (`#ffe066`).
- **Realistic Diya Flame:** Pure CSS multi-layered flame with inner core, flickering animation, and glowing aura.
- **Accessibility:** Fully supports `prefers-reduced-motion` to tone down candle flickers and floating marigold petals for sensitive users.
- **Cloud Deployment:** Hosted live on **Render** (one of the Hacktoberfest featured partner technologies!) using `render.yaml` blueprint with health check monitoring at `/health`.

---

## 📸 Interactive Features Walkthrough

1. **The Remembrance Form:** Enter name, relation, lifespan, favorite foods, songs, 2–3 memories, language (Hinglish/English), and tone (Gentle/Joyful/Poetic).
2. **On-Device Photo Upload:** Drag-and-drop a portrait photo. It stays exclusively inside the browser as a local Data URI and updates the vintage golden altar frame.
3. **Lighting the Diya:** Click *"Light the Diya (Diya Jalayein)"* to trigger live token streaming into an illuminated parchment card.
4. **Multiple Ofrendas:** Add multiple loved ones and toggle between their altars using memory tabs.
5. **Light Extra Diyas:** Click *"+ Light Extra Diya"* to place additional named candles on the altar shelf for extended family.
6. **Export Your Altar:**
   - **Download Altar (PNG):** Captures the 3-tier glowing altar as a high-res image card.
   - **Download Letter (.txt):** Downloads the letter with tribute metadata.

---

## 💬 Conclusion

In a world where artificial intelligence is often rushed into replacing human intimacy, **Ofrenda: Yaadon ka Diya** demonstrates how open-weight AI can be used with humility, reverence, and respect. 

By keeping all family memories on-device and using open models as gentle mirrors of gratitude, we honor both the ancient spirits of our ancestors and the future of open technology.

*“Sab kuch aapke device par. Koi account nahi.”* 🪔🏵️
