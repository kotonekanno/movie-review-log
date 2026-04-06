import { Star } from "lucide-react";

interface Props {
  score: number;
}

export default function ScoreStars({ score }: Props) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const fill = Math.min(Math.max(score - i, 0), 1);

        return (
          <div key={i} className="relative w-6 h-6">
            <Star className="absolute w-6 h-6 text-gray-300" />

            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}