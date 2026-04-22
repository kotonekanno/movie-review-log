import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import { toast } from "sonner";

import AuthForm from "@/components/form/AuthForm";
import LoadingOverlay from "@/components/others/LoadingOverlay";
import { login } from "@/api/auth";
import { ApiError } from "@/errors/ApiError";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (form: AuthFormValues) => {
    setLoading(true);

    try {
      const token = await login(form);

      localStorage.setItem("token", token);

      navigate("/");
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 401) {
          toast.error("パスワードが一致しません");
        } else if (e.status === 404) {
          toast.error("アカウントが見つかりません");
        } else {
          toast.error("ログインに失敗しました");
        }
      } else {
        toast.error("ログインに失敗しました");
      }
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