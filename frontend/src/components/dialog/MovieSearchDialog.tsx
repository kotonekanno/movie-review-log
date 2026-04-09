import { useState } from "react";

import type { Movie } from "@/types/movie";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Loader2 } from "lucide-react";

import SearchResultCard from "@/components/card/SearchResultCard";

interface MovieSearchDialogProps {
  onSelectMovie: (movie: Movie) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MovieSearchDialog({ onSelectMovie }: MovieSearchDialogProps) {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const res: Response = await fetch(`${API_BASE_URL}/movies?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data: Movie[] = await res.json();
        setMovies(data);
        setHasSearched(true);
      } else {
        return;
      }
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-[100px] mx-auto">
          映画を検索
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>映画検索</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <InputGroup className="max-w-xs">
            <InputGroupInput
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setQuery(e.target.value)}}
              placeholder="映画タイトルを入力"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={handleSearch}>検索</Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : hasSearched && movies.length === 0 ? (
            <p className="text-center text-muted-foreground mt-8">
              検索結果がありません
            </p>
          ) : (
            <div className="grid gap-4">
              {movies.map((m) => (
                <SearchResultCard
                  key={m.tmdbId}
                  movie={m}
                  onClick={() => {
                    onSelectMovie(m);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default MovieSearchDialog;