import { useNavigate } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import AuthForm from "@/components/form/AuthForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: AuthFormValues) => {
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
        console.log("Login succeeded!");
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (e) {
      console.error("Login failed: " + e);
    }
  };

  return (
    <div>
      <AuthForm
        onSubmit={handleLogin}
        upperButtonText="ログイン"
        bottomButtonText="新規登録"
        bottomHref="/register"
      />
    </div>
  );
}

export default LoginPage;