import type { AuthFormValues, LoginResponse } from "@/types/auth";
import { apiClient } from "./client";
import { ApiError } from "@/errors/ApiError";

// 新規登録
export async function register(form: AuthFormValues): Promise<void> {
  const res = await apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    })
  });

  if (res.status === 201) {
    return;
  }

  if (res.status === 409) {
    throw new ApiError("POST /auth/register failed: email already exists");
  }

  throw new ApiError("POST /auth/register failed");
}

// ログイン
export async function login(form: AuthFormValues): Promise<string> {
  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });

  if (res.status === 200) {
    const data: LoginResponse = await res.json();
    return data.token;
  } else if (res.status === 401) {
    throw new ApiError("POST /auth/login failed: invalid credentials");
  } else if (res.status === 404) {
    throw new ApiError("POST /auth/login failed: user not found");
  }

  throw new ApiError("POST /auth/login fail");
}

// ログアウト
export async function logout(): Promise<void> {
  const res = await apiClient("/auth/logout", {
    method: "POST",
  })

  if (res.status === 204) {
    return;
  }

  throw new ApiError("POST /auth/logout failed");
}

// ログイン済確認
export async function me(): Promise<void> {
  const res = await apiClient("/auth/me", {
    method: "GET",
  });

  if (res.status === 200) {
    return;
  }

  throw new ApiError("GET /auth/me failed:");
}