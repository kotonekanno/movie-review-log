import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { verify } from "@/api/auth";
import { toast } from "sonner";
import VerifySuccessPage from "./verification/VerifySuccessPage";
import VerifyFailedPage from "./verification/VerifyFailedPage";

type Status = "loading" | "success" | "error";

function VerifyPage() {
  const [searchParams] = useSearchParams();

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

  if (status === "loading") {
    return <p>認証中...</p>;
  }

  if (status === "success") {
    return <VerifySuccessPage />;
  }

  return <VerifyFailedPage />;
}

export default VerifyPage;