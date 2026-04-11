import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

function HomePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">

      <div className="grid gap-4 sm:grid-cols-2">

        <Link to="/reviews">
          <Card className="hover:bg-muted transition cursor-pointer">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">
                レビューを見る
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                投稿したレビュー一覧を確認できます
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/watchlist">
          <Card className="hover:bg-muted transition cursor-pointer">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">
                ウォッチリスト
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                観たい映画を管理できます
              </p>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}

export default HomePage;