import { useState } from "react";

function ReviewForm({ onSubmit }) {
  const [movieId, setMovieId] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);
  const [watchedAt, setWatchedAt] = useState("");   // 今日の日付

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ movieId, text, score, watchedAt });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="映画ID" value={movieId} onChange={e => setMovieId(e.target.value)} required />
      <textarea placeholder="レビュー" value={text} onChange={e => setText(e.target.value)} required />
      <input type="number" placeholder="スコア" value={score} onChange={e => setScore(Number(e.target.value))} required />
      <input type="date" placeholder="鑑賞日" value={watchedAt} onChange={e => setWatchedAt(e.target.value)} required />
      <button type="submit">レビュー投稿</button>
    </form>
  );
}

export default ReviewForm;