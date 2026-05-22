/**
 * Supabase 設定のコピー用テンプレート
 *
 * 1. このファイルを supabase-config.js にコピー
 * 2. Supabase ダッシュボードの値を入力
 * 3. enabled を true にする
 */
window.SUPABASE_CONFIG = {
  /** Project Settings → API → Project URL */
  url: "https://YOUR_PROJECT_ID.supabase.co",

  /** Project Settings → API → anon public または Publishable key（"eyJ..." または "sb_publishable_..."） */
  anonKey: "YOUR_ANON_KEY_HERE",

  /** SQL で作成するテーブル名（既定: rankings） */
  tableName: "rankings",

  /** false のときは従来どおり端末内（localStorage）のみ */
  enabled: true,
};
