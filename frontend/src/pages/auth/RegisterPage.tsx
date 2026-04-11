import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import AuthForm from "@/components/form/AuthForm"
import LoadingOverlay from "@/components/others/LoadingOverlay";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async ({ email, password }: AuthFormValues) => {
    setLoading(true);
    
    try {
      const res: Response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password })
      });

      if (res.status === 204) {
        navigate("/login");
      }

      return;
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay open={true}/>}

      <AuthForm
        onSubmit={handleRegister}
        upperButtonText="登録"
        bottomButtonText="すでにアカウントを持っている"
        bottomHref="/login"
      />
    </>
  );
}

export default RegisterPage;