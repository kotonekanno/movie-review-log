/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import type { Movie } from "@/types/movie";
import SearchResultCard from "@/components/card/SearchResultCard";

interface MovieSearchResponse {
  results: Movie[];
}

function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSearch: () => Promise<void> = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movies?query=${encodeURIComponent(query)}`, {
        credentials: "include"
      });

      if (res.status === 200) {
        const data: MovieSearchResponse = await res.json();
        setMovies(data.results);
        setHasSearched(true);
      } else {
        alert("Search movie failed");
      }
    } catch (e) {
      alert("Error occured");
      console.error(e);
    }
  };

  return (/*
    <div>
      <h1>映画検索</h1>
      
      <input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />

      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>

      <button onClick={handleSearch}>
        検索
      </button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {hasSearched && movies.length === 0 ? (
          <p>検索結果がありません</p>
        ) : (
          movies.map((m, idx) => (
            <SearchResultCard 
              key={idx}
              movie={m}
              onClick={() => navigate(`/reviews/${m.tmdbId}`)}
            />
          ))
        )}
      </div>
    </div>*//*
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">映画を検索</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">映画検索</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="映画タイトルを入力"
          />
          <Button onClick={handleSearch}>検索</Button>
        </div>

        <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {movies.length === 0 ? (
            <p>検索結果がありません</p>
          ) : (
            movies.map((m) => (
              <SearchResultCard
                key={m.tmdbId}
                movie={m}
                onClick={() => {
                  //onSelectMovie(m); // 親コンポーネントに選択を渡す
                  close(); // Dialog を閉じる
                }}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchPage;*/

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

import type { Movie } from "@/types/movie";
import SearchResultCard from "@/components/card/SearchResultCard";

interface MovieSearchDialogProps {
  onSelectMovie: (movie: Movie) => void;
}

function MovieSearchDialog({ onSelectMovie }: MovieSearchDialogProps) {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movies?query=${encodeURIComponent(query)}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data: Movie[] = await res.json();
        setMovies(data);
        setHasSearched(true);
      } else {
        alert("Movie search failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error occurd");
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
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={handleSearch}>検索</Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {hasSearched && movies.length === 0 ? (
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