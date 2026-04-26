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
    throw new ApiError("POST /auth/register failed: email already exists", res.status);
  }

  throw new ApiError("POST /auth/register failed", res.status);
}

// ログイン
export async function login(form: AuthFormValues): Promise<void> {
  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });

  if (res.status === 200) {
    const data: LoginResponse = await res.json();
    localStorage.setItem("token", data.accessToken);
    return;
  }
  
  if (res.status === 401) {
    throw new ApiError("POST /auth/login failed: invalid credentials", res.status);
  }
  
  if (res.status === 404) {
    throw new ApiError("POST /auth/login failed: user not found", res.status);
  }

  throw new ApiError("POST /auth/login fail", res.status);
}

// ログアウト
export async function logout(): Promise<void> {
  const res = await apiClient("/auth/logout", {
    method: "POST",
  });

  if (res.status === 204) {
    localStorage.removeItem("token");
    return;
  }

  throw new ApiError("POST /auth/logout failed", res.status);
}

// ログイン済確認
export async function me(): Promise<void> {
  const res = await apiClient("/auth/me", {
    method: "GET",
  });

  if (res.status === 200) {
    return;
  }

  throw new ApiError("GET /auth/me failed", res.status);
}