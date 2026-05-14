import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function VerifySuccessPage() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div>
          <CardTitle>メール認証が完了しました</CardTitle>
          <CardDescription className="mt-2">
            アカウント登録が完了しました。
            <br />
            ログインしてサービスをご利用ください。
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <Button className="w-full">
          <Link to="/login">
            ログイン画面へ
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}