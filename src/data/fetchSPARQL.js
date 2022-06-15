class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = this.endpoint + "?query=" + encodeURIComponent(sparqlQuery);
    const headers = { Accept: "application/sparql-results+json" };

    return fetch(fullUrl, { headers }).then((body) => body.json());
  }
}

const endpointUrl = "https://query.wikidata.org/sparql";

const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);

const fetchCountries = async () => {
  const sparqlQuery = `#List of present-day countries and capital(s)
    SELECT DISTINCT ?country ?countryLabel
    WHERE
    {
      ?country wdt:P31 wd:Q3624078 .
      #not a former country
      FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
      #and no an ancient civilisation (needed to exclude ancient Egypt)
      FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}
      OPTIONAL { ?country wdt:P36 ?capital } .

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    ORDER BY ?countryLabel`;
  return await queryDispatcher.query(sparqlQuery);
};

const fetchSPARQL = async (searchQuery, searchCountry) => {
  const sparqlQuery = `#Cats
        SELECT ?item ?itemLabel ?_image
        WHERE
        {
        ?item wdt:P31 wd:Q11424. # Must be of a film
        ?item wdt:P495 wd:$country. # Must be from specific country
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        OPTIONAL { ?item wdt:P18 ?_image. }
        ?item rdfs:label ?filmLabel 
        FILTER(LANG(?filmLabel) = "en") .
        FILTER(STRSTARTS(?filmLabel, '$query')) .
        }
        LIMIT 10`;
  return await queryDispatcher.query(
    sparqlQuery
      .replace("$query", searchQuery)
      .replace("$country", searchCountry)
  );
};

export { fetchCountries };
export default fetchSPARQL;
