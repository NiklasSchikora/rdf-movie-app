import { useEffect, useState } from "react";

import Film from "./components/film/Film";
import Header from "./components/header/Header";
import fetchSPARQL from "./data/fetchSPARQL";

import "./App.scss";

function App() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("Q183");
  const [filmData, setFilmData] = useState([]);

  const fetchData = async () => {
    let data = await fetchSPARQL(query, country);
    setFilmData(data.results.bindings);
    console.log(data.results);
  };

  return (
    <div>
      <Header
        query={query}
        country={country}
        handleSearchChange={(event) => setQuery(event.target.value)}
        handleCountryChange={(event) => setCountry(event.target.value)}
        startSearch={fetchData}
      />
      <div className="results__container">
        {filmData.length > 0 &&
          filmData.map((film, index) => {
            return <Film key={index} film={film} />;
          })}
      </div>
    </div>
  );
}

export default App;
