// Importa Axios
import axios from 'axios';

// URL base delle API di GraphDB
const BASE_URL = 'http://localhost:7200/repositories/Moba2';

// Funzione per eseguire una query SPARQL
export const executeSparqlQuery = async (query) => {
  try {
    // Codifica la query SPARQL per includerla nell'URL
    const encodedQuery = encodeURIComponent(query);

    // Esegui la richiesta Axios con i parametri configurati
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}?query=${encodedQuery}`,
      headers: {
        'Accept': 'application/sparql-results+json',
        // Aggiungi altri header se necessario, come token di autenticazione
      },
    });

    // Ritorna i dati dalla risposta
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Gestisci gli errori qui, ad esempio loggandoli o ritornando un errore standardizzato
    console.error('Errore durante l\'esecuzione della query SPARQL:', error);
    throw error; // Puoi gestire l'errore nel componente Vue che chiama questo service
  }
};
