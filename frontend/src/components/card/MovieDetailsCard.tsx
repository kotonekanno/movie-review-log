import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { MovieDetails } from "@/types/movie";
import { countryMap } from "@/constants/countries";

interface Props {
  movie?: MovieDetails;
}

const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

function MovieDetailsCard({ movie }: Props) {
  if (!movie) {
    return (
      <Card className="p-6">
        <CardContent>データがありません</CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <CardContent className="flex gap-6 p-0 items-stretch">
        <div className="w-[220px] shrink-0">
          <img
            src={POSTER_BASE_URL + movie.posterPath}
            alt="poster"
            className="w-full aspect-[2/3] object-cover rounded-md bg-black"
          />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold leading-tight">
                {movie.jaTitle}
              </p>
              <p className="text-xl text-muted-foreground">
                {movie.originalTitle}
              </p>
            </div>

              <div className="flex items-center gap-3 text-base">
                {movie.releaseYear}年
              </div>

              <div className="flex flex-wrap text-base">
                {movie.productionCountries
                  .map((country) => (countryMap[country]))
                  .join("、")
                }
              </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {movie.genres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-base px-4 py-3"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieDetailsCard;