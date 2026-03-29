# mirukyのIT備忘録

[![Deploy to GitHub Pages](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml)

AWS 全冠エンジニア **miruky** のポートフォリオサイト・技術ブログ・学習プラットフォームです。

**🌐 URL**: [https://miruky.github.io](https://miruky.github.io)

---

## 📌 サイト概要

ポートフォリオ・技術記事・学習コンテンツ・ミニゲームまで、エンジニアとしてのアウトプットをすべて集約したオールインワンの個人サイトです。

---

## 🚀 主な機能

### 🏠 ポートフォリオ（トップページ）
- **Hero**: パーティクルアニメーション付きのメインビジュアル
- **About**: 自己紹介セクション
- **Skills**: 技術スキル一覧（カテゴリ別）
- **Career**: 経歴・キャリアタイムライン
- **Certifications**: 保有資格一覧（AWS 全冠含む）
- **Projects**: 個人開発プロジェクト紹介
- **Qiita**: 最新記事の自動取得・プレビュー
- **Contact**: SNS リンク・連絡先

### 📝 Qiita 記事一覧 (`/articles/`)
- Qiita API を使用して全記事を自動取得・表示
- タグフィルタリング・キーワード検索
- いいね数・ストック数の表示

### 🌳 スキルツリー (`/skilltree/`)
- 技術スキルをインタラクティブなツリーマップで可視化
- カテゴリフィルタ、ノードクリックで詳細表示
- 習熟度をビジュアルで表現

### 💻 プログラミング学習 (`/program/`)
- **9 言語 × 30 レッスン = 270 レッスン** のコーディング学習プラットフォーム
- 対応言語: Python / TypeScript / JavaScript / Java / Ruby / HTML&CSS / C言語 / SQL / セキュリティ
- ブラウザ内コードエディタ（シンタックスハイライト付き）
- ヒント・解答表示・進捗管理（localStorage）

### 🏗️ AWS アーキテクト (`/architect/`)
- **100 レッスン** の AWS 構成設計シミュレーター
- React Flow ベースのドラッグ＆ドロップキャンバス
- AWS サービスパレットからノードを配置し、接続を構築
- 初級・中級・上級の3段階難易度
- 自動判定システム（サービス配置・接続・設定チェック）
- ヒント・解答・解説表示、進捗管理

### 📖 ブログ (`/blog/`)
- Markdown (gray-matter + remark) ベースの内部ブログ
- タグ表示、日付ソート

### 📂 プロジェクト一覧 (`/projects/`)
- 個人開発プロジェクトのギャラリー
- GitHub / デモリンクの表示

### 🎮 ゲーム (`/game/`)
- **タイピングゲーム**: ローマ字タイピングで腕試し
- **ブロック積みゲーム**: 落下ブロックを積み上げるアーケード風ゲーム
- **IT 知識クイズ**: IPA 試験レベルの4択クイズ

### ✉️ コンタクト (`/contact/`)
- GitHub / Qiita / X (Twitter) / Zenn / メールへのリンク集

---

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|:--|:--|
| フレームワーク | Next.js 14 (App Router / Static Export) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| アニメーション | Framer Motion |
| グラフエディタ | React Flow (@xyflow/react) |
| ブログエンジン | gray-matter + remark |
| テーマ | next-themes (ダーク/ライトモード) |
| アイコン | react-icons |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📁 ディレクトリ構成

```
src/
├── app/                        # Next.js App Router ページ
│   ├── page.tsx                # トップページ（ポートフォリオ）
│   ├── articles/               # Qiita 記事一覧
│   ├── skilltree/              # スキルツリー可視化
│   ├── program/                # プログラミング学習
│   │   ├── [lang]/             # 言語別コース
│   │   └── [lang]/[lesson]/    # 個別レッスン
│   ├── architect/              # AWS アーキテクト設計
│   │   └── [lesson]/           # 個別レッスン（React Flow エディタ）
│   ├── blog/                   # ブログ一覧・記事詳細
│   ├── projects/               # プロジェクト一覧
│   ├── game/                   # ミニゲーム
│   └── contact/                # コンタクトページ
├── components/
│   ├── Header.tsx              # グローバルヘッダー
│   ├── Footer.tsx              # グローバルフッター
│   ├── ThemeToggle.tsx         # ダーク/ライト切り替え
│   ├── ParticleBackground.tsx  # パーティクルアニメーション
│   ├── SkillTreeViz.tsx        # スキルツリー可視化
│   ├── ProgramEditor.tsx       # コードエディタ
│   ├── TypingGame.tsx          # タイピングゲーム
│   ├── BlockGame.tsx           # ブロック積みゲーム
│   ├── QuizGame.tsx            # IT クイズ
│   ├── architect/              # AWS アーキテクトコンポーネント群
│   │   ├── ArchitectEditor.tsx # メインエディタ（React Flow）
│   │   ├── ServiceNode.tsx     # サービスノード
│   │   ├── ServicePalette.tsx  # サービスD&Dパレット
│   │   └── AwsServiceIcon.tsx  # サービスアイコン
│   └── sections/               # トップページセクション
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── CareerSection.tsx
│       ├── CertificationsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── QiitaSection.tsx
│       └── ContactSection.tsx
├── data/
│   ├── config.ts               # サイト設定
│   ├── skills.ts               # スキルデータ
│   ├── career.ts               # キャリアデータ
│   ├── certifications.ts       # 資格データ
│   ├── projects.ts             # プロジェクトデータ
│   ├── courses/                # プログラミング学習コースデータ
│   │   ├── index.ts            # コース統合（9言語）
│   │   ├── types.ts            # 型定義
│   │   ├── python.ts           # Python 30レッスン
│   │   ├── typescript.ts       # TypeScript 30レッスン
│   │   ├── javascript.ts       # JavaScript 30レッスン
│   │   ├── java.ts             # Java 30レッスン
│   │   ├── ruby.ts             # Ruby 30レッスン
│   │   ├── html-css.ts         # HTML/CSS 30レッスン
│   │   ├── c-lang.ts           # C言語 30レッスン
│   │   ├── sql.ts              # SQL 30レッスン
│   │   └── secure.ts           # セキュリティ 30レッスン
│   └── architect/              # AWS アーキテクトレッスンデータ
│       ├── index.ts            # 全100レッスン統合
│       ├── types.ts            # 型定義
│       ├── services.ts         # AWS サービスマスタ
│       ├── lessons-beginner.ts # 初級レッスン（1-40）
│       ├── lessons-intermediate.ts # 中級レッスン（41-70）
│       └── lessons-advanced.ts # 上級レッスン（71-100）
├── lib/
│   ├── blog.ts                 # ブログ記事パーサー
│   ├── qiita.ts                # Qiita API クライアント
│   └── github.ts               # GitHub API クライアント
└── types/
    └── index.ts                # グローバル型定義
content/
└── blog/                       # Markdown ブログ記事
public/
└── images/                     # 静的画像アセット
```

---

## 🏃 ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（ブログ JSON 生成 + Next.js ビルド）
npm run build

# 型チェック
npm run type-check
```

---

## 📊 コンテンツ規模

| コンテンツ | 件数 |
|:--|:--|
| プログラミングレッスン | 9言語 × 30 = **270 レッスン** |
| AWS アーキテクトレッスン | **100 レッスン** |
| ミニゲーム | **3 種類** |
| ポートフォリオセクション | **8 セクション** |

---

## ライセンス

MIT
