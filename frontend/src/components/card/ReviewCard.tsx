import type { Review } from "@/types/review"

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ScoreStars from "../ScoreStars";

interface ReviewCardProps {
  review: Review;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ReviewCard({ review, onClick }: ReviewCardProps) {
  return (
    <>
      <Card className="relative mx-auto w-[240px] aspect-[2/3] pt-0 flex flex-col overflow-hidden my-4">
        <div onClick={onClick} className="flex-1 bg-gray-600 flex items-center justify-center cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/w500${review.posterPath}`}
            alt={review.title}
            className="h-full object-contain"
          />
        </div>

        <CardHeader>
          <CardTitle className="font-bold">{review.title}</CardTitle>
        </CardHeader>

        <CardFooter>
          <span className="mr-2">{review.score}</span>
          <ScoreStars score={review.score} />
        </CardFooter>
      </Card>
    </>
  );
}

export default ReviewCard;