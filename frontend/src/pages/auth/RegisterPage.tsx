import { useNavigate } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import AuthForm from "@/components/form/AuthForm"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ email, password }: AuthFormValues) => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password })
      });

      if (res.status === 204) {
        console.log("Registration succeded!");
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (e) {
      console.error("Registration failed: " + e);
    }
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      upperButtonText="登録"
      bottomButtonText="すでにアカウントを持っている"
      bottomHref="/login"
    />
  );
}

export default RegisterPage;