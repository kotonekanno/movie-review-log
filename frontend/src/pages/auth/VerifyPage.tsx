import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { verify } from "@/api/auth";

type Status = "loading" | "success" | "error";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const run = async () => {
      try {
        await verify(token);

        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };

    run();
  }, [searchParams]);

  useEffect(() => {
    if (status === "success") {
      navigate("/verified");
    }

    if (status === "error") {
      navigate("/verify-failed");
    }
  }, [status, navigate]);

  return (
    <p>検証中...</p>
  );
}

export default VerifyPage;