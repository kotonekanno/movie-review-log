import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import { useNavigate } from "react-router-dom";

function ReviewListPage() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate;

  page = 1;

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews?page=${page}`);
      const data = await res.json();
      setReviews(data.reviews);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>レビュー一覧</h1>
      <div style={{ display: "flex", flexwrap: "wrap" }}>
        {reviews.map((r, idx) => (
          <ReviewCard 
            key={idx}
            review={r}
            onClick={() => navigate(`/reviews/${r.movieId}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewListPage;