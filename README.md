# mirukyのIT備忘録

[![Deploy to GitHub Pages](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml)

AWS 全冠エンジニア **miruky** のポートフォリオサイト・技術ブログ・学習プラットフォームです。

**URL**: [https://miruky.github.io](https://miruky.github.io)



## 概要

ポートフォリオ・技術記事・学習コンテンツ・ミニゲームまで、エンジニアとしてのアウトプットをすべて集約したオールインワンの個人サイトです。  
完全な **静的サイト (Static Export)** として GitHub Pages にデプロイされ、サーバーレスで動作します。



## 主な機能

### ポートフォリオ（トップページ）
- **Hero**: 宇宙空間パーティクルアニメーション付きメインビジュアル（Canvas ベース）
- **About**: 自己紹介セクション
- **Skills**: 技術スキル一覧（カテゴリ別）
- **Career**: 経歴・キャリアタイムライン
- **Certifications**: 保有資格一覧（AWS 全冠含む）
- **Projects**: 個人開発プロジェクト紹介
- **Qiita / Zenn**: 最新記事の自動取得・プレビュー
- **Contact**: SNS リンク・連絡先

### Qiita 記事一覧 (`/articles/`)
- Qiita API を使用して全記事を自動取得・表示
- タグフィルタリング・キーワード検索
- いいね数・ストック数の表示

### スキルツリー (`/skilltree/`)
- 技術スキルをインタラクティブなツリーマップで可視化
- カテゴリフィルタ、ノードクリックで詳細表示
- 習熟度をビジュアルで表現

### プログラミング学習 (`/program/`)

#### Writing モード
- **9 言語 × 30 レッスン = 270 レッスン** のコーディング学習プラットフォーム
- 対応言語: Python / TypeScript / JavaScript / Java / Ruby / HTML&CSS / C言語 / SQL / セキュリティ
- ブラウザ内コードエディタ（シンタックスハイライト付き）
- ヒント・解答表示・進捗管理（localStorage）

#### Reading モード
- **9 言語 × 100 レッスン = 900 レッスン** のコード読解学習
- シンタックスハイライト付きのコード表示（Python / TypeScript / Java 対応）
- ハイライト範囲による段階的な解説
- 言語別・レッスン別の進捗管理

### AWS アーキテクト (`/architect/`)
- **100 レッスン** の AWS 構成設計シミュレーター
- React Flow ベースのドラッグ＆ドロップキャンバス
- AWS サービスパレットからノードを配置し、接続を構築
- 初級・中級・上級の3段階難易度
- 自動判定システム（サービス配置・接続・設定チェック）
- ヒント・解答・解説表示、進捗管理

### ブログ (`/blog/`)
- Markdown (gray-matter + remark) ベースの内部ブログ
- タグ表示、日付ソート
- **目次 (TOC) サイドバー**（xl 以上で表示、IntersectionObserver によるアクティブ追跡）
- OGP メタタグ（OpenGraph + Twitter Card）

### 学習ダッシュボード (`/dashboard/`)
- Writing / Reading / Architect / ゲームの進捗を一覧表示
- 言語別進捗バー、完了率、最終アクセス日
- localStorage から進捗データを集約

### プロジェクト一覧 (`/projects/`)
- 個人開発プロジェクトのギャラリー
- GitHub / デモリンクの表示

### ゲーム (`/game/`)
- **タイピングゲーム**: ローマ字タイピング（4 難易度 × 3 制限時間、ランキング機能付き）
- **ブロック積みゲーム**: 落下ブロックを積み上げるアーケード風ゲーム
- **IT 知識クイズ**: IPA 試験レベルの4択クイズ

### コンタクト (`/contact/`)
- GitHub / Qiita / X (Twitter) / Zenn / メールへのリンク集

### サイト内検索
- **Pagefind** による静的サイト全文検索
- `Ctrl + K` / `⌘ + K` でクイック起動
- ヘッダーに統合された検索ダイアログ



## SEO・パフォーマンス

| 項目 | 内容 |
|:--|:--|
| メタデータ | 全ページに `<title>` / `description` / OGP タグ設定 |
| サイトマップ | `sitemap.xml` をビルド時自動生成 |
| RSS フィード | `feed.xml` をビルド時自動生成 |
| robots.txt | クロール許可 + サイトマップ参照 |
| フォント最適化 | `next/font/google` による self-hosted フォント（Inter / Noto Sans JP / JetBrains Mono） |
| 画像最適化 | `next/image` による最適化（Header / Footer アイコン） |
| モバイル最適化 | SpaceBackground のパーティクル・星雲・銀河の描画量をモバイルで自動削減 |
| アクセシビリティ | `prefers-reduced-motion` 対応（銀河回転アニメーション無効化） |
| ダークモード | OS のシステム設定に自動追従（手動切替も可能） |



## 技術スタック

| カテゴリ | 技術 |
|:--|:--|
| フレームワーク | Next.js 14 (App Router / Static Export) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| アニメーション | Framer Motion |
| グラフエディタ | React Flow (@xyflow/react) |
| ブログエンジン | gray-matter + remark |
| テーマ | next-themes (ダーク/ライト/システム) |
| 検索 | Pagefind (静的サイト全文検索) |
| テスト | Vitest |
| フォント | next/font/google (Inter / Noto Sans JP / JetBrains Mono) |
| アイコン | react-icons |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |



## プロジェクト構成

```
src/
├── app/                          # Next.js App Router ページ
│   ├── layout.tsx                # ルートレイアウト（フォント・メタ・RSS リンク）
│   ├── page.tsx                  # トップページ（ポートフォリオ）
│   ├── providers.tsx             # ThemeProvider（system テーマ対応）
│   ├── articles/                 # Qiita 記事一覧
│   ├── skilltree/                # スキルツリー可視化
│   ├── program/                  # プログラミング学習
│   │   ├── writing/              # Writing モード（コーディング）
│   │   ├── reading/              # Reading モード（コード読解）
│   │   ├── [lang]/               # 言語別コース
│   │   └── [lang]/[lesson]/      # 個別レッスン
│   ├── architect/                # AWS アーキテクト設計
│   │   └── [lesson]/             # 個別レッスン（React Flow エディタ）
│   ├── blog/                     # ブログ一覧・記事詳細（TOC 付き）
│   ├── dashboard/                # 学習進捗ダッシュボード
│   ├── projects/                 # プロジェクト一覧
│   ├── game/                     # ミニゲーム
│   └── contact/                  # コンタクトページ
├── components/
│   ├── Header.tsx                # グローバルヘッダー（SearchDialog 統合）
│   ├── Footer.tsx                # グローバルフッター
│   ├── SearchDialog.tsx          # Pagefind 検索ダイアログ（Ctrl+K）
│   ├── BlogTOC.tsx               # ブログ記事の目次サイドバー
│   ├── ThemeToggle.tsx           # ダーク/ライト切り替え
│   ├── SpaceBackground.tsx       # 宇宙空間アニメーション（Canvas）
│   ├── ParticleBackground.tsx    # パーティクルアニメーション
│   ├── SkillTreeViz.tsx          # スキルツリー可視化
│   ├── ProgramEditor.tsx         # コードエディタ
│   ├── ReadingViewer.tsx         # コード読解ビューア
│   ├── TypingGame.tsx            # タイピングゲーム
│   ├── TypingResultScreen.tsx    # タイピング結果画面（抽出コンポーネント）
│   ├── BlockGame.tsx             # ブロック積みゲーム
│   ├── QuizGame.tsx              # IT クイズ
│   ├── architect/                # AWS アーキテクトコンポーネント群
│   └── sections/                 # トップページセクション群
├── data/
│   ├── config.ts                 # サイト設定（navItems 共通化）
│   ├── skills.ts                 # スキルデータ
│   ├── skilltree.ts              # スキルツリーデータ
│   ├── career.ts                 # キャリアデータ
│   ├── certifications.ts         # 資格データ
│   ├── projects.ts               # プロジェクトデータ
│   ├── typing-words.ts           # タイピングゲーム単語データ
│   ├── courses/                  # プログラミング学習コースデータ（9言語 × 30）
│   ├── reading/                  # Reading モードレッスンデータ（9言語 × 100）
│   └── architect/                # AWS アーキテクトレッスンデータ（100）
├── lib/
│   ├── blog.ts                   # ブログパーサー（目次抽出・ID 注入）
│   ├── romaji.ts                 # ローマ字変換エンジン
│   ├── typing-utils.ts           # タイピングゲーム共有ユーティリティ
│   ├── syntax-highlight.ts       # シンタックスハイライタ（Python/TS/Java）
│   ├── sanitize.ts               # URL サニタイズユーティリティ
│   ├── qiita.ts                  # Qiita API クライアント
│   ├── github.ts                 # GitHub API クライアント
│   ├── auth.ts                   # 認証ユーティリティ
│   └── __tests__/                # Vitest テスト
│       ├── romaji.test.ts        # ローマ字変換テスト（10テスト）
│       ├── sanitize.test.ts      # URL サニタイズテスト（7テスト）
│       ├── blog.test.ts          # ブログユーティリティテスト（8テスト）
│       └── typing-utils.test.ts  # タイピングユーティリティテスト（13テスト）
└── types/
    └── index.ts                  # グローバル型定義

scripts/
├── generate-blog-json.js         # ブログ記事 JSON 生成
├── generate-qiita-json.js        # Qiita 記事キャッシュ生成
├── generate-zenn-json.js         # Zenn 記事キャッシュ生成
├── generate-sitemap.js           # sitemap.xml 生成
└── generate-rss.js               # feed.xml (RSS 2.0) 生成

content/
└── blog/                         # Markdown ブログ記事

public/
├── robots.txt                    # クローラー設定
└── images/                       # 静的画像アセット
```



## はじめ方

```bash
# リポジトリをクローン
git clone https://github.com/miruky/miruky.github.io.git
cd miruky.github.io

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（JSON 生成 → サイトマップ → RSS → Next.js ビルド → Pagefind インデックス）
npm run build

# テスト実行
npm test

# 型チェック
npm run type-check
```



## コンテンツ規模

| コンテンツ | 件数 |
|:--|:--|
| Writing レッスン | 9 言語 × 30 = **270 レッスン** |
| Reading レッスン | 9 言語 × 100 = **900 レッスン** |
| AWS アーキテクトレッスン | **100 レッスン** |
| ミニゲーム | **3 種類** |
| ポートフォリオセクション | **8 セクション** |
| ユニットテスト | **38 テスト** |


## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
