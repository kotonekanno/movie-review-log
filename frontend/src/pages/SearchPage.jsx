import { useState } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log(query);
    fetch(`http://localhost:8080/movies?query=${query}`)
      .then(res => res.json())
      .then(setMovies);
  };

  return (
    <div>
      <h1>映画検索</h1>
      
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>
        検索
      </button>

      {movies.map(movie => (
        <div key={movie.id}>
          {movie.title}
        </div>
      ))}
    </div>
  );
}

export default SearchPage;