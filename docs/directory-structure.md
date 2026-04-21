
<!-- omit in toc -->
# ディレクトリ構成

<!-- omit in toc -->
### 目次

- [バックエンド](#バックエンド)
- [フロントエンド](#フロントエンド)

## バックエンド

```
backend/
├── src/main/
│   ├── java/com/kotonekanno/
│   │   ├── config/             # === 共通設定 ===
│   │   │
│   │   ├── controller/         # === プレゼンテーション層 ===
│   │   │
│   │   ├── dto/                # === データ転送オブジェクト ===
│   │   │   ├── movie/
│   │   │   ├── review/
│   │   │   ├── watchlist/
│   │   │   └── external/
│   │   │        └── tmdb/
│   │   │
│   │   ├── entity/             # === JPAエンティティ ===
│   │   │
│   │   ├── enums/              # === 列挙型 ===
│   │   │
│   │   ├── exception/          # === 例外処理 ===
│   │   │   ├── custom/
│   │   │   └── handler/
│   │   │
│   │   ├── repository/         # === データアクセス層 ===
│   │   │
│   │   ├── security/           # === Spring Security ===
│   │   │
│   │   ├── service/            # == ビジネスロジック層 ==
│   │   │   ├── application/
│   │   │   ├── external/
│   │   │   └── maintenance/
│   │   │
│   │   └── MovieReviewApplication.java  # エントリーポイント
│   └── resources/
│        ├── db/
│        │   └── migration/      # DBマイグレーション（Flyway）
│        ├── application.yml         # 共通設定
│        ├── application-local.yml   # ローカル環境用設定
│        └── application-prod.yml    # 本番環境用設定
├── build.gradle.kts             # Gradleビルド設定
├── settings.gradle.kts
├── Dockerfile
├── .dockerignore
├── .env                         # ローカル環境変数
└── .env.production              # 本番環境変数
```

## フロントエンド
```
frontend/
├── node_modules/           # 依存パッケージ（自動生成）
├── public/                 # 静的ファイル
│   ├── fonts/
│   └── favicon.png
├── src/
│   ├── assets/            # 画像などの静的リソース
│   │
│   ├── components/        # 再利用可能なUIコンポーネント
│   │   ├── button/
│   │   ├── card/
│   │   ├── dialog/
│   │   ├── form/
│   │   ├── skeleton/
│   │   ├── others/
│   │   └── ui/           # shadcn/uiのコンポーネント
│   │
│   ├── constants/         # 固定値
│   │
│   ├── layout/            # レイアウト
│   │
│   ├── lib/
│   │
│   ├── pages/             # 画面単位のコンポーネント
│   │   ├── auth/
│   │   ├── reviews/
│   │   ├── watchlist/
│   │   └── HomePage.tsx
│   │
│   ├── types/             # 型定義
│   │
│   ├── App.tsx            # ルートコンポーネント
│   ├── main.tsx           # エントリーポイント
│   ├── index.css          # グローバルCSS
│   ├── global.d.ts        # グローバル型定義
│   └── vite-env.d.ts      # Vite環境用型定義
├── index.html              # HTMLテンプレート
├── .env                    # ローカル環境変数
├── .env.production         # 本番環境変数
│
├── tsconfig.json           # TypeScript設定
├── tsconfig.app.json       # アプリ用設定
├── tsconfig.node.json      # Node用設定
│
├── package.json            # 依存関係・スクリプト
├── package-lock.json       # 依存関係ロック
│
├── components.json         # shadcn/ui設定
├── vite.config.ts          # Vite設定
├── tailwind.config.js      # Tailwind CSS設定
├── postcss.config.js       # PostCSS設定
├── eslint.config.js        # ESLint設定
└── vercel.json             # Vercelデプロイ設定
```