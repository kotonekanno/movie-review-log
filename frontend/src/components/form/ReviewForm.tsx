import { useState, useEffect } from "react";

import type { ReviewFormValues } from "@/types/review";
import type { MovieDetails, MovieOverview } from "@/types/movie";

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
import { toast } from "sonner";

import MovieSearchDialog from "@/components/dialog/MovieSearchDialog";
import MovieDetailsCard from "@/components/card/MovieDetailsCard";
import MovieDetailsCardSkeleton from "@/components/skeleton/MovieDetailsCardSkeleton";
import { getMovieDetails } from "@/api/movie";

type ReviewFormProps =
  | {
      mode: "create";
      onSubmit: (values: ReviewFormValues) => void | Promise<void>;
    }
  | {
      mode: "edit";
      onSubmit: (values: ReviewFormValues) => void | Promise<void>;
      prevReview: ReviewFormValues;
      prevMovie: MovieDetails;
    };

function ReviewForm(props: ReviewFormProps) {
  const [movie, setMovie] = useState<MovieDetails>();
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(2.5);
  const [watchedAt, setWatchedAt] = useState<string>(
    new Date().toLocaleDateString("sv-SE")
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tmdbId) {
      toast.error("映画IDを取得できませんでした");
      return;
    }
    props.onSubmit({ tmdbId, text, score, watchedAt });
  };

  const fetchMovieDetails = async (tmdbId: number) => {
    try {
      setLoading(true);

      const data: MovieDetails = await getMovieDetails(tmdbId);
      setMovie(data);
      setTmdbId(data.tmdbId);
    } catch (e) {
      toast.error("情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.mode === "edit") {
      setTmdbId(props.prevReview.tmdbId);
      setText(props.prevReview.text);
      setScore(props.prevReview.score);
      setWatchedAt(props.prevReview.watchedAt);
      setMovie(props.prevMovie);
    }
  }, [props]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[48rem] p-4 mx-auto">
      
      <MovieSearchDialog
        onSelectMovie={(movie: MovieOverview) => fetchMovieDetails(movie.tmdbId)}
      />

      {loading
        ? <MovieDetailsCardSkeleton />
        : movie && <MovieDetailsCard movie={movie} />
      }

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
          onValueChange={(val) => setScore(val[0]!)}
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
              {watchedAt}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watchedAt ? new Date(watchedAt) : undefined}
              onSelect={(date) => {
                if (date) setWatchedAt(date.toLocaleDateString("sv-SE"));
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