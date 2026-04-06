import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import type { ReviewFormValues } from "@/types/review";
import type { MovieDetails } from "@/types/movie";
import type { Movie } from "@/types/movie";
import MovieSearchDialog from "../MovieSearchDialog";
import MovieDetailsCard from "../card/MovieDetailsCard";

interface ReviewFormProps {
  onSubmit: (values: ReviewFormValues) => void | Promise<void>;
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [movieId, setMovieId] = useState<number | undefined>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(2.5);
  const [watchedAt, setWatchedAt] = useState<string>(new Date().toISOString().slice(0,10));

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movieId) {
      alert("映画IDを取得できませんでした");
      return;
    }
    onSubmit({ movieId, text, score, watchedAt });
  };

  const fetchMovieDetails = async (tmdbId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/movies/${tmdbId}}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data: MovieDetails = await res.json();
        setMovie(data);
        setMovieId(data.movieId);
      } else {
        alert("Movie fetch failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occurd");
    }
  };

  useEffect(() => {
    if (tmdbId !== undefined) {
      fetchMovieDetails(tmdbId);
    }
  }, [tmdbId]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[48rem] p-4 mx-auto">
      
      <MovieSearchDialog
        onSelectMovie={(movie: Movie) => setTmdbId(movie.tmdbId)}
      />

      {movie && <MovieDetailsCard movie={movie} />}

      <Separator />

      <FieldSet className="w-full">
        <FieldGroup>
          <h2 className="text-xl font-bold text-gray-800 text-center">感想</h2>
          <Field>
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="h-[100px]"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Separator />

      <h2 className="text-xl font-bold text-gray-800 text-center">点数</h2>
      <div className="flex flex-col items-center w-full">
        <Slider
          value={[score]}
          min={0}
          max={5}
          step={0.1}
          onValueChange={(val) => setScore(val[0])}
          className="w-full max-w-xs"
        />
        <div className="mt-1 font-semibold text-center">{score.toFixed(1)}</div>
      </div>

      <Separator />

      <h2 className="text-xl font-bold text-gray-800 text-center">鑑賞日</h2>
      <div className="w-[200px] mx-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-left"
            >
              {watchedAt || "鑑賞日を選択"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watchedAt ? new Date(watchedAt) : undefined}
              onSelect={(date) => {
                if (date) setWatchedAt(date.toISOString().slice(0, 10));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="max-w-xs px-4 mx-auto my-8">
        保存
      </Button>
    </form>
  );
}

export default ReviewForm;