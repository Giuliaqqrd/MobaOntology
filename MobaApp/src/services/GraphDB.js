// Importa Axios
import axios from 'axios';

// URL base delle API di GraphDB
const BASE_URL = 'http://localhost:7200/repositories/Moba2';

// Funzione per eseguire una query SPARQL
export const executeSparqlQuery = async (query, infer) => {
  try {
    // Codifica la query SPARQL per includerla nell'URL
    const encodedQuery = encodeURIComponent(query);

    // Esegui la richiesta Axios con i parametri configurati
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}?query=${encodedQuery}&infer=${infer}`,
      headers: {
        'Accept': 'application/sparql-results+json',
      },
    });

    // Ritorna i dati dalla risposta
    console.log(response.data)
    return parseSparqlResults(response.data);
  } catch (error) {
    // Gestisci gli errori qui, ad esempio loggandoli o ritornando un errore standardizzato
    console.error('Errore durante l\'esecuzione della query SPARQL:', error);
    throw error; // Puoi gestire l'errore nel componente Vue che chiama questo service
  }
};

// Funzione per eseguire una update query SPARQL
export const executeUpdateSparqlQuery = async (query) => {
  console.log(query)
  try {
    // Codifica la query SPARQL per includerla nell'URL
    const encodedQuery = encodeURIComponent(query);

    // Esegui la richiesta Axios con i parametri configurati
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/statements?update=${encodedQuery}`,
      headers: {
        'Content-Type': 'application/rdf+xml',
        'Accept': 'text/plain'
      },
    });
  } catch (error) {
    // Gestisci gli errori qui, ad esempio loggandoli o ritornando un errore standardizzato
    console.error('Errore durante l\'esecuzione della query SPARQL:', error);
    throw error; // Puoi gestire l'errore nel componente Vue che chiama questo service
  }
};


// Funzione per eseguire una query SPARQL
export const executeWikiDataSparqlQuery = async (query) => {
  try {
    // Codifica la query SPARQL per includerla nell'URL
    const encodedQuery = encodeURIComponent(query);

    const response = await axios.get('https://query.wikidata.org/sparql', {
      params: {
        query: `
        SELECT ?sexLabel ?publicationDate WHERE {
              wd:Q100254994 wdt:P21 ?sex;  # Sesso
                      wdt:P577 ?publicationDate.  # Data di pubblicazione

              # Ottieni le label multilingue
              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
              }
        `,
        format: 'json'
      }
    });

    // Ritorna i dati dalla risposta
    console.log(response.data)
    return parseSparqlResults(response.data);
  } catch (error) {
    // Gestisci gli errori qui, ad esempio loggandoli o ritornando un errore standardizzato
    console.error('Errore durante l\'esecuzione della query SPARQL:', error);
    throw error; // Puoi gestire l'errore nel componente Vue che chiama questo service
  }
};



const parseSparqlResults = (sparqlResults) => {
  const variables = sparqlResults.head.vars;
  const bindings = sparqlResults.results.bindings;
  
  return bindings.map(binding => {
    let result = {};
    variables.forEach(variable => {
      result[variable] = binding[variable] ? binding[variable].value : null;
    });
    return result;
  });
};
