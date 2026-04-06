import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

function HomePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">

      <div className="grid gap-4 sm:grid-cols-2">

        <Link to="/reviews">
          <Card className="hover:bg-muted transition cursor-pointer">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
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
              <h2 className="text-lg font-semibold">
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

/*import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div style={{ display: "flex"}}>
        <div style={{ flex: 1 }}>
          <a href="/watchlist">ウォッチリスト</a>
        </div>
        <div style={{ flex: 1 }}>
          <a href="/reviews">レビュー</a>
        </div>
      </div>

      <h2>テスト用</h2>
      <ul>
        <li><Link to="/logout">Log out</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/reviews">Review List</Link></li>
        <li><Link to="/reviews/edit">Create Review</Link></li>
        <li><Link to="/reviews/1">Review Details</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </div>
  );
}*/