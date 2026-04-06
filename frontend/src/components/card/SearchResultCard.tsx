import type { Movie } from "@/types/movie";

interface Props {
  movie: Movie;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

function SearchResultCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}
      className="cursor-pointer"
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}>
          <img src={POSTER_BASE_URL + movie.posterPath} style={{ width: 80 }} />
        </div>        
        <div style={{ flex: 7 }}>
          <p>{movie.jaTitle}</p>
          <p>{movie.originalTitle}</p>
        </div>
      </div>      
    </div>
  );
}

export default SearchResultCard;