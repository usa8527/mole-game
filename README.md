# 🐹 もぐら叩き

HTML・CSS・JavaScript だけで作った、ブラウザで遊べるもぐら叩きゲームです。

## 遊び方

1. **難易度**を選ぶ（かんたん / ふつう / むずかしい）
2. **スタート** を押す（制限時間は **30秒**）
3. 穴から出たキャラをタップ
   - **もぐら** … 1点
   - **エイリアン** … 5点
   - **金モグラ** … 10点（レア）
   - **爆弾** … -5点＆コンボリセット（注意！）
4. 連続で叩くと **コンボ** が増える（爆弾は除く）
   - **3コンボ以上** → スコア **2倍**
   - **6コンボ以上** → スコア **3倍**
6. **空振り**（何も出ていない穴をタップ）や **見逃し** でコンボリセット
7. 終了後に **ランキング TOP5** と **ハイスコア** が表示される

### 難易度の違い

| 難易度 | もぐらの出る速さ |
|--------|------------------|
| かんたん | ゆっくり |
| ふつう | 標準 |
| むずかしい | 速い |

## ローカルで遊ぶ

```bash
# プロジェクトフォルダで
python3 -m http.server 8765
```

ブラウザで `http://localhost:8765` を開く。

> `index.html` を直接開いても遊べますが、PWA（ホーム画面追加）はローカルサーバー経由がおすすめです。

## GitHub Pages で公開する

1. GitHub にリポジトリを作成
2. このフォルダのファイルをすべて push
3. リポジトリの **Settings → Pages**
4. **Source** を `Deploy from a branch`、ブランチ `main`、`/ (root)` に設定
5. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

### ファイル構成

```
mole-game/
├── index.html               # メイン画面
├── style.css                # デザイン
├── script.js                # ゲームロジック
├── supabase-config.js       # Supabase 接続設定（要作成）
├── supabase-config.example.js
├── supabase-ranking.js      # ランキング API 処理
├── supabase-setup.sql       # DB 初期化 SQL
├── manifest.json            # PWA 設定
├── service-worker.js        # オフライン対応
├── icons/icon.svg           # ベクターアイコン
├── icons/icon-180.png       # iPhone 用
├── icons/icon-192.png       # PWA 用
├── icons/icon-512.png       # PWA 用
├── scripts/generate-icons.py
├── .nojekyll                # GitHub Pages 用
├── .nojekyll                # GitHub Pages 用
└── README.md
```

## PWA（ホーム画面に追加）

iPhone / Android で **ホーム画面に追加** すると、アプリのように全画面で起動できます。

### iPhone の手順

1. Safari でゲームの URL を開く（GitHub Pages なら `https://<ユーザー名>.github.io/mole-game/`）
2. 共有ボタン → **ホーム画面に追加**
3. 名前は **モグラパニック** と表示されます

### 構成

| ファイル | 役割 |
|----------|------|
| `manifest.json` | アプリ名・アイコン・テーマ色・起動 URL |
| `service-worker.js` | オフライン用キャッシュ（相対パスで GitHub Pages 対応） |
| `icons/icon-180.png` | iPhone 用ホーム画面アイコン |
| `icons/icon-192.png` / `icon-512.png` | Android / インストール用 |
| `.nojekyll` | GitHub Pages で Jekyll を無効化 |

アイコン PNG を再生成する場合:

```bash
python3 scripts/generate-icons.py
```

## データの保存

### 端末内（localStorage）

- ハイスコア
- コイン・図鑑・ミッションなど

### オンラインランキング（Supabase・任意）

全員で共有する **ランキング TOP10** を Supabase に保存できます。

#### セットアップ手順

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. **SQL Editor** で `supabase-setup.sql` の内容を実行（テーブル＋RLS）
3. **Project Settings → API** から次をコピー
   - Project URL
   - `anon` `public` キー
4. リポジトリで設定ファイルを用意

```bash
cp supabase-config.example.js supabase-config.js
```

5. `supabase-config.js` を編集

```javascript
window.SUPABASE_CONFIG = {
  url: "https://xxxxx.supabase.co",
  anonKey: "eyJhbGciOi...",
  tableName: "rankings",
  enabled: true,  // ← true にする
};
```

6. ローカルまたは GitHub Pages でゲームを開き、プレイ後に **ランキング** ボタンで TOP10 を確認

> `enabled: false` のときは、これまで通り **この端末だけ** のランキング（localStorage）になります。  
> `supabase-config.js` は `.gitignore` に入れているため、**anon キーを Git に上げない** で済みます（公開時は各自の `supabase-config.js` をデプロイに含めるか、CI で注入してください）。

## 技術

- HTML / CSS / JavaScript（フレームワークなし）
- Web Audio API（効果音）
- PWA（manifest + Service Worker）
