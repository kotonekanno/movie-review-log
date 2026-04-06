import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/form/AuthForm";
import type { AuthFormValues } from "@/types/auth";

function LoginPage() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      });

      if (res.ok) {
        alert("Login succeeded!");
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (e) {
      alert("Error occured");
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