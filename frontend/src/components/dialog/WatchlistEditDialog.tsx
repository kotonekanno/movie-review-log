import { useState, useEffect } from "react";

import type { Movie, MovieDetails } from "@/types/movie";
import type { WatchlistFormValues, CreateWatchlistResponse, WatchlistItem } from "@/types/watchlist";

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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

function WatchlistEditDialog (props: Props) {
  const [tmdbId, setTmdbId] = useState<number>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  const onSubmit = async (item: WatchlistFormValues) => {
    try {
      if (props.mode === "edit") {
      const patchData: Partial<WatchlistFormValues> = {};
      if (item.priority !== props.prevItem.priority) patchData.priority = item.priority;
      if (item.note !== props.prevItem.note) patchData.note = item.note;
      if (item.tmdbId !== props.prevItem.movie.tmdbId) patchData.tmdbId = item.tmdbId;

        const res: Response = await fetch(`${API_BASE_URL}/watchlist/${props.prevItem.watchlistId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patchData),
          credentials: "include",
        });

        if (res.status === 204) {
          props.onSuccess();
          props.onOpenChange(false);
          toast.success("更新しました");
        } else {
          toast.error("更新できませんでした");
        }
      } else {
        const res: Response = await fetch(`${API_BASE_URL}/watchlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
          credentials: "include",
        });

        if (res.status === 201) {
          props.onSuccess();
          props.onOpenChange(false);
        } else if (res.status === 409) {
          toast.warning("この作品は既にウォッチリストにあります");
        } else {
          toast.error("追加できませんでした");
        }
      }
    } catch (e) {
      toast.error("追加できませんでした");
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
        const res = await fetch(`${API_BASE_URL}/movies/${tmdbId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.ok) {
          const data: MovieDetails = await res.json();
          setMovie(data);
          setTmdbId(data.tmdbId);
        } else {
          toast.error("情報の取得に失敗しました");
        }
      } catch (e) {
        toast.error("情報の取得に失敗しました");
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
          <DialogTitle>{props.mode === "edit" ? "編集" : "作成"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <MovieSearchDialog
                onSelectMovie={(movie: Movie) => setTmdbId(movie.tmdbId)}
              />

              {movie && 
                <Card className="p-6">
                  <CardContent className="flex gap-6 p-0">
                    <div className="w-[100px] shrink-0">
                      {movie?.posterPath && (
                        <img
                          src={POSTER_BASE_URL + movie.posterPath}
                          alt="poster"
                          className="w-full aspect-[2/3] object-cover rounded-md bg-black"
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-2 justify-start">
                      <p className="text-xl font-bold leading-tight">
                        {movie? movie.jaTitle : "不明なタイトル"}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {movie ? movie.originalTitle : "不明なタイトル"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {movie.releaseYear ? movie.releaseYear : "???"}年
                      </p>
                    </div>
                  </CardContent>
                </Card>
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