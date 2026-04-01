import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReviewDetailsPage() {
  const { movieId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  const fetchReview = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${movieId}`);
      const data = await res.json();
      setReview(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${movieId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Delete succeeded");
        navigate("/reviews");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [movieId]);

  if (!review) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>{review.jaTitle}</h1>
      <img src={review.posterPath} alt={review.jaTitle} style={{ width: 150 }} />
      <div>原題: {review.originalTitle}</div>
      <div>公開年: {review.releaseYear}</div>
      <div>スコア: {review.score}</div>
      <div>レビュー: {review.text}</div>
      <div>鑑賞日: {review.watchedAt}</div>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
}

export default ReviewDetailsPage;