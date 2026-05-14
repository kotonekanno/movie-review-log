import { Link, useLocation, useNavigate } from "react-router-dom";

import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resendVerification } from "@/api/auth";
import { toast } from "sonner";
import { ApiError } from "@/errors/ApiError";

export default function VerifyNoticePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email: string = location.state?.email;

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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Mail className="h-6 w-6" />
        </div>

        <div>
          <CardTitle>確認メールを送信しました</CardTitle>
          <CardDescription className="mt-2">
            <span className="font-medium">{email}</span>
            に確認メールを送信しました。
            <br />
            メール内のリンクをクリックして登録を完了してください。
          </CardDescription>
        </div>
      </CardHeader>

      <hr/>

      <CardContent className="text-muted-foreground text-sm">
        <ul className="list-disc space-y-1 pl-5">
          <li>メールが届かない場合は迷惑メールをご確認ください</li>
          <li>認証リンクの有効期限は30分です</li>
        </ul>
      </CardContent>

      <CardContent className="space-y-3">
        <Button
          onClick={resend}
          className="w-full"
        >
          メールを再送
        </Button>

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