<!-- omit in toc -->
# How to run

<!-- omit in toc -->
### Table of contents

- [Local](#local)
  - [DB  - PostgreSQL](#db----postgresql)
  - [Spring Boot  - Gradle(Kotlin)](#spring-boot----gradlekotlin)
  - [React](#react)
- [Others](#others)
  - [How to use poster path](#how-to-use-poster-path)


## Local

### DB  - PostgreSQL

```bash
psql -U postgres -W movie_review_app_dev
```

### Spring Boot  - Gradle(Kotlin)

```bash
./gradlew bootRun
```

Access http://localhost:8080/

### React

```bash
npm run dev
```

Access http://localhost:5173/login

## Others

### How to use poster path

Append to this:

```
https://image.tmdb.org/t/p/w500/
```