function ReviewCard({ review, onClicl }) {
  return (
    <div onClick={onClick} style={{ border: "1px solid #ccc, margin: 5, padding: 5"}}>
      <img src={review.posterPath} alt={review.title} style={{ width: 80 }} />
      <div>{review.title}</div>
      <div>Score: {review.score}</div>
    </div>
  );
}

export default ReviewCard;