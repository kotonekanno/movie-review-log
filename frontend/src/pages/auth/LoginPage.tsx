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
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        credentials: "include",
      });

      if (res.status === 204) {
        navigate("/");
      }
      
      return;
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast(location.state.message);
    }
  }, [location.state]);

  return (
    <>
      {loading && <LoadingOverlay open={true} />}

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