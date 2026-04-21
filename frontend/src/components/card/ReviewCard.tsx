import type { Review } from "@/types/review";

import { Card } from "@/components/ui/card";

import ScoreStars from "@/components/others/ScoreStars";

interface Props {
  review: Review;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ReviewCard({ review, onClick }: Props) {
  return (
    <>
      <Card className="relative mx-auto w-[240px] aspect-[2/3] pt-0 flex flex-col overflow-hidden my-4 transition hover:-translate-y-2 hover:shadow-2xl duration-300">
        <div onClick={onClick} className="flex-1 bg-gray-600 flex items-center justify-center cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/w500${review.posterPath}`}
            alt={review.title}
            className="h-full object-contain"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2">
          <div className="font-bold text-sm truncate">{review.title}</div>
          <div className="flex items-center text-xs">
            <span className="mr-1">{review.score}</span>
            <ScoreStars score={review.score} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default ReviewCard;