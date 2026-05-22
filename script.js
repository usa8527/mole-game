const HOLE_COUNT = 9;
const GAME_DURATION = 30;
const BOMB_CHANCE = 0.05;
const RAINBOW_CHANCE = 0.02;
const GOLD_CHANCE = 0.08;
const ALIEN_CHANCE = 0.1;
const MOLE_POINTS = 1;
const ALIEN_POINTS = 5;
const GOLD_POINTS = 10;
const RAINBOW_POINTS = 50;
const BOSS_MOLE_POINTS = 100;
const BOMB_POINTS = -5;
const BOSS_COMBO_MIN = 15;
const BOSS_SPAWN_CHANCE = 0.07;
const BOSS_HP = 3;
const HIGH_SCORE_SHAKE_POINTS = 15;
const HIGHSCORE_KEY = "moleGameHighScore";
const RANKING_KEY = "moleGameRanking";
const PLAYER_NAME_KEY = "moleGameName";
const RANKING_LIMIT = 10;
const DEFAULT_PLAYER_NAME = "ゲスト";
const MAX_PLAYER_NAME_LENGTH = 12;
const COINS_KEY = "moleGameCoins";
const COLLECTION_KEY = "moleGameCollection";
const SKIN_KEY = "moleGameSkin";
const LOGIN_BONUS_KEY = "moleGameLoginBonus";
const MISSIONS_KEY = "moleGameMissions";
const THEME_SHOP_KEY = "moleGameThemeShop";
const STAGES_KEY = "moleGameStages";

const STAGE_DEFS = [
  {
    id: "meadow",
    name: "草原ステージ",
    icon: "🌿",
    desc: "はじめから遊べる基本ステージ",
    alwaysUnlocked: true,
    balance: {
      bombChance: 0.05,
      goldChance: 0.08,
      alienChance: 0.1,
      rainbowChance: 0.02,
      spaceChance: 0,
      bgmBpm: 168,
      bgmMelodyType: "square",
      bgmVolume: 1,
    },
  },
  {
    id: "night",
    name: "夜ステージ",
    icon: "🌙",
    desc: "夜空と星。BGMが落ち着く",
    unlockType: "coins",
    coinCost: 300,
    balance: {
      bombChance: 0.045,
      goldChance: 0.085,
      alienChance: 0.1,
      rainbowChance: 0.02,
      spaceChance: 0,
      bgmBpm: 132,
      bgmMelodyType: "sine",
      bgmVolume: 0.82,
    },
  },
  {
    id: "space",
    name: "宇宙ステージ",
    icon: "🚀",
    desc: "流れ星！エイリアン・宇宙モグラ多め",
    unlockType: "character",
    characterId: "space",
    balance: {
      bombChance: 0.05,
      goldChance: 0.08,
      alienChance: 0.14,
      rainbowChance: 0.02,
      spaceChance: 0.1,
      bgmBpm: 160,
      bgmMelodyType: "square",
      bgmVolume: 0.95,
    },
  },
  {
    id: "volcano",
    name: "火山ステージ",
    icon: "🌋",
    desc: "ボス3回撃破で解放。爆弾多め・金も少し多め",
    unlockType: "bossKills",
    target: 3,
    balance: {
      bombChance: 0.08,
      goldChance: 0.1,
      alienChance: 0.08,
      rainbowChance: 0.02,
      spaceChance: 0,
      bgmBpm: 172,
      bgmMelodyType: "square",
      bgmVolume: 1,
    },
  },
  {
    id: "snow",
    name: "雪ステージ",
    icon: "❄️",
    desc: "ミッション5個達成で解放。雪が降る",
    unlockType: "missions",
    target: 5,
    balance: {
      bombChance: 0.04,
      goldChance: 0.09,
      alienChance: 0.09,
      rainbowChance: 0.025,
      spaceChance: 0,
      bgmBpm: 145,
      bgmMelodyType: "triangle",
      bgmVolume: 0.88,
    },
  },
];
const GACHA_COST = 100;
const LOGIN_BONUS_AMOUNT = 50;
const GACHA_SHAKE_MS = 1600;
const GACHA_OPEN_MS = 2400;
const GACHA_REVEAL_MS = 3400;
const COMBO_MULTIPLIER_2 = 3;
const COMBO_MULTIPLIER_3 = 6;

const DIFFICULTY = {
  easy: { minSpawn: 1000, maxSpawn: 1650, visible: 2200, label: "簡単" },
  normal: { minSpawn: 750, maxSpawn: 1300, visible: 1750, label: "普通" },
  hard: { minSpawn: 520, maxSpawn: 950, visible: 1400, label: "難しい" },
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
  rainbow: `
    <div class="character rainbow">
      <span class="char-rainbow-ring"></span>
      <span class="char-spark char-spark--1"></span>
      <span class="char-spark char-spark--2"></span>
      <span class="char-spark char-spark--3"></span>
      <span class="char-spark char-spark--4"></span>
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
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
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
  boss: `
    <div class="character boss boss-stage-3">
      <span class="boss-aura" aria-hidden="true"></span>
      <span class="boss-aura-inner" aria-hidden="true"></span>
      <span class="char-crown" aria-hidden="true"></span>
      <span class="boss-label">BOSS</span>
      <div class="boss-hp-dots" aria-hidden="true">
        <span class="boss-hp-dot"></span>
        <span class="boss-hp-dot"></span>
        <span class="boss-hp-dot"></span>
      </div>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="boss-brow boss-brow--l" aria-hidden="true"></span>
          <span class="boss-brow boss-brow--r" aria-hidden="true"></span>
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout">
            <span class="char-nose-star"></span>
          </span>
          <span class="char-whisker char-whisker--l"></span>
          <span class="char-whisker char-whisker--r"></span>
          <span class="boss-cracks" aria-hidden="true"></span>
          <span class="boss-sweat boss-sweat--l" aria-hidden="true"></span>
          <span class="boss-sweat boss-sweat--r" aria-hidden="true"></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  space: `
    <div class="character space">
      <span class="char-space-helmet"></span>
      <span class="char-star char-star--1"></span>
      <span class="char-star char-star--2"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  hero: `
    <div class="character hero">
      <span class="char-hero-medal" aria-hidden="true">🏅</span>
      <span class="char-hero-scarf" aria-hidden="true"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
          <span class="char-whisker char-whisker--l"></span>
          <span class="char-whisker char-whisker--r"></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
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
const rankingSubtitleEl = document.getElementById("ranking-subtitle");
const rankingBtn = document.getElementById("ranking-btn");
const playerNameInput = document.getElementById("player-name");
const diffButtons = document.querySelectorAll(".diff-btn");
const countdownOverlay = document.getElementById("countdown-overlay");
const resultOverlay = document.getElementById("result-overlay");
const resultScoreEl = document.getElementById("result-score");
const resultHighscoreEl = document.getElementById("result-highscore");
const resultComboEl = document.getElementById("result-combo");
const resultRankEl = document.getElementById("result-rank");
const resultRankMessageEl = document.getElementById("result-rank-message");
const resultPlayerNameEl = document.getElementById("result-player-name");
const resultNewRecordEl = document.getElementById("result-new-record");
const resultCardEl = document.querySelector(".result-card");
const resultCloseBtn = document.getElementById("result-close-btn");
const resultQuitBtn = document.getElementById("result-quit-btn");
const recordBanner = document.getElementById("record-banner");
const coinCountEl = document.getElementById("coin-count");
const resultCoinsEl = document.getElementById("result-coins");
const gachaBtn = document.getElementById("gacha-btn");
const zukanBtn = document.getElementById("zukan-btn");
const zukanPanel = document.getElementById("zukan-panel");
const zukanList = document.getElementById("zukan-list");
const gachaOverlay = document.getElementById("gacha-overlay");
const gachaCapsuleWrap = document.getElementById("gacha-capsule-wrap");
const gachaCapsule = document.getElementById("gacha-capsule");
const gachaResult = document.getElementById("gacha-result");
const gachaRarityBadge = document.getElementById("gacha-rarity-badge");
const gachaResultPreview = document.getElementById("gacha-result-preview");
const gachaResultName = document.getElementById("gacha-result-name");
const gachaResultMsg = document.getElementById("gacha-result-msg");
const gachaCloseBtn = document.getElementById("gacha-close-btn");
const gachaSuspense = document.getElementById("gacha-suspense");
const skinBadgeEl = document.getElementById("skin-badge");
const loginBonusBtn = document.getElementById("login-bonus-btn");
const missionBtn = document.getElementById("mission-btn");
const missionBadge = document.getElementById("mission-badge");
const missionOverlay = document.getElementById("mission-overlay");
const missionList = document.getElementById("mission-list");
const missionCloseBtn = document.getElementById("mission-close-btn");
const missionCompleteOverlay = document.getElementById("mission-complete-overlay");
const missionCompleteRewardEl = document.getElementById("mission-complete-reward");
const shopBtn = document.getElementById("shop-btn");
const shopOverlay = document.getElementById("shop-overlay");
const shopList = document.getElementById("shop-list");
const shopCloseBtn = document.getElementById("shop-close-btn");
const shopCoinCountEl = document.getElementById("shop-coin-count");
const themeBadgeEl = document.getElementById("theme-badge");
const titleScreen = document.getElementById("title-screen");
const titleCoinCountEl = document.getElementById("title-coin-count");
const titleSkinDisplayEl = document.getElementById("title-skin-display");
const titleStageDisplayEl = document.getElementById("title-stage-display");
const titleMissionsListEl = document.getElementById("title-missions-list");
const titleShowcaseHole = document.getElementById("title-showcase-hole");
const titleShowcaseSlot = document.getElementById("title-showcase-slot");
const uiBackdrop = document.getElementById("ui-backdrop");
const stageBtn = document.getElementById("stage-btn");
const stageOverlay = document.getElementById("stage-overlay");
const stageList = document.getElementById("stage-list");
const stageCloseBtn = document.getElementById("stage-close-btn");
const stageDisplayEl = document.getElementById("stage-display");
const stageDecorEl = document.getElementById("stage-decor");

const HIT_WORDS = ["ぺちっ！", "BONK!", "パン！", "ドン！", "ポン！", "バシッ！"];
const RAINBOW_HIT_WORDS = ["レインボー!!", "キラッ!", "50点!!", "ぺちっ！"];
const BOSS_HIT_WORDS = ["ガン！", "ドカン！", "ズドン！"];
const BOSS_DEFEAT_WORDS = ["ボス撃破!!", "撃破!!", "100点!!", "勝利!!"];
const RANK_MESSAGES = {
  S: "すごい！パーフェクト級！",
  A: "ナイスプレイ！",
  B: "いい感じ！",
  C: "また挑戦しよう！",
};

const GACHA_CATALOG = [
  {
    id: "mole",
    name: "もぐら",
    rarity: "N",
    cssClass: "mole",
    ability: "安定型（バランス）",
  },
  {
    id: "gold",
    name: "金モグラ",
    rarity: "R",
    cssClass: "gold",
    ability: "金モグラの出現率アップ",
  },
  {
    id: "rainbow",
    name: "虹モグラ",
    rarity: "SR",
    cssClass: "rainbow",
    ability: "コンボ倍率が早く上がる",
  },
  {
    id: "space",
    name: "宇宙モグラ",
    rarity: "SSR",
    cssClass: "space",
    ability: "たまにボーナスコイン",
  },
  {
    id: "hero",
    name: "チャンピオンモグラ",
    rarity: "限定",
    cssClass: "hero",
    ability: "コンボが早く伸びる＋金出現UP",
    missionOnly: true,
  },
];

const THEME_SKINS = [
  {
    id: "default",
    name: "ふつう",
    icon: "🌿",
    price: 0,
    desc: "初期のやわらかい草原テーマ",
    alwaysOwned: true,
    preview: "linear-gradient(135deg, #a8e6cf, #ffd3b6)",
  },
  {
    id: "spring",
    name: "春スキン",
    icon: "🌸",
    price: 100,
    desc: "桜色の春らしい明るいテーマ",
    preview: "linear-gradient(135deg, #f8bbd9, #fff9c4, #c8e6c9)",
  },
  {
    id: "space",
    name: "宇宙スキン",
    icon: "🚀",
    price: 300,
    desc: "星とネオンカラーの宇宙テーマ",
    preview: "linear-gradient(135deg, #1a237e, #4a148c, #006064)",
  },
  {
    id: "dark",
    name: "ダークスキン",
    icon: "🌙",
    price: 500,
    desc: "落ち着いたダークモード風テーマ",
    preview: "linear-gradient(135deg, #37474f, #263238, #1c313a)",
  },
  {
    id: "rainbow",
    name: "虹スキン",
    icon: "🌈",
    price: 0,
    missionOnly: true,
    missionId: "combo20",
    desc: "ミッション「20コンボ達成」で解放",
    preview: "linear-gradient(135deg, #f48fb1, #fff59d, #81d4fa, #ce93d8)",
  },
];

const MISSION_DEFS = [
  {
    id: "score100",
    icon: "🎯",
    title: "100点達成",
    desc: "1回のプレイで100点以上スコアを出す",
    target: 1,
    track: "score100",
    rewardLabel: "50🪙",
    reward: { type: "coins", amount: 50 },
  },
  {
    id: "gold10",
    icon: "✨",
    title: "金モグラハンター",
    desc: "金モグラを累計10回叩く",
    target: 10,
    track: "goldHits",
    rewardLabel: "100🪙",
    reward: { type: "coins", amount: 100 },
  },
  {
    id: "combo20",
    icon: "🔥",
    title: "20コンボ達成",
    desc: "1回のプレイで20コンボ以上達成",
    target: 1,
    track: "combo20",
    rewardLabel: "レア演出＋虹スキン",
    reward: { type: "rareFx" },
  },
  {
    id: "boss3",
    icon: "👑",
    title: "ボスハンター",
    desc: "ボスモグラを累計3回倒す",
    target: 3,
    track: "bossKills",
    rewardLabel: "限定スキン",
    reward: { type: "skin", skinId: "hero" },
  },
  {
    id: "gacha10",
    icon: "🎁",
    title: "ガチャマニア",
    desc: "ガチャを累計10回回す",
    target: 10,
    track: "gachaCount",
    rewardLabel: "200🪙",
    reward: { type: "coins", amount: 200 },
  },
];

const SKIN_ABILITIES = {
  mole: { goldBonus: 0, combo2At: 3, combo3At: 6, spaceCoinChance: 0 },
  gold: { goldBonus: 0.05, combo2At: 3, combo3At: 6, spaceCoinChance: 0 },
  rainbow: { goldBonus: 0, combo2At: 2, combo3At: 5, spaceCoinChance: 0 },
  space: { goldBonus: 0, combo2At: 3, combo3At: 6, spaceCoinChance: 0.12 },
  hero: { goldBonus: 0.04, combo2At: 2, combo3At: 5, spaceCoinChance: 0 },
};

const GACHA_POOL = [
  { id: "mole", weight: 70 },
  { id: "gold", weight: 20 },
  { id: "rainbow", weight: 8 },
  { id: "space", weight: 2 },
];

const GACHA_PREVIEW_HTML = {
  mole: `
    <div class="character mole mini">
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  gold: `
    <div class="character gold mini">
      <span class="char-aura"></span>
      <span class="char-crown"></span>
      <span class="char-spark char-spark--1"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  rainbow: `
    <div class="character rainbow mini">
      <span class="char-rainbow-ring"></span>
      <span class="char-spark char-spark--1"></span>
      <span class="char-spark char-spark--2"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  space: `
    <div class="character space mini">
      <span class="char-space-helmet"></span>
      <span class="char-star char-star--1"></span>
      <span class="char-star char-star--2"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-cheek char-cheek--l"></span>
          <span class="char-cheek char-cheek--r"></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
  hero: `
    <div class="character hero mini">
      <span class="char-hero-medal">🏅</span>
      <span class="char-hero-scarf"></span>
      <div class="char-body">
        <div class="char-torso"></div>
        <div class="char-head">
          <span class="char-eye char-eye--l"><span class="char-shine"></span></span>
          <span class="char-eye char-eye--r"><span class="char-shine"></span></span>
          <span class="char-snout"><span class="char-nose-star"></span></span>
        </div>
        <span class="char-claw char-claw--l"></span>
        <span class="char-claw char-claw--r"></span>
      </div>
    </div>
  `,
};
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
let onTitleScreen = true;
let audioCtx = null;
let bgmGainNode = null;
let sfxGainNode = null;
let bgmPlaying = false;
let bgmTimer = null;
let bgmStepIndex = 0;
let bgmNextTime = 0;
let coins = 0;
let collection = [];
let gachaRunning = false;
let sessionBonusCoins = 0;

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
let bossActive = false;

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

function getBgmStageConfig() {
  const def = getStageDef(getEquippedStage()) || STAGE_DEFS[0];
  const b = def.balance || {};
  return {
    bpm: b.bgmBpm ?? 168,
    melodyType: b.bgmMelodyType ?? "square",
    volume: b.bgmVolume ?? 1,
  };
}

function getBgmStep() {
  const bpm = getBgmStageConfig().bpm;
  return 60 / bpm / 2;
}

function scheduleBgm() {
  if (!bgmPlaying || !audioCtx) return;

  const cfg = getBgmStageConfig();
  const step = getBgmStep();
  const ahead = 0.35;
  while (bgmNextTime < audioCtx.currentTime + ahead) {
    const idx = bgmStepIndex % BGM_MELODY.length;
    const melodyFreq = BGM_MELODY[idx];
    const bassFreq = BGM_BASS[idx];

    playBgmNote(melodyFreq, bgmNextTime, step * 0.88, cfg.melodyType, cfg.volume);
    if (bgmStepIndex % 2 === 0) {
      playBgmNote(bassFreq, bgmNextTime, step * 1.05, "triangle", cfg.volume * 0.55);
    }

    bgmStepIndex++;
    bgmNextTime += step;
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

function playRainbowSpawnSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [523, 659, 784, 988, 1175, 1568].forEach((freq, i) => {
    playTone(freq, t + i * 0.06, 0.12, "triangle", 0.13);
    playTone(freq * 1.5, t + i * 0.06 + 0.02, 0.06, "sine", 0.07);
  });
}

function playRainbowHitSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [784, 988, 1175, 1568, 2093].forEach((freq, i) => {
    playTone(freq, t + i * 0.04, 0.1, "triangle", 0.16);
  });
  playSweep(600, 2000, t, 0.15, "sine", 0.12);
}

function playRankRevealSound(rank) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const notes =
    rank === "S"
      ? [523, 659, 784, 1047]
      : rank === "A"
        ? [440, 554, 659]
        : [392, 494];
  notes.forEach((freq, i) => {
    playTone(freq, t + i * 0.12, 0.2, "sine", 0.18);
  });
}

function playGachaRollSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playTone(330, t, 0.08, "square", 0.12);
  playTone(440, t + 0.1, 0.08, "square", 0.12);
  playTone(554, t + 0.2, 0.1, "triangle", 0.14);
}

function playGachaOpenSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playSweep(200, 600, t, 0.15, "sine", 0.16);
  playTone(880, t + 0.08, 0.1, "triangle", 0.12);
}

function playGachaLightSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playSweep(200, 900, t, 0.35, "sine", 0.12);
  playTone(660, t + 0.1, 0.15, "triangle", 0.1);
}

function playGachaSuspenseSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playTone(440, t, 0.08, "sine", 0.1);
  playTone(494, t + 0.12, 0.08, "sine", 0.1);
  playTone(523, t + 0.24, 0.1, "triangle", 0.12);
}

function playGachaRevealSound(rarity) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  if (rarity === "SSR") {
    [523, 659, 784, 988, 1175, 1568].forEach((freq, i) => {
      playTone(freq, t + i * 0.07, 0.14, "triangle", 0.15);
    });
    return;
  }
  if (rarity === "SR") {
    [659, 784, 988].forEach((freq, i) => {
      playTone(freq, t + i * 0.08, 0.12, "triangle", 0.14);
    });
    return;
  }
  if (rarity === "R") {
    playTone(659, t, 0.14, "triangle", 0.14);
    playTone(784, t + 0.06, 0.1, "sine", 0.1);
    return;
  }
  playTone(523, t, 0.12, "sine", 0.14);
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

function playBossSpawnSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playSweep(120, 55, t, 0.45, "sawtooth", 0.22);
  [220, 277, 330, 392].forEach((freq, i) => {
    playTone(freq, t + 0.08 + i * 0.1, 0.16, "square", 0.14);
  });
  playNoiseBurst(t + 0.05, 0.18, 0.14);
}

function playBossHitSound(hpLeft) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const base = hpLeft === 1 ? 180 : hpLeft === 2 ? 140 : 110;
  playSweep(base * 2, base, t, 0.12, "square", 0.24);
  playTone(base, t, 0.08, "triangle", 0.18);
  playNoiseBurst(t, 0.08, 0.12);
}

function playBossDefeatSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [392, 494, 587, 784, 988, 1175, 1568].forEach((freq, i) => {
    playTone(freq, t + i * 0.07, 0.16, "triangle", 0.2);
    playTone(freq * 0.5, t + i * 0.07, 0.1, "square", 0.1);
  });
  playSweep(200, 1800, t, 0.35, "sine", 0.14);
  playNoiseBurst(t + 0.1, 0.2, 0.1);
}

function playMissionCompleteSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [523, 659, 784, 988, 1175].forEach((freq, i) => {
    playTone(freq, t + i * 0.09, 0.14, "triangle", 0.2);
  });
  playSweep(400, 1400, t + 0.05, 0.25, "sine", 0.12);
}

function playUiClickSound() {
  if (!audioCtx) initAudio();
  if (!audioCtx) return;
  playTone(659, 0.05, "square", 0.12);
  playTone(880, 0.04, "square", 0.08);
}

function playShopBuySound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [784, 988, 1175, 1568, 2093].forEach((freq, i) => {
    playTone(freq, t + i * 0.06, 0.1, "triangle", 0.18);
  });
  playSweep(600, 2200, t, 0.2, "sine", 0.1);
}

function playThemeEquipSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playTone(659, t, 0.1, "triangle", 0.16);
  playTone(880, t + 0.06, 0.12, "sine", 0.14);
  playTone(1047, t + 0.1, 0.08, "triangle", 0.12);
}

function playEndSound() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [659, 523, 440, 349].forEach((freq, i) => {
    playTone(freq, t + i * 0.18, 0.28, "sine", 0.22);
  });
  playTone(262, t + 0.75, 0.5, "triangle", 0.15);
}

// --- コイン・ガチャ・図鑑 ---

function loadCoins() {
  const saved = localStorage.getItem(COINS_KEY);
  coins = saved ? parseInt(saved, 10) || 0 : 0;
  renderCoinDisplay();
}

function saveCoins() {
  localStorage.setItem(COINS_KEY, String(coins));
  renderCoinDisplay();
}

function loadCollection() {
  try {
    const saved = JSON.parse(localStorage.getItem(COLLECTION_KEY) || "[]");
    collection = Array.isArray(saved) ? saved : [];
  } catch {
    collection = [];
  }
  ensureStarterCollection();
}

function ensureStarterCollection() {
  if (!hasCharacter("mole")) {
    collection.push("mole");
    saveCollection();
  }
}

function saveCollection() {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

function renderCoinDisplay() {
  if (coinCountEl) coinCountEl.textContent = String(coins);
  if (titleCoinCountEl) titleCoinCountEl.textContent = String(coins);
  updateSubControls();
}

function calculateCoinsFromScore(score) {
  return Math.max(0, Math.floor(score / 2));
}

function addCoins(amount) {
  coins += amount;
  saveCoins();
}

function hasCharacter(id) {
  return collection.includes(id);
}

function addToCollection(id) {
  if (!hasCharacter(id)) {
    collection.push(id);
    saveCollection();
    renderZukan();
    renderSkinBadge();
    syncStageUnlocks();
    if (stageOverlay && !stageOverlay.classList.contains("hidden")) {
      renderStageList();
    }
  }
}

function getGachaChar(id) {
  return GACHA_CATALOG.find((c) => c.id === id);
}

function rollGacha() {
  const total = GACHA_POOL.reduce((sum, item) => sum + item.weight, 0);
  let r = Math.random() * total;
  for (const item of GACHA_POOL) {
    r -= item.weight;
    if (r <= 0) return item.id;
  }
  return "mole";
}

function getTodayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function canClaimLoginBonus() {
  return localStorage.getItem(LOGIN_BONUS_KEY) !== getTodayKey();
}

function updateLoginBonusButton() {
  if (!loginBonusBtn) return;
  const blocked = isPlaying || gachaRunning;
  if (!canClaimLoginBonus()) {
    loginBonusBtn.disabled = true;
    loginBonusBtn.textContent = "🌟 今日は受け取り済み";
    return;
  }
  loginBonusBtn.textContent = `🌟 ログインボーナス (+${LOGIN_BONUS_AMOUNT}🪙)`;
  loginBonusBtn.disabled = blocked;
}

function claimLoginBonus() {
  if (!canClaimLoginBonus() || isPlaying || gachaRunning) return;
  initAudio();
  addCoins(LOGIN_BONUS_AMOUNT);
  localStorage.setItem(LOGIN_BONUS_KEY, getTodayKey());
  updateLoginBonusButton();
  playStartSound();
  messageEl.textContent = `ログインボーナス +${LOGIN_BONUS_AMOUNT}コイン！`;
}

function getEquippedSkin() {
  const saved = localStorage.getItem(SKIN_KEY);
  if (saved && hasCharacter(saved)) return saved;
  return "mole";
}

function selectSkin(id) {
  if (!hasCharacter(id) || isPlaying || gachaRunning) return;
  localStorage.setItem(SKIN_KEY, id);
  renderSkinBadge();
  renderZukan();
  renderTitleShowcase();
  updateComboDisplay();
  const char = getGachaChar(id);
  if (char) {
    messageEl.textContent = `スキンを「${char.name}」にしたよ！ ${char.ability}`;
  }
}

function renderSkinBadge() {
  const id = getEquippedSkin();
  const char = getGachaChar(id);
  if (skinBadgeEl) {
    skinBadgeEl.textContent = char
      ? `スキン: ${char.name}（${char.ability}）`
      : "スキン: もぐら";
  }
  if (titleSkinDisplayEl) {
    titleSkinDisplayEl.textContent = char ? `スキン: ${char.name}` : "スキン: もぐら";
  }
}

function getSkinAbility() {
  return SKIN_ABILITIES[getEquippedSkin()] || SKIN_ABILITIES.mole;
}

function updateSubControls() {
  const canGacha = !isPlaying && !gachaRunning && coins >= GACHA_COST;
  if (gachaBtn) {
    gachaBtn.disabled = !canGacha;
    const need = Math.max(0, GACHA_COST - coins);
    gachaBtn.textContent =
      coins >= GACHA_COST
        ? `🎁 ガチャ (${GACHA_COST}🪙)`
        : `🎁 ガチャ (あと${need}🪙)`;
  }
  if (zukanBtn) zukanBtn.disabled = isPlaying || gachaRunning;
  if (rankingBtn) rankingBtn.disabled = isPlaying || gachaRunning;
  if (missionBtn) missionBtn.disabled = isPlaying || gachaRunning;
  if (shopBtn) shopBtn.disabled = isPlaying || gachaRunning;
  if (stageBtn) stageBtn.disabled = isPlaying || gachaRunning;
  updateLoginBonusButton();
  updateMissionButtonBadge();
}

function syncUiBackdrop() {
  if (!uiBackdrop) return;
  const zukanOpen = zukanPanel && !zukanPanel.classList.contains("hidden");
  const rankingOpen = rankingPanel && !rankingPanel.classList.contains("hidden");
  uiBackdrop.classList.toggle("hidden", !(zukanOpen || rankingOpen));
}

function closeZukanPanel() {
  if (zukanPanel) zukanPanel.classList.add("hidden");
  syncUiBackdrop();
}

function closeRankingPanel() {
  if (rankingPanel) rankingPanel.classList.add("hidden");
  syncUiBackdrop();
}

function closeAllSidePanels() {
  closeZukanPanel();
  closeRankingPanel();
  if (missionOverlay) missionOverlay.classList.add("hidden");
  if (shopOverlay) shopOverlay.classList.add("hidden");
  if (stageOverlay) stageOverlay.classList.add("hidden");
  syncUiBackdrop();
}

function canDismissMenuPanels() {
  return !isPlaying && !gachaRunning;
}

function canDismissGachaOverlay() {
  if (!gachaOverlay || gachaOverlay.classList.contains("hidden")) return false;
  if (!gachaRunning) return true;
  return gachaCloseBtn && !gachaCloseBtn.disabled;
}

function bindOverlayDismiss(overlay, closeFn, canClose) {
  if (!overlay) return;
  overlay.addEventListener("click", (e) => {
    if (e.target !== overlay) return;
    if (!canClose()) return;
    closeFn();
  });
}

function initPanelDismiss() {
  bindOverlayDismiss(missionOverlay, closeMissionModal, canDismissMenuPanels);
  bindOverlayDismiss(shopOverlay, closeShopModal, canDismissMenuPanels);
  bindOverlayDismiss(stageOverlay, closeStageModal, canDismissMenuPanels);
  bindOverlayDismiss(gachaOverlay, closeGachaModal, canDismissGachaOverlay);

  if (uiBackdrop) {
    uiBackdrop.addEventListener("click", () => {
      if (!canDismissMenuPanels()) return;
      closeZukanPanel();
      closeRankingPanel();
    });
  }
}

function toggleZukan() {
  if (isPlaying || gachaRunning) return;
  if (missionOverlay) missionOverlay.classList.add("hidden");
  if (shopOverlay) shopOverlay.classList.add("hidden");
  if (stageOverlay) stageOverlay.classList.add("hidden");
  closeRankingPanel();
  zukanPanel.classList.toggle("hidden");
  if (!zukanPanel.classList.contains("hidden")) {
    renderZukan();
  }
  syncUiBackdrop();
}

function toggleRanking() {
  if (isPlaying || gachaRunning) return;
  closeZukanPanel();
  if (missionOverlay) missionOverlay.classList.add("hidden");
  if (shopOverlay) shopOverlay.classList.add("hidden");
  if (stageOverlay) stageOverlay.classList.add("hidden");
  rankingPanel.classList.toggle("hidden");
  if (!rankingPanel.classList.contains("hidden")) {
    void renderRankingList();
  }
  syncUiBackdrop();
}

function toggleMission() {
  if (isPlaying || gachaRunning) return;
  const wasOpen = missionOverlay && !missionOverlay.classList.contains("hidden");
  closeZukanPanel();
  closeRankingPanel();
  if (shopOverlay) shopOverlay.classList.add("hidden");
  if (stageOverlay) stageOverlay.classList.add("hidden");
  if (!missionOverlay) return;
  if (wasOpen) {
    missionOverlay.classList.add("hidden");
  } else {
    missionOverlay.classList.remove("hidden");
    renderMissionList();
  }
}

function closeMissionModal() {
  if (missionOverlay) missionOverlay.classList.add("hidden");
}

function renderZukan() {
  if (!zukanList) return;
  const equipped = getEquippedSkin();

  zukanList.innerHTML = GACHA_CATALOG.map((char) => {
    const owned = hasCharacter(char.id);
    const rarityClass =
      char.rarity === "限定" ? "limited" : char.rarity.toLowerCase();
    if (owned) {
      const isActive = equipped === char.id;
      return `
        <li class="zukan-item${isActive ? " zukan-item--active" : ""}">
          <div class="zukan-preview">${GACHA_PREVIEW_HTML[char.id]}</div>
          <div class="zukan-info">
            <span class="zukan-name">${char.name}</span>
            <span class="zukan-rarity zukan-rarity--${rarityClass}">${char.rarity}</span>
            <span class="zukan-ability">${char.ability}</span>
          </div>
          <button type="button" class="zukan-skin-btn${isActive ? " zukan-skin-btn--active" : ""}" data-skin-select="${char.id}" ${isActive ? "disabled" : ""}>
            ${isActive ? "使用中" : "スキンにする"}
          </button>
        </li>
      `;
    }
    const lockHint = char.missionOnly
      ? "ミッション達成で解放"
      : "ガチャで入手";
    return `
      <li class="zukan-item zukan-item--locked">
        <div class="zukan-preview">${char.missionOnly && GACHA_PREVIEW_HTML[char.id] ? GACHA_PREVIEW_HTML[char.id] : '<span class="zukan-unknown">？？？</span>'}</div>
        <div class="zukan-info">
          <span class="zukan-name">${char.missionOnly ? char.name : "？？？"}</span>
          <span class="zukan-rarity zukan-rarity--${rarityClass}">${char.rarity}</span>
          <span class="zukan-ability">${lockHint}</span>
        </div>
      </li>
    `;
  }).join("");
}

function clearGachaFxClasses() {
  if (!gachaOverlay) return;
  gachaOverlay.classList.remove(
    "gacha-rolling",
    "gacha-ssr-flash",
    "gacha-fx--n",
    "gacha-fx--r",
    "gacha-fx--sr",
    "gacha-fx--ssr"
  );
}

function resetGachaModal() {
  if (!gachaOverlay) return;
  clearGachaFxClasses();
  if (gachaCapsuleWrap) gachaCapsuleWrap.classList.remove("hidden");
  if (gachaResult) gachaResult.classList.add("hidden");
  if (gachaSuspense) gachaSuspense.classList.add("hidden");
  if (gachaCapsule) gachaCapsule.classList.remove("shake", "open");
  if (gachaCloseBtn) gachaCloseBtn.disabled = true;
  if (gachaResultPreview) {
    gachaResultPreview.classList.remove("result-sparkle");
    gachaResultPreview.innerHTML = "";
  }
}

function applyGachaRarityFx(rarity) {
  if (!gachaOverlay) return;
  clearGachaFxClasses();
  const map = { N: "gacha-fx--n", R: "gacha-fx--r", SR: "gacha-fx--sr", SSR: "gacha-fx--ssr" };
  gachaOverlay.classList.add(map[rarity] || "gacha-fx--n");

  if (rarity === "SSR") {
    gachaOverlay.classList.add("gacha-ssr-flash");
    triggerScreenFlash("rainbow");
    if (navigator.vibrate) navigator.vibrate([40, 30, 60, 30, 80]);
  } else if (rarity === "SR") {
    if (navigator.vibrate) navigator.vibrate(35);
  } else if (rarity === "R") {
    triggerScreenFlash("gold");
  }
}

function showGachaResult(charId, isNew) {
  const char = getGachaChar(charId);
  if (!char || !gachaOverlay) return;

  if (gachaSuspense) gachaSuspense.classList.add("hidden");

  const rarityClass = char.rarity.toLowerCase();
  gachaRarityBadge.textContent = char.rarity;
  gachaRarityBadge.className = `gacha-rarity-badge gacha-rarity-badge--${rarityClass}`;
  gachaResultPreview.innerHTML = GACHA_PREVIEW_HTML[char.id];
  gachaResultPreview.classList.add("result-sparkle");
  gachaResultName.textContent = char.name;
  gachaResultMsg.textContent = isNew
    ? `🎉 NEW！ ${char.ability}`
    : `また会えたね！（${char.ability}）`;

  gachaCapsuleWrap.classList.add("hidden");
  gachaResult.classList.remove("hidden");
  gachaCloseBtn.disabled = false;

  applyGachaRarityFx(char.rarity);
  playGachaRevealSound(char.rarity);
}

function closeGachaModal() {
  if (gachaOverlay) gachaOverlay.classList.add("hidden");
  resetGachaModal();
  gachaRunning = false;
  updateSubControls();
}

function runGachaSequence() {
  const charId = rollGacha();
  const isNew = !hasCharacter(charId);

  resetGachaModal();
  if (gachaOverlay) {
    gachaOverlay.classList.remove("hidden");
    gachaOverlay.classList.add("gacha-rolling");
  }
  gachaRunning = true;
  updateSubControls();

  initAudio();
  playGachaRollSound();
  playGachaLightSound();
  if (gachaCapsule) gachaCapsule.classList.add("shake");

  setTimeout(() => {
    playGachaOpenSound();
    if (gachaCapsule) {
      gachaCapsule.classList.remove("shake");
      gachaCapsule.classList.add("open");
    }
  }, GACHA_SHAKE_MS);

  setTimeout(() => {
    if (gachaCapsuleWrap) gachaCapsuleWrap.classList.add("hidden");
    if (gachaSuspense) gachaSuspense.classList.remove("hidden");
    playGachaSuspenseSound();
  }, GACHA_OPEN_MS);

  setTimeout(() => {
    if (gachaOverlay) gachaOverlay.classList.remove("gacha-rolling");
    addToCollection(charId);
    showGachaResult(charId, isNew);
    renderSkinBadge();
  }, GACHA_REVEAL_MS);
}

function startGacha() {
  if (isPlaying || gachaRunning || coins < GACHA_COST) return;

  initAudio();
  coins -= GACHA_COST;
  saveCoins();
  incrementMissionStat("gachaCount");
  runGachaSequence();
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPlayerName() {
  if (!playerNameInput) return DEFAULT_PLAYER_NAME;
  const raw = playerNameInput.value.trim();
  if (!raw) return DEFAULT_PLAYER_NAME;
  return raw.slice(0, MAX_PLAYER_NAME_LENGTH);
}

function loadPlayerNameIntoInput() {
  if (!playerNameInput) return;
  const saved = localStorage.getItem(PLAYER_NAME_KEY) || "";
  playerNameInput.value = saved;
}

function persistPlayerNameFromInput() {
  if (!playerNameInput) return;
  const trimmed = playerNameInput.value.trim().slice(0, MAX_PLAYER_NAME_LENGTH);
  playerNameInput.value = trimmed;
  localStorage.setItem(PLAYER_NAME_KEY, trimmed);
}

function setPlayerNameInputEnabled(enabled) {
  if (playerNameInput) playerNameInput.disabled = !enabled;
}

function normalizeRankingEntry(item) {
  const name =
    typeof item.name === "string" && item.name.trim()
      ? item.name.trim().slice(0, MAX_PLAYER_NAME_LENGTH)
      : DEFAULT_PLAYER_NAME;
  return {
    name,
    score: Number(item.score) || 0,
    date: item.date || new Date().toISOString(),
    difficulty: item.difficulty || "normal",
  };
}

function loadRanking() {
  try {
    const raw = JSON.parse(localStorage.getItem(RANKING_KEY) || "[]");
    return Array.isArray(raw) ? raw.map(normalizeRankingEntry) : [];
  } catch {
    return [];
  }
}

function saveRanking(list) {
  localStorage.setItem(RANKING_KEY, JSON.stringify(list));
}

function addToRankingLocal(entry) {
  const list = loadRanking();
  list.push(normalizeRankingEntry(entry));
  list.sort((a, b) => b.score - a.score);
  saveRanking(list.slice(0, RANKING_LIMIT));
}

async function persistRankingScore(entry) {
  const normalized = normalizeRankingEntry(entry);
  if (window.MoleRanking?.isConfigured?.()) {
    const result = await window.MoleRanking.submitScore(normalized);
    if (result?.source === "supabase" && messageEl && !isPlaying) {
      messageEl.textContent = "ランキングに記録したよ！";
    } else if (result?.fallback && messageEl && !isPlaying) {
      messageEl.textContent =
        "ランキング送信に失敗したよ（端末内には保存済み）";
    }
    return result;
  }
  if (window.MoleRanking?.submitScore) {
    await window.MoleRanking.submitScore(normalized);
    return;
  }
  addToRankingLocal(normalized);
}

function addToRanking(entry) {
  void persistRankingScore(entry);
}

function getDifficultyLabel(key) {
  return DIFFICULTY[key]?.label || key;
}

function updateRankingSubtitle(source, fallback) {
  if (!rankingSubtitleEl) return;
  if (source === "supabase" && !fallback) {
    rankingSubtitleEl.textContent =
      "みんなの記録 TOP10（Supabase・名前・スコア・日付）";
    return;
  }
  if (fallback) {
    rankingSubtitleEl.textContent =
      "オンライン取得に失敗したため、この端末の記録を表示中";
    return;
  }
  rankingSubtitleEl.textContent =
    "この端末の記録 TOP10（Supabase 未設定時）";
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
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

function renderRankingListHtml(list) {
  if (!rankingList) return;
  if (list.length === 0) {
    rankingList.innerHTML =
      '<li class="ranking-empty">まだ記録がありません</li>';
    return;
  }

  rankingList.innerHTML = list
    .map((item, i) => {
      const rank = i + 1;
      const diffLabel = getDifficultyLabel(item.difficulty);
      return `
      <li class="${getRankRowClass(rank)}">
        <span class="ranking-rank-badge">${rank}位</span>
        ${getRankBadge(rank)}
        <span class="rank-body">
          <span class="rank-name">${escapeHtml(item.name)}</span>
          <span class="rank-score">${item.score} 点</span>
          <span class="rank-meta">${formatDate(item.date)}・${escapeHtml(diffLabel)}</span>
        </span>
      </li>
    `;
    })
    .join("");
}

async function renderRankingList() {
  if (!rankingList) return;
  rankingList.innerHTML =
    '<li class="ranking-loading">ランキングを読み込み中...</li>';
  if (rankingSubtitleEl) {
    rankingSubtitleEl.textContent = "読み込み中...";
  }

  let list = loadRanking();
  let source = "local";
  let fallback = false;

  if (window.MoleRanking?.fetchTop10) {
    const result = await window.MoleRanking.fetchTop10();
    list = result.list || [];
    source = result.source || "local";
    fallback = Boolean(result.fallback);
  }

  updateRankingSubtitle(source, fallback);
  renderRankingListHtml(list);
}

function getScoreRank(score) {
  for (const { rank, min } of RANK_THRESHOLDS) {
    if (score >= min) return rank;
  }
  return "C";
}

// --- スキンショップ（画面テーマ） ---

function defaultThemeShop() {
  return { owned: ["default"], equipped: "default" };
}

function loadThemeShop() {
  try {
    const raw = JSON.parse(localStorage.getItem(THEME_SHOP_KEY) || "{}");
    const owned = Array.isArray(raw.owned) ? raw.owned : ["default"];
    if (!owned.includes("default")) owned.unshift("default");
    return {
      owned,
      equipped: raw.equipped || "default",
    };
  } catch {
    return defaultThemeShop();
  }
}

function saveThemeShop(data) {
  localStorage.setItem(THEME_SHOP_KEY, JSON.stringify(data));
}

function getThemeSkin(id) {
  return THEME_SKINS.find((t) => t.id === id);
}

function isThemeOwned(id) {
  const theme = getThemeSkin(id);
  if (!theme) return false;
  if (theme.alwaysOwned) return true;
  if (theme.missionOnly && theme.missionId && isMissionDone(theme.missionId)) {
    return true;
  }
  return loadThemeShop().owned.includes(id);
}

function unlockThemeSkin(id) {
  const shop = loadThemeShop();
  if (!shop.owned.includes(id)) {
    shop.owned.push(id);
    saveThemeShop(shop);
  }
}

function getEquippedTheme() {
  const shop = loadThemeShop();
  const id = shop.equipped || "default";
  return isThemeOwned(id) ? id : "default";
}

function applyEquippedTheme() {
  THEME_SKINS.forEach((t) => {
    document.body.classList.remove(`theme-${t.id}`);
  });
  const id = getEquippedTheme();
  if (id !== "default") {
    document.body.classList.add(`theme-${id}`);
  }
  updateThemeBadge();
}

function updateThemeBadge() {
  if (!themeBadgeEl) return;
  const theme = getThemeSkin(getEquippedTheme());
  themeBadgeEl.textContent = theme
    ? `テーマ: ${theme.name}`
    : "テーマ: ふつう";
}

function spawnShopSparkle(anchorEl) {
  const rect = anchorEl?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const colors = ["#fff59d", "#ffeb3b", "#f48fb1", "#81d4fa", "#ce93d8", "#fff"];

  for (let i = 0; i < 24; i++) {
    const spark = document.createElement("span");
    spark.className = "shop-sparkle";
    spark.textContent = i % 3 === 0 ? "✦" : "✧";
    spark.style.left = `${cx}px`;
    spark.style.top = `${cy}px`;
    spark.style.setProperty("--sp-x", `${(Math.random() - 0.5) * 140}px`);
    spark.style.setProperty("--sp-y", `${(Math.random() - 0.5) * 140 - 40}px`);
    spark.style.color = colors[i % colors.length];
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1100);
  }
}

function buyThemeSkin(id) {
  const theme = getThemeSkin(id);
  if (!theme || theme.alwaysOwned || theme.missionOnly) return;
  if (isThemeOwned(id)) return;
  if (coins < theme.price) return;

  initAudio();
  coins -= theme.price;
  saveCoins();
  unlockThemeSkin(id);
  playShopBuySound();
  renderShopList();
  updateSubControls();
  if (messageEl && !isPlaying) {
    messageEl.textContent = `🛍️ ${theme.name}を購入したよ！`;
  }
}

function equipThemeSkin(id) {
  if (!isThemeOwned(id)) return;
  const theme = getThemeSkin(id);
  if (!theme) return;

  const shop = loadThemeShop();
  if (shop.equipped === id) return;

  shop.equipped = id;
  saveThemeShop(shop);
  initAudio();
  playThemeEquipSound();
  applyEquippedTheme();
  renderShopList();
  if (messageEl && !isPlaying) {
    messageEl.textContent = `テーマを「${theme.name}」にしたよ！`;
  }
}

function renderShopList() {
  if (!shopList) return;
  if (shopCoinCountEl) shopCoinCountEl.textContent = coins;

  const equipped = getEquippedTheme();

  shopList.innerHTML = THEME_SKINS.map((theme) => {
    const owned = isThemeOwned(theme.id);
    const locked = !owned;
    const isActive = equipped === theme.id;

    let actionHtml = "";
    if (isActive) {
      actionHtml = '<span class="shop-status shop-status--active">✓ 使用中</span>';
    } else if (owned) {
      actionHtml = `<button type="button" class="shop-equip-btn" data-theme-equip="${theme.id}">使う</button>`;
    } else if (theme.missionOnly) {
      const done = theme.missionId && isMissionDone(theme.missionId);
      actionHtml = done
        ? `<button type="button" class="shop-equip-btn" data-theme-equip="${theme.id}">使う</button>`
        : '<span class="shop-status shop-status--lock">🔒 ミッション限定</span>';
    } else if (theme.alwaysOwned) {
      actionHtml = `<button type="button" class="shop-equip-btn" data-theme-equip="${theme.id}">使う</button>`;
    } else {
      const canBuy = coins >= theme.price;
      actionHtml = `<button type="button" class="shop-buy-btn" data-theme-buy="${theme.id}" ${canBuy ? "" : "disabled"}>${theme.price}🪙 で購入</button>`;
    }

    const priceLabel = theme.missionOnly
      ? "ミッション限定"
      : theme.price === 0
        ? "無料"
        : `${theme.price}🪙`;

    return `
      <li class="shop-item${isActive ? " shop-item--active" : ""}${owned ? " shop-item--owned" : " shop-item--locked"}" data-theme-id="${theme.id}">
        <div class="shop-preview" style="background:${theme.preview}">
          ${locked ? '<span class="shop-lock" aria-hidden="true">🔒</span>' : `<span class="shop-icon">${theme.icon}</span>`}
        </div>
        <div class="shop-body">
          <p class="shop-item-title">${escapeHtml(theme.name)}${owned && !isActive ? ' <span class="shop-owned-tag">購入済</span>' : ""}</p>
          <p class="shop-item-desc">${escapeHtml(theme.desc)}</p>
          <span class="shop-price">${escapeHtml(priceLabel)}</span>
          <div class="shop-action">${actionHtml}</div>
        </div>
      </li>
    `;
  }).join("");
}

function onShopListClick(e) {
  const buyBtn = e.target.closest("[data-theme-buy]");
  if (buyBtn && !buyBtn.disabled) {
    const id = buyBtn.dataset.themeBuy;
    buyThemeSkin(id);
    const item = buyBtn.closest(".shop-item");
    if (item) {
      item.classList.add("shop-item--sparkle");
      spawnShopSparkle(item);
      setTimeout(() => item.classList.remove("shop-item--sparkle"), 1200);
    }
    return;
  }

  const equipBtn = e.target.closest("[data-theme-equip]");
  if (equipBtn && !equipBtn.disabled) {
    equipThemeSkin(equipBtn.dataset.themeEquip);
  }
}

function toggleShop() {
  if (isPlaying || gachaRunning) return;
  closeZukanPanel();
  closeRankingPanel();
  if (missionOverlay) missionOverlay.classList.add("hidden");
  if (stageOverlay) stageOverlay.classList.add("hidden");
  if (!shopOverlay) return;
  shopOverlay.classList.toggle("hidden");
  if (!shopOverlay.classList.contains("hidden")) {
    renderShopList();
  }
}

function closeShopModal() {
  if (shopOverlay) shopOverlay.classList.add("hidden");
}

function initThemeShopUI() {
  applyEquippedTheme();
  if (shopBtn) shopBtn.addEventListener("click", toggleShop);
  if (shopCloseBtn) shopCloseBtn.addEventListener("click", closeShopModal);
  if (shopList) shopList.addEventListener("click", onShopListClick);
}

// --- ステージ ---

function defaultStageData() {
  return { unlocked: ["meadow"], equipped: "meadow" };
}

function loadStages() {
  try {
    const raw = JSON.parse(localStorage.getItem(STAGES_KEY) || "{}");
    const base = defaultStageData();
    const unlocked = Array.isArray(raw.unlocked) ? raw.unlocked : base.unlocked;
    if (!unlocked.includes("meadow")) unlocked.unshift("meadow");
    let equipped = raw.equipped || base.equipped;
    if (!unlocked.includes(equipped)) equipped = "meadow";
    return { unlocked, equipped };
  } catch {
    return defaultStageData();
  }
}

function saveStages(data) {
  localStorage.setItem(STAGES_KEY, JSON.stringify(data));
}

function getStageDef(id) {
  return STAGE_DEFS.find((s) => s.id === id);
}

function getEquippedStage() {
  const data = loadStages();
  if (data.unlocked.includes(data.equipped)) return data.equipped;
  return "meadow";
}

function isStageUnlockConditionMet(stage) {
  if (stage.alwaysUnlocked) return true;
  const progress = loadMissionProgress();
  switch (stage.unlockType) {
    case "character":
      return hasCharacter(stage.characterId);
    case "bossKills":
      return progress.bossKills >= stage.target;
    case "missions":
      return progress.completed.length >= stage.target;
    case "coins":
      return loadStages().unlocked.includes(stage.id);
    default:
      return false;
  }
}

function isStageUnlocked(id) {
  const stage = getStageDef(id);
  if (!stage) return false;
  if (stage.alwaysUnlocked) return true;
  const data = loadStages();
  if (data.unlocked.includes(id)) return true;
  return isStageUnlockConditionMet(stage);
}

function syncStageUnlocks() {
  const data = loadStages();
  let changed = false;
  STAGE_DEFS.forEach((stage) => {
    if (stage.unlockType === "coins") return;
    if (isStageUnlockConditionMet(stage) && !data.unlocked.includes(stage.id)) {
      data.unlocked.push(stage.id);
      changed = true;
    }
  });
  if (!data.unlocked.includes(data.equipped)) {
    data.equipped = "meadow";
    changed = true;
  }
  if (changed) saveStages(data);
  return changed;
}

function getStageUnlockHint(stage) {
  if (stage.alwaysUnlocked) return "最初から解放";
  if (isStageUnlocked(stage.id)) return "解放済み";
  switch (stage.unlockType) {
    case "coins":
      return `🔒 ${stage.coinCost}🪙で解放`;
    case "character":
      return "🔒 宇宙モグラを入手";
    case "bossKills": {
      const n = loadMissionProgress().bossKills;
      return `🔒 ボス撃破 ${n}/${stage.target}回`;
    }
    case "missions": {
      const n = loadMissionProgress().completed.length;
      return `🔒 ミッション ${n}/${stage.target}個`;
    }
    default:
      return "🔒 未解放";
  }
}

function renderStageDecor(stageId) {
  if (!stageDecorEl) return;
  stageDecorEl.innerHTML = "";
  stageDecorEl.className = "stage-decor";

  if (stageId === "night") {
    stageDecorEl.classList.add("stage-decor--night");
    stageDecorEl.innerHTML = `
      <span class="stage-moon" aria-hidden="true"></span>
      ${Array.from({ length: 18 }, (_, i) => `<span class="stage-star stage-star--${i + 1}" aria-hidden="true"></span>`).join("")}
    `;
    return;
  }

  if (stageId === "space") {
    stageDecorEl.classList.add("stage-decor--space");
    stageDecorEl.innerHTML = Array.from(
      { length: 6 },
      (_, i) => `<span class="stage-shooting-star stage-shooting-star--${i + 1}" aria-hidden="true"></span>`
    ).join("");
    return;
  }

  if (stageId === "volcano") {
    stageDecorEl.classList.add("stage-decor--volcano");
    stageDecorEl.innerHTML = Array.from(
      { length: 8 },
      (_, i) => `<span class="stage-ember stage-ember--${i + 1}" aria-hidden="true"></span>`
    ).join("");
    return;
  }

  if (stageId === "snow") {
    stageDecorEl.classList.add("stage-decor--snow");
    stageDecorEl.innerHTML = Array.from(
      { length: 28 },
      (_, i) =>
        `<span class="stage-snowflake stage-snowflake--${i + 1}" style="--sf-left:${(i * 17) % 100}%;--sf-delay:${(i * 0.35) % 5}s;--sf-dur:${3 + (i % 4)}s" aria-hidden="true"></span>`
    ).join("");
  }
}

function applyEquippedStage() {
  syncStageUnlocks();
  const id = getEquippedStage();
  const def = getStageDef(id) || STAGE_DEFS[0];

  document.body.classList.remove(
    "stage-meadow",
    "stage-night",
    "stage-space",
    "stage-volcano",
    "stage-snow"
  );
  document.body.classList.add(`stage-${id}`);

  if (stageDisplayEl) {
    stageDisplayEl.textContent = `📍 ${def.name}`;
  }
  if (titleStageDisplayEl) {
    titleStageDisplayEl.textContent = `📍 ${def.name}`;
  }
  renderStageDecor(id);
  if (onTitleScreen) renderTitleScreen();
}

function selectStage(id) {
  if (!isStageUnlocked(id)) return;
  const data = loadStages();
  data.equipped = id;
  saveStages(data);
  applyEquippedStage();
  renderStageList();
  if (bgmPlaying) {
    stopBgm();
    startBgm();
  }
  if (messageEl && !isPlaying) {
    messageEl.textContent = `🗺️ ${getStageDef(id).name} に変更したよ！`;
  }
}

function buyNightStage() {
  const stage = getStageDef("night");
  if (!stage || isStageUnlocked("night")) return;
  if (coins < stage.coinCost) {
    if (messageEl) messageEl.textContent = `🪙 あと${stage.coinCost - coins}コインで夜ステージを解放できるよ`;
    return;
  }
  coins -= stage.coinCost;
  saveCoins();
  renderCoinDisplay();
  const data = loadStages();
  if (!data.unlocked.includes("night")) data.unlocked.push("night");
  saveStages(data);
  renderStageList();
  if (messageEl) messageEl.textContent = "🌙 夜ステージを解放したよ！";
}

function renderStageList() {
  if (!stageList) return;
  syncStageUnlocks();
  const equipped = getEquippedStage();

  stageList.innerHTML = STAGE_DEFS.map((stage) => {
    const unlocked = isStageUnlocked(stage.id);
    const active = equipped === stage.id;
    const hint = getStageUnlockHint(stage);
    let actionHtml = "";

    if (!unlocked && stage.unlockType === "coins") {
      const canBuy = coins >= stage.coinCost;
      actionHtml = `<button type="button" class="stage-action-btn" data-stage-buy="night"${canBuy ? "" : " disabled"}>${stage.coinCost}🪙で解放</button>`;
    } else if (unlocked && !active) {
      actionHtml = `<button type="button" class="stage-action-btn" data-stage-select="${stage.id}">このステージで遊ぶ</button>`;
    } else if (unlocked && active) {
      actionHtml = `<span class="stage-active-label">プレイ中</span>`;
    } else {
      actionHtml = `<span class="stage-lock-label">${escapeHtml(hint)}</span>`;
    }

    return `
      <li class="stage-item${unlocked ? "" : " stage-item--locked"}${active ? " stage-item--active" : ""}">
        <span class="stage-item-icon" aria-hidden="true">${unlocked ? stage.icon : "🔒"}</span>
        <div class="stage-item-body">
          <p class="stage-item-title">${escapeHtml(stage.name)}</p>
          <p class="stage-item-desc">${escapeHtml(stage.desc)}</p>
          <p class="stage-item-hint">${escapeHtml(hint)}</p>
          ${actionHtml}
        </div>
      </li>
    `;
  }).join("");
}

function toggleStage() {
  if (isPlaying || gachaRunning) return;
  closeZukanPanel();
  closeRankingPanel();
  if (missionOverlay) missionOverlay.classList.add("hidden");
  if (shopOverlay) shopOverlay.classList.add("hidden");
  if (!stageOverlay) return;
  stageOverlay.classList.toggle("hidden");
  if (!stageOverlay.classList.contains("hidden")) {
    renderStageList();
  }
}

function closeStageModal() {
  if (stageOverlay) stageOverlay.classList.add("hidden");
}

function onStageListClick(e) {
  const buyBtn = e.target.closest("[data-stage-buy]");
  if (buyBtn) {
    buyNightStage();
    return;
  }
  const selectBtn = e.target.closest("[data-stage-select]");
  if (selectBtn) selectStage(selectBtn.dataset.stageSelect);
}

function initStageUI() {
  syncStageUnlocks();
  applyEquippedStage();
  if (stageBtn) stageBtn.addEventListener("click", toggleStage);
  if (stageCloseBtn) stageCloseBtn.addEventListener("click", closeStageModal);
  if (stageList) stageList.addEventListener("click", onStageListClick);
}

// --- ミッション ---

function defaultMissionProgress() {
  return {
    goldHits: 0,
    bossKills: 0,
    gachaCount: 0,
    bestCombo: 0,
    bestScore: 0,
    completed: [],
    rareFxUnlocked: false,
  };
}

function loadMissionProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(MISSIONS_KEY) || "{}");
    return { ...defaultMissionProgress(), ...raw, completed: raw.completed || [] };
  } catch {
    return defaultMissionProgress();
  }
}

function saveMissionProgress(progress) {
  localStorage.setItem(MISSIONS_KEY, JSON.stringify(progress));
}

function isMissionDone(missionId) {
  return loadMissionProgress().completed.includes(missionId);
}

function getMissionCurrent(mission, progress) {
  switch (mission.track) {
    case "goldHits":
      return progress.goldHits;
    case "bossKills":
      return progress.bossKills;
    case "gachaCount":
      return progress.gachaCount;
    case "score100":
      if (progress.completed.includes("score100")) return 1;
      return (progress.bestScore || 0) >= 100 ? 1 : 0;
    case "combo20":
      if (progress.completed.includes("combo20")) return 1;
      return (progress.bestCombo || 0) >= 20 ? 1 : 0;
    default:
      return 0;
  }
}

function missionMeetsTarget(mission, progress) {
  const current = getMissionCurrent(mission, progress);
  return current >= mission.target;
}

function isSessionMissionMet(mission, progress) {
  if (mission.track === "score100") return (progress.bestScore || 0) >= 100;
  if (mission.track === "combo20") return (progress.bestCombo || 0) >= 20;
  return false;
}

function grantMissionReward(reward) {
  switch (reward.type) {
    case "coins":
      addCoins(reward.amount);
      break;
    case "rareFx": {
      const p = loadMissionProgress();
      p.rareFxUnlocked = true;
      saveMissionProgress(p);
      unlockThemeSkin("rainbow");
      updateComboStageEffects();
      updateThemeBadge();
      break;
    }
    case "skin":
      addToCollection(reward.skinId);
      renderZukan();
      renderSkinBadge();
      break;
    default:
      break;
  }
}

function spawnMissionConfetti() {
  const colors = ["#4fc3f7", "#ffeb3b", "#ff8a65", "#81c784", "#f48fb1", "#fff"];
  for (let i = 0; i < 32; i++) {
    const piece = document.createElement("span");
    piece.className = "mission-confetti";
    piece.style.setProperty("--mc-x", `${(Math.random() - 0.5) * 320}px`);
    piece.style.setProperty("--mc-y", `${(Math.random() - 0.5) * 280 - 80}px`);
    piece.style.setProperty("--mc-rot", `${Math.random() * 720}deg`);
    piece.style.background = colors[i % colors.length];
    piece.style.left = `${30 + Math.random() * 40}%`;
    piece.style.top = `${25 + Math.random() * 30}%`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

function showMissionCompleteFx(mission) {
  initAudio();
  playMissionCompleteSound();
  if (navigator.vibrate) {
    navigator.vibrate([50, 40, 80, 40, 100, 50, 120]);
  }
  spawnMissionConfetti();
  if (missionCompleteRewardEl) {
    missionCompleteRewardEl.textContent = `報酬: ${mission.rewardLabel}`;
  }
  if (missionCompleteOverlay) {
    missionCompleteOverlay.classList.remove("hidden");
    setTimeout(() => {
      missionCompleteOverlay.classList.add("hidden");
    }, 2400);
  }
  if (messageEl && !isPlaying) {
    messageEl.textContent = `🎉 ミッション達成！ ${mission.title}`;
  }
}

function tryCompleteMission(missionId) {
  const mission = MISSION_DEFS.find((m) => m.id === missionId);
  if (!mission) return;

  const progress = loadMissionProgress();
  if (progress.completed.includes(missionId)) return;

  const isSessionMission =
    mission.track === "score100" || mission.track === "combo20";
  if (isSessionMission) {
    if (!isSessionMissionMet(mission, progress)) return;
  } else if (!missionMeetsTarget(mission, progress)) {
    return;
  }

  progress.completed.push(missionId);
  saveMissionProgress(progress);
  grantMissionReward(mission.reward);
  showMissionCompleteFx(mission);
  updateMissionButtonBadge();
  if (missionOverlay && !missionOverlay.classList.contains("hidden")) {
    renderMissionList();
  }
  syncStageUnlocks();
  if (stageOverlay && !stageOverlay.classList.contains("hidden")) {
    renderStageList();
  }
  if (onTitleScreen) renderTitleMissions();
}

function checkSessionMissions(finalScore, sessionMaxCombo) {
  const progress = loadMissionProgress();
  progress.bestCombo = Math.max(progress.bestCombo || 0, sessionMaxCombo);
  progress.bestScore = Math.max(progress.bestScore || 0, finalScore);
  saveMissionProgress(progress);

  if (finalScore >= 100) tryCompleteMission("score100");
  if (sessionMaxCombo >= 20) tryCompleteMission("combo20");
}

function syncSessionMissionsFromProgress() {
  const progress = loadMissionProgress();
  if ((progress.bestScore || 0) >= 100) tryCompleteMission("score100");
  if ((progress.bestCombo || 0) >= 20) tryCompleteMission("combo20");
}

function incrementMissionStat(key, amount = 1) {
  const progress = loadMissionProgress();
  progress[key] = (progress[key] || 0) + amount;
  saveMissionProgress(progress);

  if (key === "goldHits") tryCompleteMission("gold10");
  if (key === "bossKills") tryCompleteMission("boss3");
  if (key === "gachaCount") tryCompleteMission("gacha10");
  syncStageUnlocks();
  if (stageOverlay && !stageOverlay.classList.contains("hidden")) {
    renderStageList();
  }
  if (onTitleScreen) renderTitleMissions();
}

function updateMissionButtonBadge() {
  if (!missionBadge) return;
  const progress = loadMissionProgress();
  const allDone = progress.completed.length >= MISSION_DEFS.length;
  missionBadge.classList.toggle("hidden", allDone);
  missionBadge.textContent = "!";
}

function renderMissionList() {
  if (!missionList) return;
  const progress = loadMissionProgress();

  missionList.innerHTML = MISSION_DEFS.map((mission) => {
    const done = progress.completed.includes(mission.id);
    const current = Math.min(getMissionCurrent(mission, progress), mission.target);
    const pct = done ? 100 : Math.round((current / mission.target) * 100);

    return `
      <li class="mission-item${done ? " mission-item--done" : ""}">
        <span class="mission-check" aria-hidden="true">${done ? "✓" : mission.icon}</span>
        <div class="mission-body">
          <p class="mission-item-title">${escapeHtml(mission.title)}</p>
          <p class="mission-item-desc">${escapeHtml(mission.desc)}</p>
          <span class="mission-reward">報酬: ${escapeHtml(mission.rewardLabel)}</span>
          <div class="mission-progress-wrap">
            <div class="mission-progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
              <div class="mission-progress-fill" style="width:${pct}%"></div>
            </div>
            <span class="mission-progress-text">${done ? "達成" : `${current}/${mission.target}`}</span>
          </div>
        </div>
      </li>
    `;
  }).join("");
}

function spawnRareFxSparkle() {
  const spark = document.createElement("span");
  spark.className = "bonus-coin-pop";
  spark.textContent = "✨";
  spark.style.left = `${20 + Math.random() * 60}%`;
  spark.style.top = `${15 + Math.random() * 20}%`;
  gameContainer.appendChild(spark);
  setTimeout(() => spark.remove(), 700);
}

function initMissionUI() {
  syncSessionMissionsFromProgress();
  updateMissionButtonBadge();
  renderMissionList();
  if (missionBtn) missionBtn.addEventListener("click", toggleMission);
  if (missionCloseBtn) missionCloseBtn.addEventListener("click", closeMissionModal);
}

// --- コンボ ---

function getMultiplier() {
  const ab = getSkinAbility();
  if (combo >= ab.combo3At) return 3;
  if (combo >= ab.combo2At) return 2;
  return 1;
}

function hasRareFxUnlocked() {
  return loadMissionProgress().rareFxUnlocked;
}

function updateComboStageEffects() {
  const rare = hasRareFxUnlocked();
  const glowAt = rare ? 3 : 5;
  const rainbowAt = rare ? 7 : 10;
  gameContainer.classList.toggle("combo-glow", combo >= glowAt && combo < rainbowAt);
  gameContainer.classList.toggle("combo-rainbow", combo >= rainbowAt);
  gameContainer.classList.toggle("rare-fx-on", rare);
}

function updateComboDisplay() {
  const prevCombo = parseInt(comboCountEl.textContent, 10) || 0;
  comboCountEl.textContent = combo;
  const mult = getMultiplier();

  if (mult >= 2) {
    comboMultiplierEl.textContent = `${mult}倍！`;
    comboDisplay.classList.add("hot");
  } else {
    comboMultiplierEl.textContent = "";
    comboDisplay.classList.remove("hot");
  }

  if (combo > prevCombo && combo > 0) {
    comboCountEl.classList.remove("combo-pop");
    void comboCountEl.offsetWidth;
    comboCountEl.classList.add("combo-pop");
  }

  updateComboStageEffects();
}

function resetCombo() {
  combo = 0;
  updateComboDisplay();
}

function addCombo() {
  combo++;
  if (combo > maxCombo) maxCombo = combo;
  updateComboDisplay();
  if (hasRareFxUnlocked() && combo >= 5 && combo % 5 === 0) {
    spawnRareFxSparkle();
  }
  if (combo === 5 || combo === 10 || (combo > 5 && combo % 5 === 0)) {
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

function tryPickBossType() {
  if (bossActive) return null;
  if (combo < BOSS_COMBO_MIN) return null;
  if (Math.random() >= BOSS_SPAWN_CHANCE) return null;
  return "boss";
}

function getStageSpawnRates() {
  const def = getStageDef(getEquippedStage()) || STAGE_DEFS[0];
  const b = def.balance || {};
  const ab = getSkinAbility();
  return {
    bombChance: b.bombChance ?? BOMB_CHANCE,
    rainbowChance: b.rainbowChance ?? RAINBOW_CHANCE,
    goldChance: (b.goldChance ?? GOLD_CHANCE) + ab.goldBonus,
    alienChance: b.alienChance ?? ALIEN_CHANCE,
    spaceChance: b.spaceChance ?? 0,
  };
}

function pickCharacterType() {
  const boss = tryPickBossType();
  if (boss) return boss;

  const rates = getStageSpawnRates();
  const r = Math.random();
  let t = rates.bombChance;
  if (r < t) return "bomb";
  t += rates.rainbowChance;
  if (r < t) return "rainbow";
  t += rates.goldChance;
  if (r < t) return "gold";
  t += rates.alienChance;
  if (r < t) return "alien";
  if (rates.spaceChance > 0 && hasCharacter("space")) {
    t += rates.spaceChance;
    if (r < t) return "space";
  }
  return "mole";
}

function getBasePoints(type) {
  switch (type) {
    case "alien":
    case "space":
      return ALIEN_POINTS;
    case "gold":
      return GOLD_POINTS;
    case "rainbow":
      return RAINBOW_POINTS;
    case "bomb":
      return BOMB_POINTS;
    case "boss":
      return 0;
    default:
      return MOLE_POINTS;
  }
}

function setCharacter(hole, type) {
  const slot = hole.querySelector(".char-slot");
  slot.innerHTML = CHARACTER_HTML[type];
  hole.dataset.type = type;
  hole.classList.remove(
    "type-mole",
    "type-alien",
    "type-gold",
    "type-rainbow",
    "type-bomb",
    "type-boss",
    "type-space",
    "type-hero",
    "boss-spawn",
    "boss-hit-wobble"
  );
  hole.classList.add(`type-${type}`);

  if (type === "boss") {
    hole.dataset.bossHp = String(BOSS_HP);
    bossActive = true;
    updateBossVisual(hole, BOSS_HP);
  } else {
    hole.dataset.bossHp = "";
  }
}

function clearBossAlert() {
  gameContainer.classList.remove("boss-alert", "flash-boss-red");
}

function updateBossVisual(hole, hp) {
  const char = hole.querySelector(".character.boss");
  if (!char) return;

  char.classList.remove("boss-stage-3", "boss-stage-2", "boss-stage-1");
  char.classList.add(`boss-stage-${hp}`);
  hole.dataset.bossHp = String(hp);

  char.querySelectorAll(".boss-hp-dot").forEach((dot, i) => {
    dot.classList.toggle("boss-hp-dot--off", i >= hp);
  });
}

function scheduleBossHide(hole) {
  clearHideTimer();
  const visibleTime = Math.round(moleVisibleTime * 2.8);
  hideTimer = setTimeout(() => {
    if (
      hole.classList.contains("up") &&
      !hole.classList.contains("hit") &&
      hole.dataset.type === "boss"
    ) {
      missMole(hole);
      retractCharacter(hole, () => {
        if (activeHole === hole) activeHole = null;
        bossActive = false;
        clearBossAlert();
      });
    }
  }, visibleTime);
}

function clearCharacter(hole) {
  const slot = hole.querySelector(".char-slot");
  slot.innerHTML = "";
  if (hole.dataset.type === "boss") {
    bossActive = false;
    clearBossAlert();
  }
  hole.dataset.type = "";
  hole.dataset.bossHp = "";
  hole.classList.remove(
    "type-mole",
    "type-alien",
    "type-gold",
    "type-rainbow",
    "type-bomb",
    "type-boss",
    "type-space",
    "type-hero",
    "up",
    "hit",
    "hit-gold-burst",
    "hit-rainbow-burst",
    "hit-boss-burst",
    "gold-spawn",
    "rainbow-spawn",
    "boss-spawn",
    "boss-hit-wobble",
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
    case "space":
      playAlienHitSound();
      break;
    case "gold":
      playGoldHitSound();
      break;
    case "rainbow":
      playRainbowHitSound();
      break;
    case "bomb":
      playBombHitSound();
      break;
    case "boss":
      playBossHitSound(1);
      break;
    default:
      playMoleHitSound();
  }
}

function vibrateHit(type) {
  if (!navigator.vibrate) return;
  if (type === "bomb") {
    navigator.vibrate([90, 50, 110]);
    return;
  }
  if (type === "rainbow") {
    navigator.vibrate([35, 25, 50]);
    return;
  }
  if (type === "boss") {
    navigator.vibrate([45, 30, 70]);
    return;
  }
  navigator.vibrate(18);
}

function vibrateBossHit(hpLeft) {
  if (!navigator.vibrate) return;
  if (hpLeft <= 1) {
    navigator.vibrate([60, 40, 90, 40, 120]);
    return;
  }
  navigator.vibrate([35, 25, 55]);
}

function vibrateBossDefeat() {
  if (!navigator.vibrate) return;
  navigator.vibrate([80, 50, 100, 50, 140, 60, 180]);
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

function showBonusCoinPop() {
  const pop = document.createElement("span");
  pop.className = "bonus-coin-pop";
  pop.textContent = "+5🪙";
  gameContainer.appendChild(pop);
  setTimeout(() => pop.remove(), 900);
}

function trySpaceSkinBonus() {
  const ab = getSkinAbility();
  if (!ab.spaceCoinChance || Math.random() >= ab.spaceCoinChance) return;
  sessionBonusCoins += 5;
  showBonusCoinPop();
  if (audioCtx) playTone(880, audioCtx.currentTime, 0.08, "triangle", 0.12);
}

function showHitWord(hole, type) {
  if (type === "bomb") return;

  const inner = hole.querySelector(".hole-inner");
  const word = document.createElement("span");
  const pool = type === "rainbow" ? RAINBOW_HIT_WORDS : HIT_WORDS;
  const text = pool[Math.floor(Math.random() * pool.length)];
  const isBonk = text === "BONK!";

  word.className = `hit-word${isBonk ? " hit-word--bonk" : ""}`;
  word.textContent = text;
  inner.appendChild(word);
  setTimeout(() => word.remove(), 560);
}

function triggerScreenFlash(kind) {
  gameContainer.classList.remove("flash-gold", "flash-rainbow", "flash-boss-red");
  void gameContainer.offsetWidth;
  if (kind === "rainbow") {
    gameContainer.classList.add("flash-rainbow");
  } else if (kind === "boss-red") {
    gameContainer.classList.add("flash-boss-red");
  } else {
    gameContainer.classList.add("flash-gold");
  }
  setTimeout(() => {
    gameContainer.classList.remove("flash-gold", "flash-rainbow", "flash-boss-red");
  }, 550);
}

function triggerBossSpawnFx(hole) {
  initAudio();
  playBossSpawnSound();
  gameContainer.classList.add("boss-alert");
  triggerScreenFlash("boss-red");
  hole.classList.add("boss-spawn");
  messageEl.textContent = "⚠️ ボスモグラ出現!!";
  setTimeout(() => hole.classList.remove("boss-spawn"), 1600);
}

function showBossDamagePop(hole, hpLeft) {
  const inner = hole.querySelector(".hole-inner");
  const pop = document.createElement("span");
  pop.className = "boss-damage-pop";
  pop.textContent = BOSS_HIT_WORDS[Math.floor(Math.random() * BOSS_HIT_WORDS.length)];
  inner.appendChild(pop);
  setTimeout(() => pop.remove(), 520);

  const hpPop = document.createElement("span");
  hpPop.className = "boss-hp-pop";
  hpPop.textContent = `HP ${hpLeft}`;
  inner.appendChild(hpPop);
  setTimeout(() => hpPop.remove(), 600);
}

function spawnBossConfetti() {
  const colors = ["#ff5252", "#ffca28", "#ffeb3b", "#ff9800", "#f48fb1", "#fff"];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("span");
    piece.className = "boss-confetti";
    piece.style.setProperty("--cf-x", `${(Math.random() - 0.5) * 280}px`);
    piece.style.setProperty("--cf-y", `${-80 - Math.random() * 120}px`);
    piece.style.setProperty("--cf-rot", `${Math.random() * 720}deg`);
    piece.style.background = colors[i % colors.length];
    piece.style.left = `${20 + Math.random() * 60}%`;
    piece.style.top = "38%";
    gameContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

function showBossVictoryBurst() {
  const burst = document.createElement("div");
  burst.className = "boss-victory-burst";
  burst.setAttribute("role", "status");
  burst.innerHTML = `
    <span class="boss-victory-title">ボス撃破!!</span>
    <span class="boss-victory-points">+${BOSS_MOLE_POINTS}</span>
  `;
  gameContainer.appendChild(burst);
  setTimeout(() => burst.remove(), 2400);
  spawnBossConfetti();
}

function triggerBossDefeatFx(hole) {
  clearBossAlert();
  triggerScreenFlash("gold");
  setTimeout(() => triggerScreenFlash("rainbow"), 280);
  hole.classList.add("hit-boss-burst");
  showBossVictoryBurst();
  shakeScreen("strong");
  spawnStars(hole, "rainbow");
  showScorePop(hole, BOSS_MOLE_POINTS, "boss");

  const inner = hole.querySelector(".hole-inner");
  const word = document.createElement("span");
  word.className = "hit-word hit-word--boss-defeat";
  word.textContent =
    BOSS_DEFEAT_WORDS[Math.floor(Math.random() * BOSS_DEFEAT_WORDS.length)];
  inner.appendChild(word);
  setTimeout(() => word.remove(), 900);
}

function triggerGoldSpawnFx(hole) {
  playGoldSpawnSound();
  triggerScreenFlash("gold");
  hole.classList.add("gold-spawn");
  setTimeout(() => hole.classList.remove("gold-spawn"), 1400);
}

function spawnRainbowSparkles(hole) {
  const inner = hole.querySelector(".hole-inner");
  const count = 10;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "spawn-sparkle";
    const angle = (Math.PI * 2 * i) / count;
    const dist = 20 + Math.random() * 24;
    spark.style.setProperty("--sx", `${Math.cos(angle) * dist}px`);
    spark.style.setProperty("--sy", `${Math.sin(angle) * dist - 12}px`);
    spark.style.left = "50%";
    spark.style.top = "38%";
    inner.appendChild(spark);
    setTimeout(() => spark.remove(), 680);
  }
}

function triggerRainbowSpawnFx(hole) {
  playRainbowSpawnSound();
  triggerScreenFlash("rainbow");
  hole.classList.add("rainbow-spawn");
  spawnRainbowSparkles(hole);
  setTimeout(() => hole.classList.remove("rainbow-spawn"), 1800);
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
  resultOverlay.classList.remove("rank-show");
  resultRankEl.classList.remove("rank-reveal");
  if (resultCardEl) {
    resultCardEl.className = "result-card";
  }
  if (resultRankMessageEl) {
    resultRankMessageEl.textContent = "";
  }
  if (resultNewRecordEl) {
    resultNewRecordEl.classList.add("hidden");
  }
}

function renderTitleMissions() {
  if (!titleMissionsListEl) return;
  const progress = loadMissionProgress();
  titleMissionsListEl.innerHTML = MISSION_DEFS.map((mission) => {
    const done = progress.completed.includes(mission.id);
    const current = Math.min(getMissionCurrent(mission, progress), mission.target);
    const pct = done ? 100 : Math.round((current / mission.target) * 100);
    return `
      <li class="title-mission-item${done ? " title-mission-item--done" : ""}">
        <span class="title-mission-icon" aria-hidden="true">${done ? "✓" : mission.icon}</span>
        <div class="title-mission-body">
          <span class="title-mission-name">${escapeHtml(mission.title)}</span>
          <span class="title-mission-progress">${done ? "達成！" : `${current}/${mission.target}`}</span>
          <span class="title-mission-bar" style="--mission-pct:${pct}%"></span>
        </div>
      </li>
    `;
  }).join("");
}

function renderTitleShowcase() {
  if (!titleShowcaseSlot || !titleShowcaseHole) return;
  const skinId = getEquippedSkin();
  const type =
    skinId && CHARACTER_HTML[skinId] && hasCharacter(skinId) ? skinId : "mole";
  titleShowcaseSlot.innerHTML = CHARACTER_HTML[type] || CHARACTER_HTML.mole;
  titleShowcaseHole.className = `title-showcase-hole hole up type-${type}`;
}

function renderTitleScreen() {
  renderCoinDisplay();
  renderSkinBadge();
  renderTitleShowcase();
  const def = getStageDef(getEquippedStage()) || STAGE_DEFS[0];
  if (titleStageDisplayEl) {
    titleStageDisplayEl.textContent = `📍 ${def.name}`;
  }
  renderTitleMissions();
  updateSubControls();
}

function showTitleScreen() {
  onTitleScreen = true;
  if (titleScreen) titleScreen.classList.remove("title-screen-hidden");
  if (gameContainer) gameContainer.classList.add("game-screen-hidden");
  closeAllSidePanels();
  hideResultOverlay();
  hideRecordBanner();
  countdownOverlay.classList.add("hidden");
  renderTitleScreen();
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.textContent = "▶ スタート";
  }
  diffButtons.forEach((btn) => (btn.disabled = false));
  setPlayerNameInputEnabled(true);
}

function hideTitleScreen() {
  onTitleScreen = false;
  if (titleScreen) titleScreen.classList.add("title-screen-hidden");
  if (gameContainer) gameContainer.classList.remove("game-screen-hidden");
}

function bindTitleUiSounds() {
  if (!titleScreen) return;
  titleScreen.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        if (!btn.disabled) playUiClickSound();
      },
      { capture: true }
    );
  });
}

function initTitleUI() {
  bindTitleUiSounds();
  showTitleScreen();
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
  gameContainer.classList.remove("combo-glow", "combo-rainbow");
  bossActive = false;
  clearBossAlert();

  score = 0;
  combo = 0;
  maxCombo = 0;
  timeLeft = GAME_DURATION;
  scoreEl.textContent = "0";
  timerEl.textContent = String(GAME_DURATION);
  updateComboDisplay();

  const diffLabel = DIFFICULTY[currentDifficulty]?.label || "普通";
  messageEl.textContent = `難易度「${diffLabel}」でスタートしよう！`;
  messageEl.classList.remove("game-over");

  startBtn.disabled = false;
  startBtn.textContent = "▶ スタート";
  diffButtons.forEach((btn) => (btn.disabled = false));

  rankingPanel.classList.add("hidden");
  zukanPanel.classList.add("hidden");
  setPlayerNameInputEnabled(true);
  updateSubControls();

  holes.forEach((hole) => {
    hole.disabled = true;
    clearCharacter(hole);
  });

  showTitleScreen();
}

function showResultOverlay(finalScore, isNewRecord, playerName) {
  const rank = getScoreRank(finalScore);
  if (resultPlayerNameEl) {
    resultPlayerNameEl.textContent = playerName;
  }
  if (resultNewRecordEl) {
    resultNewRecordEl.classList.toggle("hidden", !isNewRecord);
  }
  resultScoreEl.textContent = `${finalScore} 点`;
  resultHighscoreEl.textContent = `${highScore} 点`;
  resultComboEl.textContent = String(maxCombo);
  resultRankEl.textContent = rank;
  resultRankEl.className = `result-rank result-rank--${rank.toLowerCase()} rank-reveal`;
  resultRankMessageEl.textContent = RANK_MESSAGES[rank] || "";

  resultCardEl.className = `result-card result-card--rank-${rank.toLowerCase()}`;
  resultOverlay.classList.remove("hidden");
  resultOverlay.classList.add("rank-show");
  void resultRankEl.offsetWidth;

  playRankRevealSound(rank);

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
  if (!hole.classList.contains("up") || hole.classList.contains("hit")) return;
  // 爆弾は叩かずに見送るのが正解 → コンボは維持
  if (hole.dataset.type === "bomb") return;
  if (hole.dataset.type === "boss") {
    bossActive = false;
    clearBossAlert();
  }
  resetCombo();
}

function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function showMole() {
  if (!isPlaying) return;

  if (
    activeHole?.dataset.type === "boss" &&
    activeHole.classList.contains("up")
  ) {
    const nextDelay = minSpawn + Math.random() * (maxSpawn - minSpawn);
    moleTimer = setTimeout(showMole, nextDelay);
    return;
  }

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
  } else if (type === "rainbow") {
    triggerRainbowSpawnFx(hole);
  } else if (type === "boss") {
    triggerBossSpawnFx(hole);
  }

  if (type === "boss") {
    scheduleBossHide(hole);
  } else {
    const visibleTime =
      type === "rainbow" ? Math.round(moleVisibleTime * 1.4) : moleVisibleTime;

    clearHideTimer();
    hideTimer = setTimeout(() => {
      if (hole.classList.contains("up") && !hole.classList.contains("hit")) {
        missMole(hole);
        retractCharacter(hole, () => {
          if (activeHole === hole) activeHole = null;
        });
      }
    }, visibleTime);
  }

  const nextDelay = minSpawn + Math.random() * (maxSpawn - minSpawn);
  moleTimer = setTimeout(showMole, nextDelay);
}

function spawnStars(hole, type) {
  const inner = hole.querySelector(".hole-inner");
  const count =
    type === "rainbow"
      ? 10
      : type === "gold"
        ? 8
        : type === "boss"
          ? 12
          : type === "bomb"
            ? 4
            : 6;
  const colorClass =
    type === "rainbow"
      ? "hit-star--rainbow"
      : type === "gold"
        ? "hit-star--gold"
        : type === "boss"
          ? "hit-star--boss"
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

function showScorePop(hole, points, type) {
  const inner = hole.querySelector(".hole-inner");
  const pop = document.createElement("span");
  pop.className = "score-pop";
  if (points < 0) {
    pop.classList.add("score-pop--minus");
    pop.textContent = String(points);
  } else {
    if (type === "rainbow" || points >= 20) {
      pop.classList.add("score-pop--big");
    }
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

function getShakeIntensity(type, points) {
  if (type === "rainbow" || type === "gold" || type === "boss") return "strong";
  if (points >= HIGH_SCORE_SHAKE_POINTS) return "strong";
  if (type === "alien") return "normal";
  return "normal";
}

function playHitEffects(hole, points, type) {
  spawnStars(hole, type);
  showScorePop(hole, points, type);
  shakeScreen(getShakeIntensity(type, points));

  if (type === "gold") {
    hole.classList.add("hit-gold-burst");
    setTimeout(() => hole.classList.remove("hit-gold-burst"), 550);
  }
  if (type === "rainbow") {
    hole.classList.add("hit-rainbow-burst");
    setTimeout(() => hole.classList.remove("hit-rainbow-burst"), 600);
  }
}

function whackBoss(hole) {
  let hp = parseInt(hole.dataset.bossHp, 10) || BOSS_HP;
  addCombo();

  hp -= 1;
  if (hp > 0) {
    updateBossVisual(hole, hp);
    playBossHitSound(hp);
    vibrateBossHit(hp);
    showBossDamagePop(hole, hp);
    hole.classList.add("boss-hit-wobble");
    setTimeout(() => hole.classList.remove("boss-hit-wobble"), 300);
    shakeScreen(hp === 1 ? "strong" : "normal");
    scheduleBossHide(hole);
    return;
  }

  const points = BOSS_MOLE_POINTS;
  hole.classList.add("hit");
  score += points;
  scoreEl.textContent = score;
  activeHole = null;
  bossActive = false;
  clearHideTimer();

  playBossDefeatSound();
  vibrateBossDefeat();
  triggerBossDefeatFx(hole);
  incrementMissionStat("bossKills");

  setTimeout(() => clearCharacter(hole), 920);
}

function whack(hole) {
  if (!isPlaying) return;

  if (!hole.classList.contains("up")) {
    resetCombo();
    return;
  }

  const type = hole.dataset.type;

  if (type === "boss") {
    whackBoss(hole);
    return;
  }

  const isBomb = type === "bomb";
  let points;

  if (isBomb) {
    resetCombo();
    points = BOMB_POINTS;
  } else {
    addCombo();
    points = getBasePoints(type) * getMultiplier();
    trySpaceSkinBonus();
    if (type === "gold") incrementMissionStat("goldHits");
  }

  hole.classList.add("hit");
  score += points;
  scoreEl.textContent = score;
  activeHole = null;
  clearHideTimer();
  playHitSound(type);
  vibrateHit(type);
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
  hideTitleScreen();
  hideResultOverlay();
  hideRecordBanner();

  score = 0;
  combo = 0;
  maxCombo = 0;
  sessionBonusCoins = 0;
  timeLeft = GAME_DURATION;
  scoreEl.textContent = "0";
  timerEl.textContent = String(GAME_DURATION);
  updateComboDisplay();
  const diffLabel = DIFFICULTY[currentDifficulty]?.label || "普通";
  messageEl.textContent = `準備中...（${diffLabel}）`;
  messageEl.classList.remove("game-over");
  persistPlayerNameFromInput();
  bossActive = false;
  clearBossAlert();
  rankingPanel.classList.add("hidden");
  zukanPanel.classList.add("hidden");
  setPlayerNameInputEnabled(false);
  updateSubControls();
  startBtn.disabled = true;
  startBtn.textContent = "プレイ中...";
  diffButtons.forEach((btn) => (btn.disabled = true));

  holes.forEach((hole) => {
    hole.disabled = true;
    clearCharacter(hole);
  });

  isPlaying = true;
  updateSubControls();

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
  gameContainer.classList.remove("combo-glow", "combo-rainbow");
  bossActive = false;
  clearBossAlert();

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

  const playerName = getPlayerName();

  if (finalScore > 0) {
    void persistRankingScore({
      name: playerName,
      score: finalScore,
      date: new Date().toISOString(),
      difficulty: currentDifficulty,
    });
  }

  const earnedCoins = calculateCoinsFromScore(finalScore) + sessionBonusCoins;
  if (earnedCoins > 0) addCoins(earnedCoins);
  if (resultCoinsEl) {
    const bonusNote =
      sessionBonusCoins > 0 ? `（うちボーナス+${sessionBonusCoins}）` : "";
    resultCoinsEl.textContent = `+${earnedCoins} 🪙${bonusNote}`;
  }

  startBtn.disabled = false;
  startBtn.textContent = "▶ もう一度";
  diffButtons.forEach((btn) => (btn.disabled = false));

  const rank = getScoreRank(finalScore);
  const bonusText = sessionBonusCoins > 0 ? `・ボーナス+${sessionBonusCoins}🪙` : "";
  messageEl.innerHTML = isNewRecord
    ? `🎉 NEW RECORD! ${finalScore}点（ランク ${rank}）・+${earnedCoins}🪙${bonusText}`
    : `おしまい！ ${finalScore}点（ランク ${rank}）・+${earnedCoins}🪙${bonusText}`;

  messageEl.classList.add("game-over");
  setPlayerNameInputEnabled(true);
  showResultOverlay(finalScore, isNewRecord, playerName);
  checkSessionMissions(finalScore, maxCombo);
  updateSubControls();
}

// --- PWA ---

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }
}

function initPlayerNameUI() {
  loadPlayerNameIntoInput();
  if (!playerNameInput) return;
  playerNameInput.addEventListener("change", persistPlayerNameFromInput);
  playerNameInput.addEventListener("blur", persistPlayerNameFromInput);
}

function initGachaUI() {
  loadCoins();
  loadCollection();
  initPlayerNameUI();
  renderSkinBadge();
  renderZukan();
  updateSubControls();
  updateLoginBonusButton();

  if (gachaBtn) gachaBtn.addEventListener("click", startGacha);
  if (zukanBtn) zukanBtn.addEventListener("click", toggleZukan);
  if (rankingBtn) rankingBtn.addEventListener("click", toggleRanking);
  initMissionUI();
  initThemeShopUI();
  initStageUI();
  initTitleUI();
  initPanelDismiss();
  if (gachaCloseBtn) gachaCloseBtn.addEventListener("click", closeGachaModal);
  if (loginBonusBtn) loginBonusBtn.addEventListener("click", claimLoginBonus);
  if (zukanList) {
    zukanList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-skin-select]");
      if (btn && !btn.disabled) selectSkin(btn.dataset.skinSelect);
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
initGachaUI();
registerServiceWorker();
