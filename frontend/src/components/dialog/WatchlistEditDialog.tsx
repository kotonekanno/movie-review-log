import { useState, useEffect } from "react";

import type { MovieOverview, MovieDetails } from "@/types/movie";
import type { WatchlistFormValues, WatchlistItem } from "@/types/watchlist";

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
import { toast } from "sonner";

import MovieDetailsCardForWatchlist from "@/components/card/MovieDetailsCardForWatchlist";
import MovieDetailsCardForWatchlistSkeleton from "@/components/skeleton/MovieDetailsCardForWatchlistSkeleton";
import { createWatchlistItem, editWatchlistItem } from "@/api/watchlist";
import { getMovieDetails } from "@/api/movie";

type Props =
  | {
      mode: "create";
      isOpen: boolean;
      onOpenChange: (v: boolean) => void;
      onSuccess: () => void;
    }
  | {
      mode: "edit";
      isOpen: boolean;
      onOpenChange: (v: boolean) => void;
      onSuccess: () => void;
      prevItem: WatchlistItem;
    };

function WatchlistEditDialog (props: Props) {
  const [tmdbId, setTmdbId] = useState<number>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (item: WatchlistFormValues) => {
    if (props.mode === "edit") {
      const patchData: Partial<WatchlistFormValues> = {};
      if (item.priority !== props.prevItem.priority) patchData.priority = item.priority;
      if (item.note !== props.prevItem.note) patchData.note = item.note;
      if (item.tmdbId !== props.prevItem.movie.tmdbId) patchData.tmdbId = item.tmdbId;

      try {
        await editWatchlistItem(props.prevItem.watchlistId, patchData);

        props.onSuccess();
        props.onOpenChange(false);
        toast.success("更新しました");
      } catch {
        toast.error("更新できませんでした");
      }
    } else {
      try {
        await createWatchlistItem(item);

        toast.success("ウォッチリストに追加しました");
        props.onSuccess();
        props.onOpenChange(false);
      } catch {
        toast.warning("この作品は既にウォッチリストにあります");
      }
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!tmdbId) {
        toast.error("映画IDを取得できませんでした");
        return;
      }
      onSubmit({ tmdbId, note, priority });
    };

  const fetchMovieDetails = async (tmdbId: number) => {
    try {
      setLoading(true);
      const data: MovieDetails = await getMovieDetails(tmdbId);

      setMovie(data);
      setTmdbId(data.tmdbId);
    } catch {
      toast.error("情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tmdbId !== undefined) {
      fetchMovieDetails(tmdbId);
    }
  }, [tmdbId]);

  useEffect(() => {
    if (props.mode === "edit" && props.prevItem) {
      setTmdbId(props.prevItem.movie.tmdbId);
      setPriority(props.prevItem.priority);
      setNote(props.prevItem.note);
      setMovie({
        tmdbId: props.prevItem.movie.tmdbId,
        jaTitle: props.prevItem.movie.jaTitle,
        originalTitle: props.prevItem.movie.originalTitle,
        posterPath: props.prevItem.movie.posterPath,
        genres: props.prevItem.movie.genres,
        productionCountries: props.prevItem.movie.productionCountries,
        releaseYear: props.prevItem.movie.releaseYear,
        runtime: props.prevItem.movie.runtime,
      })
    } else {
      setPriority(50);
      setNote("");
      setTmdbId(undefined);
      setMovie(undefined);
    }
  }, [props.mode, props.mode === "edit" ? props.prevItem : null]);

  return (
    <Dialog open={props.isOpen} onOpenChange={() => props.onOpenChange(false)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            {props.mode === "edit" ? "編集" : "作成"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <MovieSearchDialog
                onSelectMovie={(movie: MovieOverview) => setTmdbId(movie.tmdbId)}
              />

              {loading
                ? <MovieDetailsCardForWatchlistSkeleton />
                : movie && <MovieDetailsCardForWatchlist movie={movie} />
              }

            </Field>

            <Field>
              <Label>優先度</Label>
              <div className="flex justify-center">
                <Slider
                  value={[priority]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(val) => setPriority(val[0]!)}
                  className="w-full max-w-xs"
                />
              </div>
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
            <Button type="button" variant="ghost" onClick={() => props.onOpenChange(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WatchlistEditDialog;