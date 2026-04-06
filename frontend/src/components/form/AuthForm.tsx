import { useState } from "react";
import type { AuthFormValues } from "@/types/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  onSubmit: (values: AuthFormValues) => void | Promise<void>;
  upperButtonText: string;
  bottomButtonText: string;
  bottomHref: string;  
}

function AuthForm({ onSubmit, upperButtonText, bottomButtonText, bottomHref }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    void onSubmit({ email, password });
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-6">
      <CardHeader>
        <CardTitle className="mx-auto">{upperButtonText}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">パスワード</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {upperButtonText}
        </Button>
        <a
          href={bottomHref}
          className="inline-block text-sm underline-offset-4 hover:underline"
        >
          {bottomButtonText}
        </a>
      </CardFooter>
    </Card>
  );
}

export default AuthForm;