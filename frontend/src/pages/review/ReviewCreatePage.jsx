import ReviewForm from "../../components/ReviewForm";
import { useNavigate } from "react-router-dom";

function ReviewCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (review) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Review successfully created: " + data.reviewId);
        navigate("/reviews")
      }
    } catch (e) {
      console.error(e);
      alert("Review-create failed");
    }
  };

  return (
    <div>
      <h1>レビュー作成</h1>
      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ReviewCreatePage;