/**
 * OFRENDA: YAADON KA DIYA
 * Virtual Remembrance Altar Builder
 * Dev.to Hacktoberfest Open-Source AI Challenge Week 4
 */

(() => {
  'use strict';

  // --- Constants & Storage Keys ---
  const STORAGE_KEY = 'ofrenda_yaadon_ka_diya_altars_v1';
  const ACTIVE_ID_KEY = 'ofrenda_yaadon_ka_diya_active_id_v1';

  // --- Sample Tribute Data ---
  const SAMPLE_TRIBUTES = [
    {
      name: 'Dadi Savitri Devi',
      relation: 'Dadi (Grandmother)',
      years: '1940 – 2021',
      foods: 'Garam garam jalebi, Masala chai, Aloo ke parathe',
      songs: 'Lag Ja Gale (Lata Mangeshkar), Piya Tose Naina Lage Re',
      memories: 'Rolling out round rotis together every Sunday morning; her silver glass always full of tea; laughing till her glasses slid down her nose.',
      language: 'hinglish',
      tone: 'gentle',
    },
    {
      name: 'Abuelito Mateo',
      relation: 'Grandfather',
      years: '1938 – 2019',
      foods: 'Pan de muerto, Tamales de mole, Café de olla',
      songs: 'Amor Eterno, Cielito Lindo, Vicente Fernández',
      memories: 'Tuning his old pocket radio on the porch at sunset; whistling while tending his marigolds; giving the warmest hugs with calloused hands.',
      language: 'english',
      tone: 'poetic',
    }
  ];

  // --- DOM Elements ---
  const form = document.getElementById('ofrenda-form');
  const photoInput = document.getElementById('photo-input');
  const photoDropzone = document.getElementById('photo-dropzone');
  const dropzonePreview = document.getElementById('dropzone-preview');
  const dropzonePlaceholder = document.getElementById('dropzone-placeholder');
  const previewImage = document.getElementById('preview-image');
  const removePhotoBtn = document.getElementById('remove-photo-btn');

  // Input Fields
  const inputName = document.getElementById('person-name');
  const inputRelation = document.getElementById('person-relation');
  const inputYears = document.getElementById('person-years');
  const inputFoods = document.getElementById('person-foods');
  const inputSongs = document.getElementById('person-songs');
  const inputMemories = document.getElementById('person-memories');
  const selectLanguage = document.getElementById('letter-language');
  const selectTone = document.getElementById('letter-tone');

  // Buttons
  const submitBtn = document.getElementById('submit-btn');
  const fillExampleBtn = document.getElementById('fill-example-btn');
  const newOfrendaBtn = document.getElementById('new-ofrenda-btn');
  const addCandleBtn = document.getElementById('add-candle-btn');
  const downloadLetterBtn = document.getElementById('download-letter-btn');
  const downloadAltarPngBtn = document.getElementById('download-altar-png-btn');
  const copyLetterBtn = document.getElementById('copy-letter-btn');

  // Altar Display Elements
  const altarCaptureStage = document.getElementById('altar-capture-stage');
  const altarDisplayName = document.getElementById('altar-display-name');
  const altarDisplayRelation = document.getElementById('altar-display-relation');
  const altarDisplayYears = document.getElementById('altar-display-years');
  const altarPhotoDisplay = document.getElementById('altar-photo-display');
  const foodsContainer = document.getElementById('foods-container');
  const songsContainer = document.getElementById('songs-container');
  const memoriesContainer = document.getElementById('memories-container');
  const additionalDiyasShelf = document.getElementById('additional-diyas-shelf');
  const mainDiya = document.getElementById('main-diya');

  // Letter & Streaming Elements
  const letterContent = document.getElementById('letter-content');
  const letterCard = document.getElementById('letter-card');
  const generationStatus = document.getElementById('generation-status');
  const generationStatusText = document.getElementById('generation-status-text');
  const offlineNote = document.getElementById('offline-note');
  const aiModelBadge = document.getElementById('ai-model-badge');
  const savedAltarsTabs = document.getElementById('saved-altars-tabs');

  // --- State ---
  let altars = [];
  let currentAltarId = null;
  let activePhotoBase64 = null;
  let isGenerating = false;

  // --- Initialize App ---
  async function init() {
    loadAltarsFromStorage();
    checkBackendConfig();
    setupPetals();
    setupEventListeners();

    if (altars.length === 0) {
      // Create initial ofrenda with sample tribute
      createOfrendaFromData(SAMPLE_TRIBUTES[0]);
    } else {
      const savedActiveId = localStorage.getItem(ACTIVE_ID_KEY);
      const toLoad = altars.find(a => a.id === savedActiveId) || altars[0];
      loadAltarIntoView(toLoad.id);
    }
  }

  // --- Fetch Backend Config ---
  async function checkBackendConfig() {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data.model) {
          aiModelBadge.innerHTML = `<span class="pulse-dot"></span> Open Model: ${escapeHtml(data.model)} (${data.isLocal ? 'Ollama' : 'Cloud Endpoint'})`;
        }
      }
    } catch (e) {
      console.warn('Config endpoint not reached; running locally.');
    }
  }

  // --- Storage Management ---
  function loadAltarsFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      altars = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to parse altars from localStorage', e);
      altars = [];
    }
  }

  function saveAltarsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(altars));
      if (currentAltarId) {
        localStorage.setItem(ACTIVE_ID_KEY, currentAltarId);
      }
      renderTabs();
    } catch (e) {
      console.error('Failed to save altars to localStorage', e);
    }
  }

  function getCurrentAltar() {
    return altars.find(a => a.id === currentAltarId) || null;
  }

  // --- Render Tabs ---
  function renderTabs() {
    savedAltarsTabs.innerHTML = '';
    altars.forEach(altar => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `altar-tab-btn ${altar.id === currentAltarId ? 'active' : ''}`;
      
      const titleSpan = document.createElement('span');
      titleSpan.textContent = `🪔 ${altar.name || 'Untitled Ofrenda'}`;
      btn.appendChild(titleSpan);

      // Only allow delete if more than one altar exists
      if (altars.length > 1) {
        const delBtn = document.createElement('span');
        delBtn.className = 'altar-tab-delete';
        delBtn.innerHTML = '&times;';
        delBtn.title = 'Remove this ofrenda';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteOfrenda(altar.id);
        });
        btn.appendChild(delBtn);
      }

      btn.addEventListener('click', () => {
        loadAltarIntoView(altar.id);
      });

      savedAltarsTabs.appendChild(btn);
    });
  }

  function createOfrendaFromData(data = {}) {
    const id = 'ofrenda_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const newAltar = {
      id,
      name: data.name || '',
      relation: data.relation || '',
      years: data.years || '',
      foods: data.foods || '',
      songs: data.songs || '',
      memories: data.memories || '',
      language: data.language || 'hinglish',
      tone: data.tone || 'gentle',
      photo: data.photo || null,
      letter: data.letter || '',
      extraDiyas: data.extraDiyas || [],
      createdAt: new Date().toISOString()
    };
    altars.push(newAltar);
    saveAltarsToStorage();
    loadAltarIntoView(id);
  }

  function deleteOfrenda(id) {
    if (confirm('Are you sure you want to extinguish and remove this ofrenda?')) {
      altars = altars.filter(a => a.id !== id);
      if (currentAltarId === id) {
        currentAltarId = altars[0]?.id || null;
      }
      saveAltarsToStorage();
      if (currentAltarId) {
        loadAltarIntoView(currentAltarId);
      }
    }
  }

  // --- Load Altar into View ---
  function loadAltarIntoView(id) {
    currentAltarId = id;
    const altar = getCurrentAltar();
    if (!altar) return;

    // Fill Form Inputs
    inputName.value = altar.name || '';
    inputRelation.value = altar.relation || '';
    inputYears.value = altar.years || '';
    inputFoods.value = altar.foods || '';
    inputSongs.value = altar.songs || '';
    inputMemories.value = altar.memories || '';
    selectLanguage.value = altar.language || 'hinglish';
    selectTone.value = altar.tone || 'gentle';

    // Photo
    activePhotoBase64 = altar.photo || null;
    updatePhotoViews(activePhotoBase64);

    // Letter
    if (altar.letter) {
      letterContent.innerText = altar.letter;
      downloadLetterBtn.disabled = false;
      copyLetterBtn.disabled = false;
    } else {
      letterContent.innerHTML = `
        <p class="letter-placeholder">
          Fill in your loved one's details and click <strong>"Light the Diya"</strong>. 
          The open-weight model will write a tender, personal remembrance letter honoring their spirit 
          using only the memories you provided.
        </p>
      `;
      downloadLetterBtn.disabled = true;
      copyLetterBtn.disabled = true;
    }

    // Refresh Altar Visuals
    updateAltarVisuals();
    renderTabs();
  }

  // --- Sync Inputs to Altar Visuals ---
  function updateAltarVisuals() {
    const altar = getCurrentAltar();
    const nameVal = inputName.value.trim() || 'Beloved Ancestor';
    const relVal = inputRelation.value.trim() || 'Forever in our hearts';
    const yearsVal = inputYears.value.trim() || 'Across All Time';

    altarDisplayName.textContent = nameVal;
    altarDisplayRelation.textContent = relVal;
    altarDisplayYears.textContent = yearsVal;

    // Update Foods on Tier 2
    const foodsRaw = inputFoods.value.trim();
    foodsContainer.innerHTML = '';
    if (foodsRaw) {
      const foodItems = foodsRaw.split(',').map(s => s.trim()).filter(Boolean);
      foodItems.forEach(food => {
        const card = document.createElement('div');
        card.className = 'offering-card';
        card.innerHTML = `
          <span class="offering-icon">🍲</span>
          <span class="offering-name">${escapeHtml(food)}</span>
        `;
        foodsContainer.appendChild(card);
      });
    } else {
      foodsContainer.innerHTML = `
        <div class="offering-card empty-state">
          <span class="offering-icon">🍲</span>
          <span class="offering-name">Favorite Foods</span>
          <span class="offering-desc">Aroma of their favorite dishes</span>
        </div>
      `;
    }

    // Update Songs on Tier 3
    const songsRaw = inputSongs.value.trim();
    songsContainer.innerHTML = '';
    if (songsRaw) {
      const songItems = songsRaw.split(',').map(s => s.trim()).filter(Boolean);
      songItems.forEach(song => {
        const card = document.createElement('div');
        card.className = 'offering-card song-card';
        card.innerHTML = `
          <span class="offering-icon">🎵</span>
          <span class="offering-name">${escapeHtml(song)}</span>
        `;
        songsContainer.appendChild(card);
      });
    } else {
      songsContainer.innerHTML = `
        <div class="offering-card song-card empty-state">
          <span class="offering-icon">🎵</span>
          <span class="offering-name">Favorite Melodies</span>
          <span class="offering-desc">The songs they loved to sing</span>
        </div>
      `;
    }

    // Update Memories Blossoms
    const memoriesRaw = inputMemories.value.trim();
    memoriesContainer.innerHTML = '';
    if (memoriesRaw) {
      const memLines = memoriesRaw.split(/[;.\n]+/).map(s => s.trim()).filter(s => s.length > 3);
      memLines.slice(0, 3).forEach(mem => {
        const blossom = document.createElement('div');
        blossom.className = 'memory-blossom';
        blossom.innerHTML = `<span>🌸 ${escapeHtml(mem)}</span>`;
        memoriesContainer.appendChild(blossom);
      });
    } else {
      memoriesContainer.innerHTML = `
        <div class="memory-blossom empty-state">
          <span>🌸 Sacred memories resting here</span>
        </div>
      `;
    }

    // Render Additional Diyas
    renderExtraDiyas(altar?.extraDiyas || []);
  }

  function renderExtraDiyas(diyasList) {
    additionalDiyasShelf.innerHTML = '';
    if (!diyasList || diyasList.length === 0) return;

    diyasList.forEach((diya, index) => {
      const item = document.createElement('div');
      item.className = 'extra-candle-item';
      item.innerHTML = `
        <div class="side-diya lit">
          <div class="diya-flame"><div class="flame-inner"></div></div>
          <div class="diya-bowl small-bowl"></div>
        </div>
        <span class="extra-candle-caption" title="${escapeHtml(diya.name)}">${escapeHtml(diya.name)}</span>
      `;
      item.addEventListener('click', () => {
        if (confirm(`Extinguish candle for "${diya.name}"?`)) {
          const altar = getCurrentAltar();
          if (altar) {
            altar.extraDiyas.splice(index, 1);
            saveAltarsToStorage();
            renderExtraDiyas(altar.extraDiyas);
          }
        }
      });
      additionalDiyasShelf.appendChild(item);
    });
  }

  // --- Photo Handling ---
  function updatePhotoViews(base64) {
    if (base64) {
      previewImage.src = base64;
      dropzonePreview.style.display = 'inline-block';
      dropzonePlaceholder.style.display = 'none';

      altarPhotoDisplay.innerHTML = `<img src="${base64}" alt="Loved One Portrait">`;
    } else {
      previewImage.src = '';
      dropzonePreview.style.display = 'none';
      dropzonePlaceholder.style.display = 'flex';

      altarPhotoDisplay.innerHTML = `
        <div class="frame-placeholder">
          <span class="sacred-symbol">🕉️</span>
          <span class="frame-placeholder-text">Portrait of Loved One</span>
        </div>
      `;
    }
  }

  function handlePhotoSelected(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      activePhotoBase64 = e.target.result;
      updatePhotoViews(activePhotoBase64);
      const altar = getCurrentAltar();
      if (altar) {
        altar.photo = activePhotoBase64;
        saveAltarsToStorage();
      }
    };
    reader.readAsDataURL(file);
  }

  // --- Auto-Save on Field Change ---
  function syncFormDataToState() {
    const altar = getCurrentAltar();
    if (!altar) return;

    altar.name = inputName.value.trim();
    altar.relation = inputRelation.value.trim();
    altar.years = inputYears.value.trim();
    altar.foods = inputFoods.value.trim();
    altar.songs = inputSongs.value.trim();
    altar.memories = inputMemories.value.trim();
    altar.language = selectLanguage.value;
    altar.tone = selectTone.value;

    saveAltarsToStorage();
    updateAltarVisuals();
  }

  // --- Generate Remembrance Letter (SSE Streaming) ---
  async function generateLetter() {
    if (isGenerating) return;

    const name = inputName.value.trim();
    if (!name) {
      inputName.focus();
      alert('Please enter your loved one\'s name before lighting the diya.');
      return;
    }

    syncFormDataToState();

    isGenerating = true;
    submitBtn.disabled = true;
    downloadLetterBtn.disabled = true;
    copyLetterBtn.disabled = true;
    offlineNote.style.display = 'none';
    offlineNote.textContent = '';

    // Animate central diya flame
    mainDiya.classList.add('lit');
    const aura = mainDiya.querySelector('.diya-aura');
    if (aura) {
      aura.style.animation = 'aura-breathe 0.8s ease-in-out infinite alternate';
    }

    generationStatus.style.display = 'flex';
    generationStatusText.textContent = `Lighting diya & weaving memories with open-weight Gemma...`;
    letterContent.innerText = '';

    const payload = {
      name,
      relation: inputRelation.value.trim(),
      years: inputYears.value.trim(),
      favoriteFoods: inputFoods.value.trim(),
      favoriteSongs: inputSongs.value.trim(),
      memories: inputMemories.value.trim(),
      language: selectLanguage.value,
      tone: selectTone.value,
    };

    let accumulatedText = '';

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const block of lines) {
          if (!block.trim()) continue;

          let eventType = 'message';
          let dataStr = '';

          const blockLines = block.split('\n');
          for (const line of blockLines) {
            if (line.startsWith('event: ')) {
              eventType = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              dataStr = line.slice(6);
            }
          }

          if (eventType === 'status_note' && dataStr) {
            try {
              const noteData = JSON.parse(dataStr);
              if (noteData.message) {
                offlineNote.textContent = noteData.message;
                offlineNote.style.display = 'block';
              }
            } catch (e) {}
          }

          if (eventType === 'chunk' && dataStr) {
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                letterContent.innerText = accumulatedText;
                // Auto scroll letter card slightly
                letterCard.scrollTop = letterCard.scrollHeight;
              }
            } catch (e) {}
          }

          if (eventType === 'done') {
            break;
          }
        }
      }

      // Save generated letter into altar state
      const altar = getCurrentAltar();
      if (altar) {
        altar.letter = accumulatedText.trim();
        saveAltarsToStorage();
      }

    } catch (err) {
      console.error('Streaming error:', err);
      offlineNote.textContent = `Notice: Could not connect to the AI model stream (${err.message}). Using local heartfelt reflection.`;
      offlineNote.style.display = 'block';

      // Fallback letter if entire fetch failed
      const fallbackMsg = `Aaj ofrenda par aapke naam ka diya roshan kiya hai, pyaare ${name}. Aapki meethi yaadein aur muskurahat hamesha hamare dilon me chiraag banke jalti rahengi. Sukoon aur prem se aapko yaad karte hain.`;
      accumulatedText = fallbackMsg;
      letterContent.innerText = fallbackMsg;

      const altar = getCurrentAltar();
      if (altar) {
        altar.letter = fallbackMsg;
        saveAltarsToStorage();
      }
    } finally {
      isGenerating = false;
      submitBtn.disabled = false;
      downloadLetterBtn.disabled = false;
      copyLetterBtn.disabled = false;
      generationStatus.style.display = 'none';

      if (aura) {
        aura.style.animation = 'aura-breathe 2.4s ease-in-out infinite alternate';
      }
    }
  }

  // --- Download Letter (.txt) ---
  function downloadLetterTxt() {
    const altar = getCurrentAltar();
    const text = letterContent.innerText.trim();
    if (!text) return;

    const name = inputName.value.trim() || 'Loved One';
    const relation = inputRelation.value.trim() || '';
    const years = inputYears.value.trim() || '';
    const foods = inputFoods.value.trim() || '';
    const songs = inputSongs.value.trim() || '';

    const fileContent = `======================================================================
OFRENDA: YAADON KA DIYA (Remembrance Tribute)
======================================================================
Loved One: ${name} ${relation ? `(${relation})` : ''}
${years ? `Years: ${years}\n` : ''}${foods ? `Offerings (Favorite Foods): ${foods}\n` : ''}${songs ? `Melodies (Favorite Songs): ${songs}\n` : ''}
----------------------------------------------------------------------
CHITTHI (LETTER OF REMEMBRANCE):
----------------------------------------------------------------------
${text}

======================================================================
Created with "Ofrenda: Yaadon ka Diya"
Theme: Ghost in the Machine / Día de los Muertos
Dev.to Hacktoberfest Open-Source AI Challenge
Privacy: 100% on your device with Open-Weight Gemma
======================================================================
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chitthi-${sanitizeFileName(name)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Download Altar as PNG (html2canvas) ---
  async function downloadAltarPng() {
    const name = inputName.value.trim() || 'Loved One';
    const originalText = downloadAltarPngBtn.innerHTML;
    downloadAltarPngBtn.innerHTML = `<span>Capturing Altar...</span>`;
    downloadAltarPngBtn.disabled = true;

    try {
      if (typeof html2canvas === 'function') {
        const canvas = await html2canvas(altarCaptureStage, {
          backgroundColor: '#070913',
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const imageUri = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imageUri;
        a.download = `ofrenda-${sanitizeFileName(name)}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert('PNG export library is loading. Please try again in a moment.');
      }
    } catch (err) {
      console.error('Error generating altar PNG', err);
      alert('Unable to generate image snapshot: ' + err.message);
    } finally {
      downloadAltarPngBtn.innerHTML = originalText;
      downloadAltarPngBtn.disabled = false;
    }
  }

  // --- Copy Letter to Clipboard ---
  async function copyLetterToClipboard() {
    const text = letterContent.innerText.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      const originalText = copyLetterBtn.textContent;
      copyLetterBtn.textContent = 'Copied! ✓';
      setTimeout(() => {
        copyLetterBtn.textContent = originalText;
      }, 2000);
    } catch (e) {
      alert('Could not copy automatically. You can highlight and copy the text.');
    }
  }

  // --- Add Extra Candle / Diya ---
  function promptAddExtraCandle() {
    const candleName = prompt('Enter a name or tribute for this extra candle (e.g., "For Chachi", "For Dada ji", "For all ancestors"):');
    if (!candleName || !candleName.trim()) return;

    const altar = getCurrentAltar();
    if (altar) {
      if (!altar.extraDiyas) altar.extraDiyas = [];
      altar.extraDiyas.push({
        id: 'diya_' + Date.now(),
        name: candleName.trim(),
      });
      saveAltarsToStorage();
      renderExtraDiyas(altar.extraDiyas);
    }
  }

  // --- Setup Floating Marigold Petals ---
  function setupPetals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = document.getElementById('petals-canvas');
    if (!container) return;

    const petalSymbols = ['🏵️', '🌼', '🌺'];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'floating-petal';
      petal.textContent = petalSymbols[i % petalSymbols.length];
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${8 + Math.random() * 10}s`;
      petal.style.animationDelay = `${Math.random() * 8}s`;
      petal.style.fontSize = `${0.85 + Math.random() * 0.7}rem`;
      container.appendChild(petal);
    }
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Form Inputs live sync
    const liveSyncInputs = [inputName, inputRelation, inputYears, inputFoods, inputSongs, inputMemories];
    liveSyncInputs.forEach(input => {
      input.addEventListener('input', () => {
        syncFormDataToState();
      });
    });

    selectLanguage.addEventListener('change', syncFormDataToState);
    selectTone.addEventListener('change', syncFormDataToState);

    // Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      generateLetter();
    });

    // Example Tribute Button
    fillExampleBtn.addEventListener('click', () => {
      const sample = SAMPLE_TRIBUTES[Math.floor(Math.random() * SAMPLE_TRIBUTES.length)];
      inputName.value = sample.name;
      inputRelation.value = sample.relation;
      inputYears.value = sample.years;
      inputFoods.value = sample.foods;
      inputSongs.value = sample.songs;
      inputMemories.value = sample.memories;
      selectLanguage.value = sample.language;
      selectTone.value = sample.tone;
      syncFormDataToState();
    });

    // New Ofrenda Button
    newOfrendaBtn.addEventListener('click', () => {
      createOfrendaFromData({
        name: 'New Loved One',
        relation: 'Relation',
      });
    });

    // Photo Upload Triggers
    photoDropzone.addEventListener('click', (e) => {
      if (e.target !== removePhotoBtn) {
        photoInput.click();
      }
    });

    photoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handlePhotoSelected(e.target.files[0]);
      }
    });

    // Drag and drop photo
    photoDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      photoDropzone.style.borderColor = 'var(--marigold-glow)';
    });

    photoDropzone.addEventListener('dragleave', () => {
      photoDropzone.style.borderColor = '';
    });

    photoDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      photoDropzone.style.borderColor = '';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handlePhotoSelected(e.dataTransfer.files[0]);
      }
    });

    removePhotoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      activePhotoBase64 = null;
      photoInput.value = '';
      updatePhotoViews(null);
      const altar = getCurrentAltar();
      if (altar) {
        altar.photo = null;
        saveAltarsToStorage();
      }
    });

    // Actions
    addCandleBtn.addEventListener('click', promptAddExtraCandle);
    downloadLetterBtn.addEventListener('click', downloadLetterTxt);
    downloadAltarPngBtn.addEventListener('click', downloadAltarPng);
    copyLetterBtn.addEventListener('click', copyLetterToClipboard);
  }

  // --- Utilities ---
  function sanitizeFileName(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

