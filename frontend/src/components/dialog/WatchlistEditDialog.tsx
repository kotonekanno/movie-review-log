import { useState, useEffect } from "react";

import type { Movie } from "@/types/movie";
import type { MovieDetails } from "@/types/movie";
import type { WatchlistFormValues, CreateWatchlistResponse } from "@/types/watchlist";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import MovieSearchDialog from "./MovieSearchDialog";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

import MovieDetailsCard from "@/components/card/MovieDetailsCard";

interface Props {
  buttonText?: string;
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function WatchlistEditDialog ({ buttonText, isOpen, onOpenChange }: Props) {
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [movieId, setMovieId] = useState<number | undefined>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  const onSubmit = async (item: WatchlistFormValues) => {
      try {
        const res: Response = await fetch(`${API_BASE_URL}/watchlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
          credentials: "include",
        });
        const data: CreateWatchlistResponse = await res.json();
        if (res.status === 201) {
          console.log("Watchlist item successfully created: " + data.watchlistId);
          onOpenChange;
        } else {
          console.error("Watchlist item creation failed")
        }
      } catch (e) {
        console.error("Watchlist item creation failed: " + e);
      }
    };

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
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
  
        if (res.ok) {
          const data: MovieDetails = await res.json();
          setMovie(data);
          setMovieId(data.movieId);
          console.log("Movie fetch succeeded");
        } else {
          console.error("Movie fetch failed");
        }
      } catch (e) {
        console.error("Movie fetch failed: " + e);
      }
    };
  
    useEffect(() => {
      if (tmdbId !== undefined) {
        fetchMovieDetails(tmdbId);
      }
    }, [tmdbId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{buttonText}</DialogTitle>
        </DialogHeader>

        {movie && <MovieDetailsCard movie={movie} />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                onValueChange={(val) => setPriority(val[0]!)}
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
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WatchlistEditDialog;