import { Card, CardContent } from "@/components/ui/card";

import type { MovieDetails } from "@/types/movie";

interface Props {
  movie?: MovieDetails;
}

const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

function MovieDetailsCardForWatchlist({ movie }: Props) {
  return (
    <Card className="p-6">
      <CardContent className="flex gap-6 p-0">
        <div className="w-[220px] shrink-0">
          <img
            src={POSTER_BASE_URL + movie!.posterPath}
            alt="poster"
            className="w-full aspect-[2/3] object-cover rounded-md bg-black"
          />
        </div>

        <div className="flex flex-col gap-2 justify-start">
          <p className="text-3xl font-bold leading-tight">
            {movie? movie.jaTitle : "不明なタイトル"}
          </p>

          <p className="text-xl text-muted-foreground">
            {movie? movie.originalTitle : "不明なタイトル"}
          </p>

          <p className="text-sm text-muted-foreground">
            {movie ? movie.releaseYear : "???"}年
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieDetailsCardForWatchlist;