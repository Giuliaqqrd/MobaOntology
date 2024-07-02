<template>
    <div class="game-list">
      <div v-for="(game, index) in games" :key="index" class="game-container">
        <div class="game-details">
          <!-- Intestazione del gioco con nome e immagine -->
          <div class="header">
            <h1>
              <img v-if="game.gameImage" :src="game.gameImage" alt="Game Image" class="game-logo">
              {{ !game.gameImage ? game.gameName : '' }}
            </h1>
          </div>
  
          <!-- Informazioni principali del gioco -->
          <div class="info">
            <p>
              <strong>
                Developers: {{ game.developers }}
              </strong>
            </p>
            <p v-if="game.businessModelType"> <strong>Business Model:</strong> {{ game.businessModelType }}</p>
            <p><strong>Release Date:</strong> {{ formatDate(game.releaseDates) }}</p>
            <p v-if="game.awardsTitles"><strong>Awards:</strong> {{ game.awardsTitles }}</p>
            <p><strong>Website:</strong> <a :href="game.site" target="_blank">{{ game.site }}</a></p>
          </div>
  
          <!-- Descrizione del gioco -->
          <div class="description">
            <h2>Description</h2>
            <p>{{ game.gameDescription }}</p>
          </div>
  
          <!-- Loghi degli sviluppatori -->
          <div class="developer-logos">
            <h2>Developer Logos</h2>
            <div class="logos">
              <img v-for="(logo, logoIndex) in game.developerLogos.split(',')" :key="logoIndex" :src="logo.trim()"
                alt="Developer Logo">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { executeSparqlQuery, executeWikiDataSparqlQuery } from '@/services/GraphDB';
  import {
    FETCH_GAME_DESCRIPTION_QUERY,
    FETCH_GAME_INFORMATION_WIKIDATA_QUERY
} from '@/constants/sparqlQueries';


const games = ref([]);

const fetchGameDescription = async () => {
    try {
        const gamesDescription = await executeSparqlQuery(FETCH_GAME_DESCRIPTION_QUERY, true);
        console.log(gamesDescription)
        return gamesDescription;
    } catch(err) {
        console.error("Error fetching games descriptions:", err);

    }
}

const fetchGamesInformation = async () => {
    try {
        const gameItemIds = ['Q223341', 'Q771541', 'Q15139655', 'Q2357719', 'Q18156790']
        const query = FETCH_GAME_INFORMATION_WIKIDATA_QUERY(gameItemIds)
        const gamesInformation = await executeWikiDataSparqlQuery(query);
        console.log(gamesInformation)
        return gamesInformation
    } catch(err) {
        console.error("Error fetching games descriptions:", err);

    }
}

// Funzione per unire gli oggetti
function mergeGamesData(gamesData, gameDescriptions) {
    const mergedGames = [];

    // Creazione di una mappa per velocizzare l'accesso alle descrizioni
    const descriptionMap = {};
    gameDescriptions.forEach(desc => {
        descriptionMap[desc.gameName] = desc.gameDescription;
    });

    gamesData.forEach(game => {
        const {
            gameName,
            gameImage,
            developers,
            developerLogos,
            businessModelType,
            site,
            releaseDates,
            awardsTitles
        } = game;

        // Controllo se la gameDescription è già presente
        let gameDescription = descriptionMap[gameName];

        // Creazione dell'oggetto combinato
        const mergedGame = {
            gameName,
            gameImage,
            developers,
            developerLogos,
            businessModelType,
            site,
            releaseDates,
            awardsTitles,
            gameDescription  // Aggiunta della gameDescription
        };

        // Aggiunta dell'oggetto combinato all'array risultante
        mergedGames.push(mergedGame);
    });

    games.value = mergedGames
    console.log(games.value)
};

const formatDate = (dateString) => {
  // Controlla se dateString è una stringa e non è vuota
  if (typeof dateString === 'string' && dateString.trim() !== '') {
    // Dividi le date in un array
    const dates = dateString.split(',').map(date => new Date(date.trim()).toLocaleDateString());
    // Unisci le date formattate in una stringa separata da virgola
    return dates.join(', ');
  }
  // Se dateString non è una stringa valida, ritorna una stringa vuota o gestisci l'errore come preferisci
  return '';
}


  onMounted(async () => {
    const  gamesDescription = await fetchGameDescription();
    const gamesData  = await fetchGamesInformation();
    mergeGamesData(gamesData, gamesDescription)
  });


  </script>
  
  <style scoped>
  .game-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .game-container {
    margin-bottom: 40px; /* Spazio tra un gioco e l'altro */
  }
  
  .game-details {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header img.game-logo {
    max-width: 250px;
    height: auto;
    margin-right: 10px;
  }
  
  .info {
    margin-bottom: 20px;
  }
  
  .info p {
    margin: 5px 0;
  }
  
  .description {
    margin-bottom: 20px;
  }
  
  .description h2 {
    margin-bottom: 10px;
  }
  
  .developer-logos {
    margin-bottom: 20px;
  }
  
  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .logos img {
    max-width: 150px;
    height: auto;
    margin: 0 10px;
  }
  
  .developer-logo {
    max-width: 30px;
    height: auto;
    margin-right: 5px;
  }
  </style>
  