import { Link } from "react-router-dom";

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
        <li><Link to="/reviews/create">Create Review</Link></li>
        <li><Link to="/reviews">Review Details</Link></li>
      </ul>
    </div>
  );
}