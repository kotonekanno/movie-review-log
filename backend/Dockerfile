# 1. JDK 17 の軽量イメージ
FROM eclipse-temurin:21-jdk-alpine

# 2. 作業ディレクトリ
WORKDIR /backend

# 3. Gradle Wrapperと依存関係の準備
COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle.kts settings.gradle.kts ./

# 4. 依存関係だけ先に取得（キャッシュ用）
RUN ./gradlew build -x test --no-daemon || true

# 5. ソースコードをコピー
COPY src/ src/

# 6. ビルド
RUN ./gradlew clean build -x test --no-daemon

# 7. アプリ起動
CMD ["java", "-jar", "build/libs/movie-review-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]