
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
│   │   └── config/
│   │   └── exception/
│   │   └── entity/
│   │   └── repository/
│   │   └── service/
│   │   └── controller/
│   │   └── dto/
│   │   └── form/
│   │   └── MovieReviewApplication.java
│   └── resources/
│        └── db/migration/
│        └── templates/
│        └── application.yml
│        └── application-local.yml
│        └── application-prod.yml
├── build.gradle.kts
├── settings.gradle.kts
├── Dockerfile
├── .dockerignore
├── .env
└── .env.production
```

## フロントエンド
```
frontend/
├── node_modules/
├── public/fonts/
├── src/
│   ├── components/
│   ├── layout/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── global.d.ts
│   └── vite-env.d.ts
├── index.html
├── .env
├── .env.production
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── package-lock.json
├── components.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── vercel.json
```