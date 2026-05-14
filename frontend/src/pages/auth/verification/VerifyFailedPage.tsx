import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { resendVerification } from "@/api/auth";
import { toast } from "sonner";
import { ApiError } from "@/errors/ApiError";

export default function VerifyFailedPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const resend: () => Promise<void> = async () => {
    try {
      await resendVerification(email);

      toast.success("メールを再送しました");
      navigate("/verify-notice", {
        state: {
          email: email,
        },
      });
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 404) {
          toast.error("アカウントが見つかりません");
        } else if (e.status === 409) {
          toast.warning("このアカウントは既に認証されています");
        }
      }
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div>
          <CardTitle>メール認証に失敗しました</CardTitle>

          <CardDescription className="mt-2 space-y-2">
            <p>
              認証リンクが無効、または期限切れの可能性があります。
            </p>
          </CardDescription>
        </div>
      </CardHeader>

      <hr/>

      <CardContent className="space-y-3">
        <p className="text-center">
          確認メールを再送するには、<br/>
          メールアドレスを入力してください。
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await resend();
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
          >
            メールを再送
          </Button>
        </form>

        <div className="flex justify-center gap-6">
          <Button variant="link" asChild>
            <Link to="/login">
              ログインページへ
            </Link>
          </Button>

          <Button variant="link" asChild>
            <Link to="/register">
              新規登録に戻る
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}