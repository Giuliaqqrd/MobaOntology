<template>
  <div class="container">
    <header class="header">
      <h1>Competizioni MOBA</h1>
      <div class="filter-container">
        <label for="filter">Filtra:</label>
        <select id="filter" v-model="selectedFilter" class="filter-select">
          <option value="all">Tutti</option>
          <option value="regional">Regional</option>
          <option value="worldwide">Worldwide</option>
        </select>
      </div>
      <button @click="showModal = true" class="add-competition-btn">Aggiungi Competizione</button>
    </header>

    <div class="competitions-grid">
      <div v-for="competition in filteredCompetitions" :key="competition.competitionName" class="competition-card">
        <h2 class="competition-name">{{ competition.competitionName }}</h2>
        <p v-if="competition.competitionCountry" class="competition-detail">
          <strong>Country:</strong> {{ competition.competitionCountry }}
        </p>
        <p class="competition-detail">
          <strong>Organizer:</strong> {{ competition.competitionOrganizer }}
        </p>
        <p class="competition-detail">
          <strong>Start Date:</strong> {{ competition.competitionStartDate }}
        </p>
        <p class="competition-detail">
          <strong>End Date:</strong> {{ competition.competitionEndDate }}
        </p>
        <p class="competition-detail">
          <strong>Prize Pool:</strong> ${{ competition.competitionPrizePool.toLocaleString() }}
        </p>
        <p v-if="competition.competitionSponsor" class="competition-detail">
          <strong>Sponsor:</strong> {{ competition.competitionSponsor }}
        </p>
        <p v-if="competition.numberOfTeams !== undefined" class="competition-detail">
          <strong>Number of Teams: </strong>{{ competition.numberOfTeams}}
        </p>
        <button @click="deleteCompetition(competition.competitionName)" class="delete-button">Elimina</button>
      </div>
    </div>

    <!-- Modale per l'aggiunta della competizione -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Aggiungi Nuova Competizione</h2>
        <form @submit.prevent="addNewCompetition">
          <label for="competitionName">Nome Competizione:</label>
          <input type="text" id="competitionName" v-model="newCompetition.competitionName" required>

          <label for="competitionStartDate">Data di Inizio:</label>
          <input type="date" id="competitionStartDate" v-model="newCompetition.competitionStartDate" required>

          <label for="competitionEndDate">Data di Fine:</label>
          <input type="date" id="competitionEndDate" v-model="newCompetition.competitionEndDate" required>

          <label for="competitionOrganizer">Organizzatore:</label>
          <input type="text" id="competitionOrganizer" v-model="newCompetition.competitionOrganizer" required>

          <label for="competitionPrizePool">Premio in Denaro:</label>
          <input type="number" id="competitionPrizePool" v-model="newCompetition.competitionPrizePool" required>

          <label for="competitionSponsor">Sponsor (opzionale):</label>
          <input type="text" id="competitionSponsor" v-model="newCompetition.competitionSponsor">

          <label for="competitionLocation">Località:</label>
          <select id="competitionLocation" v-model="newCompetition.competitionLocation" required @change="locationChanged">
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europa">Europa</option>
            <option value="World">World</option>
          </select>

          <!-- Mostra il campo competitionCountry solo se la località non è World -->
          <div v-if="showCountryField">
            <label for="competitionCountry">Paese:</label>
            <input type="text" id="competitionCountry" v-model="newCompetition.competitionCountry" required>
          </div>

          <button type="submit">Aggiungi Competizione</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { executeSparqlQuery, executeUpdateSparqlQuery } from '@/services/GraphDB';
import { FETCH_REGIONAL_CHAMPIONSHIP, FETCH_WORLD_CHAMPIONSHIP, FETCH_TEAMS_CHAMPIONSHIPS_QUERY } from '@/constants/sparqlQueries';

const competitions = ref([]);
const filteredCompetitions = ref([]);
const selectedFilter = ref('all');
const showModal = ref(false);
const showCountryField = ref(true);
const newCompetition = ref({
  competitionName: '',
  competitionStartDate: '',
  competitionEndDate: '',
  competitionOrganizer: '',
  competitionPrizePool: '',
  competitionSponsor: '',
  competitionLocation: 'America',
  competitionCountry: ''
});

const groupByChampionship = (data) => {
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.Championship]) {
      grouped[item.Championship] = {};
    }
    if (item.teamCount) {
      grouped[item.Championship]['numberOfTeams'] = item.teamCount;
    } else if (item.Property === 'competitionStartDate' || item.Property === 'competitionEndDate') {
      grouped[item.Championship][item.Property] = item.values.split(', ')[0];
    } else {
      grouped[item.Championship][item.Property] = item.values;
    }
  });
  return Object.values(grouped);
};

const fetchCompetitions = async () => {
  try {
    const regionalCompetition = await executeSparqlQuery(FETCH_REGIONAL_CHAMPIONSHIP, true);
    const worldCompetition = await executeSparqlQuery(FETCH_WORLD_CHAMPIONSHIP, true);
    const teamsCompetittion = await executeSparqlQuery(FETCH_TEAMS_CHAMPIONSHIPS_QUERY, true);
    const data = [...regionalCompetition, ...worldCompetition, ...teamsCompetittion];
    competitions.value = groupByChampionship(data);
    filterCompetitions();
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
};

const filterCompetitions = () => {
  if (selectedFilter.value === 'all') {
    filteredCompetitions.value = competitions.value;
  } else if (selectedFilter.value === 'regional') {
    filteredCompetitions.value = competitions.value.filter(c => c.competitionCountry);
  } else if (selectedFilter.value === 'worldwide') {
    filteredCompetitions.value = competitions.value.filter(c => !c.competitionCountry);
  }
};

const addNewCompetition = async () => {
  try {
    const { competitionName, competitionStartDate, competitionEndDate, competitionOrganizer, competitionPrizePool, competitionSponsor, competitionLocation, competitionCountry } = newCompetition.value;
    
    const newCompetitionName = competitionName.replace(/\s/g, '');
    // Costruisci la query di inserimento
    let insertQuery = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    INSERT DATA {
      moba:${newCompetitionName} a sport:Competition ;
          rdfs:label "${competitionName}"^^xsd:string ;
          moba:hasDiscipline moba:LeagueOfLegends ;
          moba:isOfficialCompetition true ;
          moba:hasLocation moba:${competitionLocation} ;
          moba:competitionName "${competitionName}"^^xsd:string ;
          ${competitionLocation !== 'World' ? `moba:competitionCountry "${competitionCountry}"^^xsd:string ;` : ''}
          moba:competitionStartDate "${competitionStartDate}"^^xsd:date ;
          moba:competitionEndDate "${competitionEndDate}"^^xsd:date ;
          moba:competitionOrganizer "${competitionOrganizer}"^^xsd:string ;
          moba:competitionPrizePool "${competitionPrizePool}"^^xsd:integer ;
          moba:competitionSponsor "${competitionSponsor}"^^xsd:string .
      }`;

    console.log(insertQuery)

    // Esegui la query di inserimento
    await executeUpdateSparqlQuery(insertQuery);
    
    // Aggiorna la lista delle competizioni dopo l'inserimento
    await fetchCompetitions();
    
    // Chiudi il modale
    showModal.value = false;
  } catch (error) {
    console.error('Errore durante l\'inserimento della competizione:', error);
  }
};


const deleteCompetition = async (competitionName) => {
  try {
    // Rimuovi gli spazi dal competitionName
    const newCompetitionName = competitionName.replace(/\s/g, '');

    // Costruisci la query di eliminazione
    let deleteQuery = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    DELETE WHERE {
      moba:${newCompetitionName} ?p ?o .
    }
    `;

    console.log(deleteQuery)

    // Esegui la query di eliminazione
    await executeUpdateSparqlQuery(deleteQuery); // Assumi che executeSparqlQuery gestisca l'eliminazione correttamente

    // Aggiorna la lista delle competizioni dopo l'eliminazione
    await fetchCompetitions();
  } catch (error) {
    console.error('Errore durante eliminazione della competizione:', error);
  }
};

const locationChanged = () => {
  // Mostra il campo competitionCountry solo se la località non è World
  showCountryField.value = newCompetition.value.competitionLocation !== 'World';
};

onMounted(() => {
  fetchCompetitions();
});

watch(selectedFilter, filterCompetitions);

</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-select {
  margin-left: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-competition-btn {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-competition-btn:hover {
  background-color: #005f6b;
}

.competitions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.competition-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s;
  position: relative;
}

.competition-card:hover {
  transform: translateY(-5px);
}

.competition-name {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.competition-detail {
  margin: 5px 0;
  font-size: 1em;
}

.teams-info {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff5722;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  font-weight: bold;
}

.teams-number {
  font-size: 1.2em;
}

.teams-text {
  font-size: 0.8em;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button[type="submit"] {
  background-color: #008CBA;
}

button[type="submit"]:hover {
  background-color: #005f6b;
}
.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

.delete-button:hover {
  background-color: #ff3333;
}
</style>
