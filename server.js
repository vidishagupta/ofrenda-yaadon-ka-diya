import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Open-weight AI Configuration (OpenAI-compatible)
const AI_BASE_URL = (process.env.AI_BASE_URL || 'http://localhost:11434/v1').replace(/\/+$/, '');
const AI_MODEL = process.env.AI_MODEL || 'gemma2:9b';
const AI_API_KEY = process.env.AI_API_KEY || 'ollama';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Standard Health Check for Render & uptime monitors
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'ofrenda-yaadon-ka-diya'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'ofrenda-yaadon-ka-diya'
  });
});

// Public status & configuration endpoint
app.get('/api/config', (req, res) => {
  const isLocal = AI_BASE_URL.includes('localhost') || AI_BASE_URL.includes('127.0.0.1');
  res.json({
    model: AI_MODEL,
    baseUrl: isLocal ? 'Local Ollama' : AI_BASE_URL,
    isLocal,
  });
});

// Construct system prompt with strict rules
function buildSystemPrompt(language, tone) {
  const isHinglish = language === 'hinglish';

  let toneGuidance = '';
  if (tone === 'funny') {
    toneGuidance = 'Tone: Warm, lighthearted, and smiling through tears. Highlight the quirky moments, their laughter, and everyday joy.';
  } else if (tone === 'poetic') {
    toneGuidance = 'Tone: Poetic, soulful, and evocative. Weave in subtle imagery of marigold petals (cempasúchil / genda ke phool), the steady flame of the diya, and lingering melodies.';
  } else {
    toneGuidance = 'Tone: Gentle, tender, and deeply comforting, like a quiet embrace across time.';
  }

  let languageGuidance = '';
  if (isHinglish) {
    languageGuidance = `Language: Hinglish (natural, affectionate blend of conversational Hindi and English written in Latin/English alphabet). Use sweet, familiar words like 'aapki yaad', 'hasi', 'sukoon', 'chai', 'diya', 'hamesha dil me'. Avoid stiff formal textbook Hindi or purely foreign English. Write with the intimacy of a family member speaking from the heart.`;
  } else {
    languageGuidance = `Language: English. Warm, sincere, intimate, and free of cold formal jargon.`;
  }

  return `You are the chronicler for "Ofrenda: Yaadon ka Diya" (Remembrance Altar), bridging the sacred Mexican Día de los Muertos and Indian traditions of lighting a diya for ancestors.

YOUR SACRED INSTRUCTIONS:
1. STRICT TRUTH TO USER DETAILS: You must ONLY use the exact details the user provides (their name, relation, favorite foods, songs, and specific memories). NEVER invent professions, locations, hobbies, or biographical facts not explicitly mentioned. If certain details are sparse, write around them with gentle emotional warmth.
2. STRICT WORD LIMIT: The remembrance letter MUST be under 180 words. Keep it intimate and concentrated.
3. NO CLICHES: Do NOT use tired clichés like "gone too soon", "taken before their time", "rest in peace", or generic funeral phrases. Focus on living celebration, memories, sensory flavors, and the light of their presence.
4. ${toneGuidance}
5. ${languageGuidance}
6. Format as a direct, loving remembrance letter addressed to or honoring the loved one. Do not output meta-commentary, markdown title headers, word counts, or preamble. Return ONLY the letter text.`;
}

// Format the user prompt
function buildUserPrompt(data) {
  const {
    name,
    relation = 'Beloved one',
    years = '',
    favoriteFoods = '',
    favoriteSongs = '',
    memories = '',
  } = data;

  return `Please write the remembrance letter for the ofrenda with ONLY these provided details:
- Loved One's Name: ${name}
- Relation: ${relation}
${years ? `- Lifespan / Years: ${years}` : ''}
${favoriteFoods ? `- Favorite Foods & Offerings: ${favoriteFoods}` : ''}
${favoriteSongs ? `- Favorite Songs / Music: ${favoriteSongs}` : ''}
${memories ? `- Cherished Memories: ${memories}` : ''}

Remember: Stay strictly under 180 words, avoid clichés, and use ONLY the facts above.`;
}

// Fallback letter generator if AI endpoint is completely unreachable (for graceful offline demo)
function generateOfflineLetter(data) {
  const { name, relation, favoriteFoods, favoriteSongs, memories, language } = data;
  const isHinglish = language === 'hinglish';

  if (isHinglish) {
    let letter = `Aaj ofrenda par aapke naam ka diya roshan kiya hai, pyaare ${name} (${relation}). `;
    if (favoriteFoods) letter += `Aapke pasandeeda ${favoriteFoods} ki mehak aaj bhi ghar ke har kone me basi hai. `;
    if (favoriteSongs) letter += `Jab bhi ${favoriteSongs} sunte hain, lagta hai aap bas yahin paas baithe muskura rahe hain. `;
    if (memories) letter += `Wo pal — ${memories} — hamesha hamare dilon me zinda rahenge. `;
    letter += `Aapki yaadein marigold ke phoolon ki tarah taaza hain. Yeh diya aapke noor aur prem ka prateek hai. Hamesha hamare saath rehna.`;
    return letter;
  } else {
    let letter = `Today, we light the sacred diya for you, dear ${name} (${relation}). `;
    if (favoriteFoods) letter += `The memory of sharing ${favoriteFoods} still brings warmth to our table. `;
    if (favoriteSongs) letter += `Whenever ${favoriteSongs} plays, your rhythm and spirit fill the quiet room. `;
    if (memories) letter += `We hold tight to those moments: ${memories}. `;
    letter += `You live on in every melody, every shared recipe, and the golden glow of this flame. We remember you with joy and endless love.`;
    return letter;
  }
}

// SSE Streaming endpoint
app.post('/api/generate', async (req, res) => {
  const {
    name,
    relation,
    years,
    favoriteFoods,
    favoriteSongs,
    memories,
    language = 'hinglish',
    tone = 'gentle',
  } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  });

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const systemPrompt = buildSystemPrompt(language, tone);
  const userPrompt = buildUserPrompt({
    name,
    relation,
    years,
    favoriteFoods,
    favoriteSongs,
    memories,
  });

  try {
    const upstreamUrl = `${AI_BASE_URL}/chat/completions`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout

    const headers = {
      'Content-Type': 'application/json',
    };
    if (AI_API_KEY && AI_API_KEY !== 'ollama') {
      headers['Authorization'] = `Bearer ${AI_API_KEY}`;
    }

    const payload = {
      model: AI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
      temperature: 0.75,
      max_tokens: 380,
    };

    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Upstream API returned status ${response.status}: ${errText}`);
      throw new Error(`Upstream error ${response.status}: ${errText || 'Endpoint unavailable'}`);
    }

    if (!response.body) {
      throw new Error('No response body received from upstream AI model');
    }

    // Read the upstream stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed === 'data: [DONE]') {
          sendEvent('done', { done: true });
          res.end();
          return;
        }

        if (trimmed.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(trimmed.slice(6));
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              sendEvent('chunk', { text: delta });
            }
          } catch (e) {
            // Ignore partial parse errors in stream
          }
        }
      }
    }

    sendEvent('done', { done: true });
    res.end();
  } catch (err) {
    console.error('AI Generation error:', err.message);

    // If local Ollama is not running or remote API fails, notify client
    // and provide heartfelt local fallback so the user experience is resilient.
    const isLocalOllama = AI_BASE_URL.includes('localhost') || AI_BASE_URL.includes('127.0.0.1');
    const helpMessage = isLocalOllama
      ? `Local Ollama is not responding at ${AI_BASE_URL}. Run "ollama run ${AI_MODEL}" in your terminal to enable live local inference.`
      : `AI endpoint (${AI_BASE_URL}) was unreachable: ${err.message}.`;

    sendEvent('status_note', {
      fallback: true,
      message: helpMessage,
    });

    // Provide warm fallback letter to maintain UX
    const fallbackText = generateOfflineLetter({
      name,
      relation,
      years,
      favoriteFoods,
      favoriteSongs,
      memories,
      language,
    });

    // Stream out the fallback letter smoothly
    const words = fallbackText.split(' ');
    for (const word of words) {
      sendEvent('chunk', { text: word + ' ' });
      await new Promise((r) => setTimeout(r, 40));
    }

    sendEvent('done', { done: true, fallbackUsed: true });
    res.end();
  }
});

// Bind to 0.0.0.0 for container / cloud hosting platforms (Render, etc.)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🕯️  Ofrenda: Yaadon ka Diya server running on port ${PORT}`);
  console.log(`📡 AI Endpoint: ${AI_BASE_URL} (Model: ${AI_MODEL})\n`);
});
