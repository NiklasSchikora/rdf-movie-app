import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../data/fetchSPARQL";

import "./header.scss";

const Header = ({
  handleSearchChange,
  query,
  handleCountryChange,
  country,
  startSearch,
}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let countries = await fetchCountries();
      setCountries(countries.results.bindings);
      console.log(countries);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <header className="header__wrapper">
        <div className="header__left">
          <h2>Movie App</h2>
        </div>
        <div className="header__right">
          <select value={country} onChange={handleCountryChange}>
            {countries.length > 0 &&
              countries.map((country, index) => {
                return (
                  <option
                    value={country.country.value.match(/\/([^/]*)$/)[1]}
                    key={index}
                  >
                    {country.countryLabel.value}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            placeholder="Search Term"
            value={query}
            onChange={handleSearchChange}
          />
          <button onClick={startSearch}>Search</button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
