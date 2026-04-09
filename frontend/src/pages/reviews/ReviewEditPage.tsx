import { useParams } from "react-router-dom";

import ReviewFormContainer from "@/pages/reviews/ReviewFormContainer";

function ReviewEditPage() {
  const { reviewId } = useParams();
  return <ReviewFormContainer mode="edit" reviewId={reviewId!} />;
}

export default ReviewEditPage;