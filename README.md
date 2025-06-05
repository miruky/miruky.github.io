# mirukyのIT備忘録

[![Deploy to GitHub Pages](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/miruky/miruky.github.io/actions/workflows/deploy.yml)

AWS 全冠エンジニア miruky のポートフォリオサイト・技術ブログです。

**URL**: [https://miruky.github.io](https://miruky.github.io)

## 主な機能

- **ポートフォリオ**: スキル、キャリア、資格、プロジェクトを一覧表示
- **Qiita 連携**: Qiita API を使用した記事自動取得・表示
- **ブログ**: Markdown ベースの内部ブログ機能
- **ダークモード**: ダークファーストの UI デザイン
- **アニメーション**: Framer Motion によるスムーズなインタラクション

## 技術スタック

| カテゴリ | 技術 |
|:--|:--|
| フレームワーク | Next.js 14 (Static Export) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| アニメーション | Framer Motion |
| ブログエンジン | gray-matter + remark |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## ディレクトリ構成

```
src/
├── app/              # Next.js App Router ページ
├── components/       # UI コンポーネント
│   └── sections/     # ページセクション
├── data/             # 静的データ（スキル、キャリア等）
├── lib/              # ユーティリティ（API クライアント等）
└── types/            # TypeScript 型定義
content/
└── blog/             # Markdown ブログ記事
```

## ライセンス

MIT
