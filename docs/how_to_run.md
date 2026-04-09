<!-- omit in toc -->
# How to run

<!-- omit in toc -->
### Table of contents

- [Local](#local)
  - [DB  - PostgreSQL](#db----postgresql)
    - [Update is\_activate in users](#update-is_activate-in-users)
  - [Spring Boot  - Gradle(Kotlin)](#spring-boot----gradlekotlin)
  - [React](#react)
  - [Docker](#docker)
- [Others](#others)
  - [How to use poster path](#how-to-use-poster-path)
- [How to install shadcn components](#how-to-install-shadcn-components)


## Local

### DB  - PostgreSQL

```bash
psql -U postgres -W movie_log_dev
```

#### Update is_activate in users

```sql
update users set is_active=true where email='test1@test.com';
```

### Spring Boot  - Gradle(Kotlin)

```bash
./gradlew bootRun
```

Access http://localhost:8080/login

### React

```bash
npm run dev
```

Access http://localhost:5173/login

### Docker

1. build
  ```bash
  sudo docker build -t movie-log-backend .
  ```

2. run
  ```bash
  sudo docker run --rm -p 8080:8080 --env-file .env movie-log-backend
  ```

## Others

### How to use poster path

Append to this:

https://image.tmdb.org/t/p/w500/


## How to install shadcn components

```bash
npx shadcn@latest add <component>
```