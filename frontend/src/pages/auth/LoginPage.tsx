import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import { toast } from "sonner";

import AuthForm from "@/components/form/AuthForm";
import LoadingOverlay from "@/components/others/LoadingOverlay";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async ({ email, password }: AuthFormValues) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        const token = data.token;

        localStorage.setItem("token", token);

        navigate("/");
      } else if (res.status === 401) {
        toast.error("パスワードが一致しません");
      } else if (res.status === 404) {
        toast.error("アカウントが見つかりません");
      } else {
        toast.error("ログインに失敗しました");
      }
    } catch (e) {
      toast.error("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.warning(location.state.message);
    }
  }, [location.state]);

  return (
    <>
      {loading && <LoadingOverlay open={true} />}

      <p className="text-red-500 text-center py-3">
        ※指定されたテストアカウントでのみログインできます
      </p>

      <AuthForm
        onSubmit={handleLogin}
        upperButtonText="ログイン"
        bottomButtonText="新規登録"
        bottomHref="/register"
      />
    </>
  );
}

export default LoginPage;