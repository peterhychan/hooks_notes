import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("Hong Kong");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();
  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleSearch = e => {
    e.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div style={{ margin: "7% 25%" }}>
      <h1 style={{ marginLeft: "25%" }}>News List</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
          style={{ marginLeft: "25%" }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {loading ? (
        <div>Loading results...</div>
      ) : (
        <ul>
          {results.map(res => (
            <li key={res.objectID}>
              <a href={res.url}>{res.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}
