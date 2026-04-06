import { useNavigate } from "react-router-dom";

import AuthForm from "../../components/form/AuthForm"
import type { AuthFormValues } from "@/types/auth";

function RegisterPage() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async ({ email, password }: AuthFormValues) => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password })
      });

      if (res.status === 204) {
        alert("Registration succeded!");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occured");
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