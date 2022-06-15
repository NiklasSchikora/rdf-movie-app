# Movie-Finder 🍿🎥

## About

This project is an expirement / test with semantically displaying data in the context of web-applications. It was created as part of a lecture about semantic web at the corporate state university in Mosbach, Germany.

## Data & Functions

This React application fetches data about movies from specific countries from the public [Wikidata API](https://www.wikidata.org/). The data is accessed through SPARQL, a graph-query-language for fetching data from RDF databases. The data is fetched in JSON-LD and then dynamicaly mapped to a react component.

## Installation

```
git clone git@github.com:NiklasSchikora/rdf-movie-app.git
npm install
npm run dev
```

## Disclaimer

This project acts as a playground and an introduction for experimenting with linked / semantic data and RDF. This is by no means a production-ready application.
