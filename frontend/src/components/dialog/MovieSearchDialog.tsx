import { useState } from "react";

import type { MovieOverview, MovieSearchResult } from "@/types/movie";

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
import { toast } from "sonner";
import { searchMovie } from "@/api/movie";

interface MovieSearchDialogProps {
  onSelectMovie: (movie: MovieOverview) => void;
}

function MovieSearchDialog({ onSelectMovie }: MovieSearchDialogProps) {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<MovieOverview[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data: MovieSearchResult = await searchMovie(query);

      setMovies(data.results);
      setHasSearched(true);
    } catch (e) {
      toast.error("検索中にエラーが起きました");
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
          <DialogTitle className="text-xl text-center">映画検索</DialogTitle>
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