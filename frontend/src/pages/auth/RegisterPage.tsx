import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AuthFormValues } from "@/types/auth";

import { toast } from "sonner";

import AuthForm from "@/components/form/AuthForm"
import LoadingOverlay from "@/components/others/LoadingOverlay";
import { register } from "@/api/auth";
import { ApiError } from "@/errors/ApiError";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  /*const handleRegister = async (form: AuthFormValues) => {
    setLoading(true);
    
    try {
      await register(form);
      
      toast.success("アカウントを作成しました");
      navigate("/login");
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 409) {
          toast.warning("このメールアドレスは既に登録されています");
        } else {
          toast.error("登録に失敗しました");
        }
      } else {
        toast.error("登録に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };*/

  // デモ用
  const handleRegister = () => {
    toast.warning("新規登録はできません");
  }

  return (
    <>
      {loading && <LoadingOverlay open={true}/>}

      <p className="text-red-500 text-center py-3">
        ※指定されたテストアカウントでのみログインできます
      </p>

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