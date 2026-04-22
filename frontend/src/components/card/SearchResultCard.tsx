import type { MovieOverview } from "@/types/movie";

interface Props {
  movie: MovieOverview;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

function SearchResultCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{ border: "1px solid #ccc" }}
      className="cursor-pointer p-3 rounded-lg transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex">
        <div>
          <img
            src={POSTER_BASE_URL + movie.posterPath}
            className="w-[90px]"
          />
        </div>        
        <div className="ml-4 my-auto">
          <p className="text-base my-1">{movie.jaTitle}</p>
          <p className="text-muted-foreground">{movie.originalTitle}</p>
        </div>
      </div>      
    </div>
  );
}

export default SearchResultCard;