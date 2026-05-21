const HOLE_COUNT = 9;
const GAME_DURATION = 30;
const BOMB_CHANCE = 0.08;
const GOLD_CHANCE = 0.08;
const ALIEN_CHANCE = 0.12;
const MOLE_POINTS = 1;
const ALIEN_POINTS = 5;
const GOLD_POINTS = 10;
const BOMB_POINTS = -5;
const HIGHSCORE_KEY = "moleGameHighScore";
const RANKING_KEY = "moleGameRanking";
const COMBO_MULTIPLIER_2 = 3;
const COMBO_MULTIPLIER_3 = 6;

const DIFFICULTY = {
  easy: { minSpawn: 700, maxSpawn: 1200, visible: 1500, label: "かんたん" },
  normal: { minSpawn: 400, maxSpawn: 900, visible: 1200, label: "ふつう" },
  hard: { minSpawn: 250, maxSpawn: 550, visible: 900, label: "むずかしい" },
};

const CHARACTER_HTML = {
  mole: `
    <div class="character mole">
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout">
            <span class="char-nose-star"></span>
          </span>
          <span class="char-whisker char-whisker--l"></span>
          <span class="char-whisker char-whisker--r"></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  alien: `
    <div class="character alien">
      <div class="char-body">
        <div class="char-head">
          <span class="char-antenna char-antenna--l"><span class="char-antenna-ball"></span></span>
          <span class="char-antenna char-antenna--r"><span class="char-antenna-ball"></span></span>
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-mouth"></span>
        </div>
      </div>
    </div>
  `,
  gold: `
    <div class="character gold">
      <span class="char-aura"></span>
      <span class="char-crown"></span>
      <span class="char-spark char-spark--1"></span>
      <span class="char-spark char-spark--2"></span>
      <span class="char-spark char-spark--3"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout">
            <span class="char-nose-star"></span>
          </span>
          <span class="char-whisker char-whisker--l"></span>
          <span class="char-whisker char-whisker--r"></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  bomb: `
    <div class="character bomb">
      <div class="char-bomb-wrap">
        <span class="char-fuse"></span>
        <div class="char-bomb-body">
          <span class="char-highlight"></span>
          <span class="char-eye char-eye--l"></span>
          <span class="char-eye char-eye--r"></span>
          <span class="char-mouth char-mouth--worry"></span>
          <span class="char-sweat"></span>
        </div>
      </div>
    </div>
  `,
};

const gameContainer = document.getElementById("game-container");
const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const highscoreEl = document.getElementById("highscore");
const startBtn = document.getElementById("start-btn");
const messageEl = document.getElementById("message");
const comboDisplay = document.getElementById("combo-display");
const comboCountEl = document.getElementById("combo-count");
const comboMultiplierEl = document.getElementById("combo-multiplier");
const rankingPanel = document.getElementById("ranking-panel");
const rankingList = document.getElementById("ranking-list");
const rankingDateEl = document.getElementById("ranking-date");
const diffButtons = document.querySelectorAll(".diff-btn");
const countdownOverlay = document.getElementById("countdown-overlay");
const resultOverlay = document.getElementById("result-overlay");
const resultScoreEl = document.getElementById("result-score");
const resultHighscoreEl = document.getElementById("result-highscore");
const resultComboEl = document.getElementById("result-combo");
const resultRankEl = document.getElementById("result-rank");
const resultCloseBtn = document.getElementById("result-close-btn");
const resultQuitBtn = document.getElementById("result-quit-btn");
const recordBanner = document.getElementById("record-banner");

const HIT_WORDS = ["ぺちっ！", "BONK!", "パン！", "ドン！", "ポン！", "バシッ！"];
const RANK_THRESHOLDS = [
  { rank: "S", min: 70 },
  { rank: "A", min: 45 },
  { rank: "B", min: 20 },
];

let holes = [];
let score = 0;
let highScore = 0;
let combo = 0;
let maxCombo = 0;
let timeLeft = GAME_DURATION;
let currentDifficulty = "normal";
let gameTimer = null;
let moleTimer = null;
let hideTimer = null;
let activeHole = null;
let isPlaying = false;
let audioCtx = null;
let bgmGainNode = null;
let sfxGainNode = null;
let bgmPlaying = false;
let bgmTimer = null;
let bgmStepIndex = 0;
let bgmNextTime = 0;

const BGM_VOLUME = 0.055;
const SFX_VOLUME = 0.18;
const BGM_BPM = 168;
const BGM_STEP = 60 / BGM_BPM / 2;

const BGM_MELODY = [
  523, 523, 659, 784, 659, 523, 494, 440,
  392, 494, 523, 659, 784, 880, 784, 659,
  523, 659, 784, 880, 988, 880, 784, 659,
  523, 494, 440, 494, 523, 659, 784, 659,
];

const BGM_BASS = [
  131, 131, 165, 196, 165, 131, 123, 110,
  98, 123, 131, 165, 196, 220, 196, 165,
  131, 165, 196, 220, 247, 220, 196, 165,
  131, 123, 110, 123, 131, 165, 196, 165,
];

let minSpawn = DIFFICULTY.normal.minSpawn;
let maxSpawn = DIFFICULTY.normal.maxSpawn;
let moleVisibleTime = DIFFICULTY.normal.visible;

// --- Web Audio API（効果音 + BGM） ---

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  setupAudioNodes();
}

function setupAudioNodes() {
  if (!audioCtx || bgmGainNode) return;

  bgmGainNode = audioCtx.createGain();
  sfxGainNode = audioCtx.createGain();
  bgmGainNode.gain.value = BGM_VOLUME;
  sfxGainNode.gain.value = SFX_VOLUME;
  bgmGainNode.connect(audioCtx.destination);
  sfxGainNode.connect(audioCtx.destination);
}

function getSfxOut() {
  return sfxGainNode || audioCtx?.destination;
}

function getBgmOut() {
  return bgmGainNode || audioCtx?.destination;
}

function playTone(freq, start, duration, type = "sine", volume = 0.25) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  osc.connect(gain);
  gain.connect(getSfxOut());

  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playSweep(startFreq, endFreq, start, duration, type = "sine", volume = 0.2) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, start);
  osc.frequency.exponentialRampToValueAtTime(endFreq, start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  osc.connect(gain);
  gain.connect(getSfxOut());

  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playNoiseBurst(start, duration, volume = 0.3) {
  if (!audioCtx) return;

  const sampleRate = audioCtx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }

  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.value = 800;

  source.buffer = buffer;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(getSfxOut());

  source.start(start);
  source.stop(start + duration);
}

function playBgmNote(freq, start, duration, type = "square", level = 1) {
  if (!audioCtx || !bgmPlaying) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.45 * level, start);
  gain.gain.setValueAtTime(0.35 * level, start + duration * 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  osc.connect(gain);
  gain.connect(getBgmOut());

  osc.start(start);
  osc.stop(start + duration + 0.01);
}

function scheduleBgm() {
  if (!bgmPlaying || !audioCtx) return;

  const ahead = 0.35;
  while (bgmNextTime < audioCtx.currentTime + ahead) {
    const idx = bgmStepIndex % BGM_MELODY.length;
    const melodyFreq = BGM_MELODY[idx];
    const bassFreq = BGM_BASS[idx];

    playBgmNote(melodyFreq, bgmNextTime, BGM_STEP * 0.88, "square", 1);
    if (bgmStepIndex % 2 === 0) {
      playBgmNote(bassFreq, bgmNextTime, BGM_STEP * 1.05, "triangle", 0.55);
    }

    bgmStepIndex++;
    bgmNextTime += BGM_STEP;
  }
}

function startBgm() {
  if (!audioCtx) return;
  stopBgm();
  bgmPlaying = true;
  bgmStepIndex = 0;
  bgmNextTime = audioCtx.currentTime + 0.05;
  scheduleBgm();
  bgmTimer = setInterval(scheduleBgm, 16);
}

function stopBgm() {
  bgmPlaying = false;
  if (bgmTimer) {
    clearInterval(bgmTimer);
    bgmTimer = null;
  }
}

function playStartSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const notes = [392, 494, 587, 784];
  notes.forEach((freq, i) => {
    playTone(freq, t + i * 0.09, 0.14, "sine", 0.22);
    playTone(freq * 2, t + i * 0.09, 0.1, "triangle", 0.08);
  });
}

function playCountdownTick(isGo) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  if (isGo) {
    playTone(784, t, 0.18, "square", 0.2);
    playTone(988, t + 0.05, 0.14, "triangle", 0.14);
    return;
  }
  playTone(440, t, 0.1, "sine", 0.18);
  playTone(220, t, 0.06, "triangle", 0.08);
}

function playComboSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playTone(880, t, 0.08, "triangle", 0.16);
  playTone(1108, t + 0.04, 0.1, "sine", 0.12);
  playTone(1318, t + 0.08, 0.06, "triangle", 0.1);
}

function playGoldSpawnSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [523, 659, 784, 1047].forEach((freq, i) => {
    playTone(freq, t + i * 0.07, 0.14, "triangle", 0.14);
  });
  playSweep(400, 1200, t, 0.2, "sine", 0.1);
}

function playMoleHitSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playSweep(380, 220, t, 0.06, "sine", 0.26);
  playTone(140, t, 0.04, "square", 0.12);
  playTone(520, t + 0.02, 0.04, "triangle", 0.08);
}

function playAlienHitSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playSweep(1200, 1800, t, 0.08, "sine", 0.25);
  playTone(2000, t + 0.04, 0.06, "triangle", 0.15);
  playTone(2400, t + 0.07, 0.04, "sine", 0.1);
}

function playGoldHitSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [1047, 1319, 1568, 2093].forEach((freq, i) => {
    playTone(freq, t + i * 0.05, 0.12, "triangle", 0.18);
    playTone(freq * 1.5, t + i * 0.05 + 0.02, 0.08, "sine", 0.1);
  });
}

function playBombHitSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playNoiseBurst(t, 0.25, 0.32);
  playSweep(180, 45, t, 0.3, "sawtooth", 0.2);
  playTone(60, t + 0.05, 0.2, "square", 0.16);
}

function playEndSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [659, 523, 440, 349].forEach((freq, i) => {
    playTone(freq, t + i * 0.18, 0.28, "sine", 0.22);
  });
  playTone(262, t + 0.75, 0.5, "triangle", 0.15);
}

// --- スコア保存 ---

function loadHighScore() {
  const saved = localStorage.getItem(HIGHSCORE_KEY);
  highScore = saved ? parseInt(saved, 10) : 0;
  highscoreEl.textContent = highScore;
}

function saveHighScore(value) {
  highScore = value;
  localStorage.setItem(HIGHSCORE_KEY, String(value));
  highscoreEl.textContent = highScore;
}

function loadRanking() {
  try {
    return JSON.parse(localStorage.getItem(RANKING_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRanking(list) {
  localStorage.setItem(RANKING_KEY, JSON.stringify(list));
}

function addToRanking(entry) {
  const list = loadRanking();
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  saveRanking(list.slice(0, 5));
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function getTodayLabel() {
  const d = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）`;
}

function getRankBadge(rank) {
  if (rank === 1) return '<span class="ranking-crown" aria-hidden="true">👑</span>';
  if (rank === 2) return '<span class="ranking-crown" aria-hidden="true">🥈</span>';
  if (rank === 3) return '<span class="ranking-crown" aria-hidden="true">🥉</span>';
  return "";
}

function getRankRowClass(rank) {
  if (rank === 1) return "rank-first";
  if (rank === 2) return "rank-second";
  if (rank === 3) return "rank-third";
  return "";
}

function renderRanking() {
  const list = loadRanking();
  rankingPanel.classList.remove("hidden");
  rankingDateEl.textContent = getTodayLabel();

  if (list.length === 0) {
    rankingList.innerHTML =
      '<li class="ranking-empty">まだ記録がありません</li>';
    return;
  }

  rankingList.innerHTML = list
    .map((item, i) => {
      const rank = i + 1;
      return `
      <li class="${getRankRowClass(rank)}">
        <span class="ranking-rank-badge">${rank}位</span>
        ${getRankBadge(rank)}
        <span class="rank-body">
          <span class="rank-score">${item.score} 点</span>
          <span class="rank-meta">${DIFFICULTY[item.difficulty]?.label || item.difficulty} · ${formatDate(item.date)}</span>
        </span>
      </li>
    `;
    })
    .join("");
}

function getScoreRank(score) {
  for (const { rank, min } of RANK_THRESHOLDS) {
    if (score >= min) return rank;
  }
  return "C";
}

// --- コンボ ---

function getMultiplier() {
  if (combo >= COMBO_MULTIPLIER_3) return 3;
  if (combo >= COMBO_MULTIPLIER_2) return 2;
  return 1;
}

function updateRainbowGlow() {
  gameContainer.classList.toggle("combo-rainbow", combo >= 5);
}

function updateComboDisplay() {
  comboCountEl.textContent = combo;
  const mult = getMultiplier();

  if (mult >= 2) {
    comboMultiplierEl.textContent = `${mult}倍！`;
    comboDisplay.classList.add("hot");
  } else {
    comboMultiplierEl.textContent = "";
    comboDisplay.classList.remove("hot");
  }
  updateRainbowGlow();
}

function resetCombo() {
  combo = 0;
  updateComboDisplay();
}

function addCombo() {
  combo++;
  if (combo > maxCombo) maxCombo = combo;
  updateComboDisplay();
  if (combo === 5 || (combo > 5 && combo % 5 === 0)) {
    playComboSound();
  }
}

// --- 難易度 ---

function applyDifficulty(key) {
  const settings = DIFFICULTY[key];
  minSpawn = settings.minSpawn;
  maxSpawn = settings.maxSpawn;
  moleVisibleTime = settings.visible;
}

function setDifficulty(key) {
  currentDifficulty = key;
  applyDifficulty(key);
  diffButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.difficulty === key);
  });
}

diffButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isPlaying) return;
    setDifficulty(btn.dataset.difficulty);
  });
});

// --- キャラクター ---

function pickCharacterType() {
  const r = Math.random();
  if (r < BOMB_CHANCE) return "bomb";
  if (r < BOMB_CHANCE + GOLD_CHANCE) return "gold";
  if (r < BOMB_CHANCE + GOLD_CHANCE + ALIEN_CHANCE) return "alien";
  return "mole";
}

function getBasePoints(type) {
  switch (type) {
    case "alien":
      return ALIEN_POINTS;
    case "gold":
      return GOLD_POINTS;
    case "bomb":
      return BOMB_POINTS;
    default:
      return MOLE_POINTS;
  }
}

function setCharacter(hole, type) {
  const slot = hole.querySelector(".char-slot");
  slot.innerHTML = CHARACTER_HTML[type];
  hole.dataset.type = type;
  hole.classList.remove("type-mole", "type-alien", "type-gold", "type-bomb");
  hole.classList.add(`type-${type}`);
}

function clearCharacter(hole) {
  const slot = hole.querySelector(".char-slot");
  slot.innerHTML = "";
  hole.dataset.type = "";
  hole.classList.remove(
    "type-mole",
    "type-alien",
    "type-gold",
    "type-bomb",
    "up",
    "hit",
    "hit-gold-burst",
    "retracting"
  );
}

function retractCharacter(hole, onDone) {
  if (!hole.classList.contains("up") || hole.classList.contains("hit")) {
    clearCharacter(hole);
    onDone?.();
    return;
  }

  const slot = hole.querySelector(".char-slot");
  hole.classList.remove("up");
  hole.classList.add("retracting");

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    hole.classList.remove("retracting");
    clearCharacter(hole);
    onDone?.();
  };

  const onEnd = (e) => {
    if (e.target === slot && e.animationName === "slot-pop-down") {
      slot.removeEventListener("animationend", onEnd);
      finish();
    }
  };

  slot.addEventListener("animationend", onEnd);
  setTimeout(finish, 240);
}

function playHitSound(type) {
  switch (type) {
    case "alien":
      playAlienHitSound();
      break;
    case "gold":
      playGoldHitSound();
      break;
    case "bomb":
      playBombHitSound();
      break;
    default:
      playMoleHitSound();
  }
}

function spawnDirtBurst(hole) {
  const inner = hole.querySelector(".hole-inner");
  const count = 6;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const dir = i % 2 === 0 ? -1 : 1;
    p.className = i % 3 === 0 ? "dirt-particle dirt-particle--alt" : "dirt-particle";
    p.style.setProperty("--dx", `${dir * (10 + Math.random() * 22)}px`);
    p.style.setProperty("--dy", `${-2 - Math.random() * 14}px`);
    p.style.left = `${42 + Math.random() * 16}%`;
    inner.appendChild(p);
    setTimeout(() => p.remove(), 420);
  }
}

function showHitWord(hole, type) {
  if (type === "bomb") return;

  const inner = hole.querySelector(".hole-inner");
  const word = document.createElement("span");
  const text = HIT_WORDS[Math.floor(Math.random() * HIT_WORDS.length)];
  const isBonk = text === "BONK!";

  word.className = `hit-word${isBonk ? " hit-word--bonk" : ""}`;
  word.textContent = text;
  inner.appendChild(word);
  setTimeout(() => word.remove(), 560);
}

function triggerGoldSpawnFx(hole) {
  playGoldSpawnSound();
  hole.classList.add("gold-spawn");
  setTimeout(() => hole.classList.remove("gold-spawn"), 1400);
}

function hideRecordBanner() {
  recordBanner.classList.add("hidden");
  recordBanner.classList.remove("show");
}

function showRecordBanner() {
  recordBanner.classList.remove("hidden");
  recordBanner.classList.add("show");
  setTimeout(hideRecordBanner, 3200);
}

function hideResultOverlay() {
  resultOverlay.classList.add("hidden");
}

function returnToTitleScreen() {
  isPlaying = false;
  stopBgm();
  clearInterval(gameTimer);
  clearTimeout(moleTimer);
  clearHideTimer();
  gameTimer = null;
  moleTimer = null;
  activeHole = null;

  hideResultOverlay();
  hideRecordBanner();
  countdownOverlay.classList.add("hidden");
  gameContainer.classList.remove("combo-rainbow");

  score = 0;
  combo = 0;
  maxCombo = 0;
  timeLeft = GAME_DURATION;
  scoreEl.textContent = "0";
  timerEl.textContent = String(GAME_DURATION);
  updateComboDisplay();

  messageEl.textContent = "難易度を選んでスタート！";
  messageEl.classList.remove("game-over");

  startBtn.disabled = false;
  startBtn.textContent = "▶ スタート";
  diffButtons.forEach((btn) => (btn.disabled = false));

  rankingPanel.classList.add("hidden");

  holes.forEach((hole) => {
    hole.disabled = true;
    clearCharacter(hole);
  });
}

function showResultOverlay(finalScore, isNewRecord) {
  const rank = getScoreRank(finalScore);
  resultScoreEl.textContent = `${finalScore} 点`;
  resultHighscoreEl.textContent = `${highScore} 点`;
  resultComboEl.textContent = String(maxCombo);
  resultRankEl.textContent = rank;
  resultRankEl.className = `result-rank result-rank--${rank.toLowerCase()}`;

  resultOverlay.classList.remove("hidden");

  if (isNewRecord) {
    showRecordBanner();
  }
}

// --- ゲーム本体 ---

function createBoard() {
  board.innerHTML = "";
  holes = [];

  for (let i = 0; i < HOLE_COUNT; i++) {
    const hole = document.createElement("button");
    hole.className = "hole";
    hole.type = "button";
    hole.disabled = true;
    hole.setAttribute("aria-label", `穴 ${i + 1}`);
    hole.innerHTML = `
      <div class="hole-inner">
        <div class="hole-pit" aria-hidden="true"></div>
        <span class="hole-rim" aria-hidden="true"></span>
        <div class="char-slot"></div>
      </div>
    `;
    hole.addEventListener("click", () => whack(hole));
    board.appendChild(hole);
    holes.push(hole);
  }
}

function randomHole() {
  const available = holes.filter((h) => h !== activeHole);
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function missMole(hole) {
  if (hole.classList.contains("up") && !hole.classList.contains("hit")) {
    resetCombo();
  }
}

function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function showMole() {
  if (!isPlaying) return;

  if (activeHole) {
    missMole(activeHole);
    retractCharacter(activeHole);
  }

  const hole = randomHole();
  const type = pickCharacterType();

  activeHole = hole;
  setCharacter(hole, type);
  hole.classList.add("up");
  spawnDirtBurst(hole);

  if (type === "gold") {
    triggerGoldSpawnFx(hole);
  }

  clearHideTimer();
  hideTimer = setTimeout(() => {
    if (hole.classList.contains("up") && !hole.classList.contains("hit")) {
      missMole(hole);
      retractCharacter(hole, () => {
        if (activeHole === hole) activeHole = null;
      });
    }
  }, moleVisibleTime);

  const nextDelay = minSpawn + Math.random() * (maxSpawn - minSpawn);
  moleTimer = setTimeout(showMole, nextDelay);
}

function spawnStars(hole, type) {
  const inner = hole.querySelector(".hole-inner");
  const count = type === "gold" ? 8 : type === "bomb" ? 4 : 6;
  const colorClass =
    type === "gold"
      ? "hit-star--gold"
      : type === "bomb"
        ? "hit-star--bomb"
        : type === "alien"
          ? "hit-star--alien"
          : "";

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = `hit-star ${colorClass}`.trim();
    star.textContent = "★";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 28 + Math.random() * 22;
    star.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    star.style.setProperty("--ty", `${Math.sin(angle) * dist - 20}px`);
    star.style.left = "50%";
    star.style.top = "40%";
    inner.appendChild(star);
    setTimeout(() => star.remove(), 650);
  }
}

function showScorePop(hole, points) {
  const inner = hole.querySelector(".hole-inner");
  const pop = document.createElement("span");
  pop.className = "score-pop";
  if (points < 0) {
    pop.classList.add("score-pop--minus");
    pop.textContent = String(points);
  } else {
    pop.textContent = `+${points}`;
  }
  inner.appendChild(pop);
  setTimeout(() => pop.remove(), 750);
}

function shakeScreen(intensity = "normal") {
  gameContainer.classList.remove("shake", "shake--strong");
  void gameContainer.offsetWidth;
  gameContainer.classList.add(intensity === "strong" ? "shake--strong" : "shake");
  setTimeout(() => {
    gameContainer.classList.remove("shake", "shake--strong");
  }, 380);
}

function playHitEffects(hole, points, type) {
  spawnStars(hole, type);
  showScorePop(hole, points);
  shakeScreen(type === "gold" ? "strong" : type === "bomb" ? "normal" : "normal");

  if (type === "gold") {
    hole.classList.add("hit-gold-burst");
    setTimeout(() => hole.classList.remove("hit-gold-burst"), 550);
  }
}

function whack(hole) {
  if (!isPlaying) return;

  if (!hole.classList.contains("up")) {
    resetCombo();
    return;
  }

  const type = hole.dataset.type;
  const isBomb = type === "bomb";
  let points;

  if (isBomb) {
    resetCombo();
    points = BOMB_POINTS;
  } else {
    addCombo();
    points = getBasePoints(type) * getMultiplier();
  }

  hole.classList.add("hit");
  score += points;
  scoreEl.textContent = score;
  activeHole = null;
  clearHideTimer();
  playHitSound(type);
  playHitEffects(hole, points, type);
  showHitWord(hole, type);

  setTimeout(() => clearCharacter(hole), 320);
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function beginGameplay() {
  isPlaying = true;
  gameTimer = setInterval(updateTimer, 1000);
  startBgm();
  showMole();
}

function runCountdown(onDone) {
  const steps = [
    { text: "3", go: false },
    { text: "2", go: false },
    { text: "1", go: false },
    { text: "GO!", go: true },
  ];

  countdownOverlay.classList.remove("hidden", "countdown-go");
  let index = 0;

  function showStep() {
    if (index >= steps.length) {
      countdownOverlay.classList.add("hidden");
      countdownOverlay.classList.remove("countdown-pop", "countdown-go");
      onDone();
      return;
    }

    const step = steps[index];
    countdownOverlay.textContent = step.text;
    countdownOverlay.classList.toggle("countdown-go", step.go);
    countdownOverlay.classList.remove("countdown-pop");
    void countdownOverlay.offsetWidth;
    countdownOverlay.classList.add("countdown-pop");
    playCountdownTick(step.go);

    index++;
    setTimeout(showStep, step.go ? 650 : 750);
  }

  showStep();
}

function startGame() {
  if (isPlaying) return;

  initAudio();
  hideResultOverlay();
  hideRecordBanner();

  score = 0;
  combo = 0;
  maxCombo = 0;
  timeLeft = GAME_DURATION;
  scoreEl.textContent = "0";
  timerEl.textContent = String(GAME_DURATION);
  updateComboDisplay();
  messageEl.textContent = "準備中...";
  messageEl.classList.remove("game-over");
  rankingPanel.classList.add("hidden");
  startBtn.disabled = true;
  startBtn.textContent = "プレイ中...";
  diffButtons.forEach((btn) => (btn.disabled = true));

  holes.forEach((hole) => {
    hole.disabled = true;
    clearCharacter(hole);
  });

  runCountdown(() => {
    playStartSound();
    messageEl.textContent = "がんばって！";
    holes.forEach((hole) => {
      hole.disabled = false;
    });
    beginGameplay();
  });
}

function endGame() {
  isPlaying = false;
  stopBgm();
  clearInterval(gameTimer);
  clearTimeout(moleTimer);
  clearHideTimer();
  gameTimer = null;
  moleTimer = null;
  activeHole = null;
  gameContainer.classList.remove("combo-rainbow");

  holes.forEach((hole) => {
    hole.disabled = true;
    clearCharacter(hole);
  });

  playEndSound();

  const finalScore = score;
  const isNewRecord = finalScore > highScore;
  if (isNewRecord) {
    saveHighScore(finalScore);
  }

  if (finalScore > 0) {
    addToRanking({
      score: finalScore,
      date: new Date().toISOString(),
      difficulty: currentDifficulty,
    });
  }

  startBtn.disabled = false;
  startBtn.textContent = "▶ もう一度";
  diffButtons.forEach((btn) => (btn.disabled = false));

  const rank = getScoreRank(finalScore);
  messageEl.innerHTML = isNewRecord
    ? `🎉 NEW RECORD! ${finalScore}点（ランク ${rank}）`
    : `おしまい！ ${finalScore}点（ランク ${rank}）・ハイスコア ${highScore}点`;

  messageEl.classList.add("game-over");
  showResultOverlay(finalScore, isNewRecord);
  renderRanking();
}

// --- PWA ---

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }
}

startBtn.addEventListener("click", startGame);
resultCloseBtn.addEventListener("click", () => {
  hideResultOverlay();
  startGame();
});
resultQuitBtn.addEventListener("click", returnToTitleScreen);
loadHighScore();
setDifficulty("normal");
createBoard();
registerServiceWorker();
