import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import MovieSearchDialog from "./MovieSearchDialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

import type { WatchlistFormValues } from "@/types/watchlist"
import type { Movie } from "@/types/movie"
import type { MovieDetails } from "@/types/movie"
import MovieDetailsCard from "../card/MovieDetailsCard"

interface Props {
  onSubmit: (values: WatchlistFormValues) => void | Promise<void>;
}

function WatchlistCreateDialog ({ onSubmit }: Props) {
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [movieId, setMovieId] = useState<number | undefined>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movieId) {
      alert("映画IDを取得できませんでした");
      return;
    }
    onSubmit({ movieId, note, priority });
  };

  const fetchMovieDetails = async (tmdbId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/movies/${tmdbId}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data: MovieDetails = await res.json();
        setMovie(data);
        setMovieId(data.movieId);
        console.log("Movie fetch succeeded");
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>作成</DialogTitle>
          </DialogHeader>

          {movie && <MovieDetailsCard movie={movie} />}

          <FieldGroup>
            <Field>
              <MovieSearchDialog
                onSelectMovie={(movie: Movie) => setTmdbId(movie.tmdbId)}
              />
            </Field>

            <Field>
              <Label>優先度</Label>
              <Slider
                value={[priority]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => setPriority(val[0])}
                className="w-full max-w-xs"
              />
              <div className="mt-1 font-semibold text-center">{priority}%</div>
            </Field>

            <Field>
              <Label>メモ</Label>
              <Textarea
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default WatchlistCreateDialog;