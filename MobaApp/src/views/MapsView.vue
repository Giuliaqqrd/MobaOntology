<template>
    <div class="container mt-4">
      <h1 class="text-center">{{ mapName }}</h1>
  
      <section class="my-4">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Map Description</h2>
            <p class="card-text">{{ mapDescription }}</p>
          </div>
        </div>
      </section>
  
      <section class="my-4">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Map Gameplay</h2>
            <p class="card-text">{{ mapGameplay }}</p>
          </div>
        </div>
      </section>
      <section class="my-4">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Map Features</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="area in mapAreas" :key="area.MapArea">
                <h4>{{ formatMapArea(area.MapArea) }}</h4>
                <p>{{ area.MapAreaDescription }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { executeSparqlQuery } from '@/services/GraphDB';
  import {
    FETCH_MAPS_PROPERTY_QUERY,
    FETCH_MAPS_AREAS_QUERY
} from '@/constants/sparqlQueries'; 
  

const mapName = ref('');
const mapDescription = ref('');
const mapGameplay = ref('');
const mapAreas = ref([]);

  
    const formatMapArea = (mapArea) => {
    // Formattazione personalizzata per le aree della mappa
    if (mapArea === 'SummonerRiftJungle') {
        return 'Jungle';
    } else {
        return mapArea.replace('SummonerRift', '').trim();
    }
    };
  
  // Funzione per eseguire la query e ottenere le proprietà della mappa
  const fetchMapProperties = async () => {
    try {
        const result = await executeSparqlQuery(FETCH_MAPS_PROPERTY_QUERY, true); // Inserisci qui la tua query SPARQL
        mapName.value = result.find(item => item.Property === 'mapName')?.value ?? '';
        mapDescription.value = result.find(item => item.Property === 'mapDescription')?.value ?? '';
        mapGameplay.value = result.find(item => item.Property === 'mapGameplay')?.value ?? '';
    } catch (err) {
      console.error("Error fetching map properties:", err);
    }
  };

  const fetchMapAreas = async () => {
  try {
    mapAreas.value = await executeSparqlQuery(FETCH_MAPS_AREAS_QUERY); // Inserisci qui la tua seconda query SPARQL per le aree della mappa
  } catch (error) {
    console.error('Error fetching map areas:', error);
  }
};
  
  // Esegui la funzione fetchMapProperties quando il componente è montato
  onMounted(() => {
    fetchMapProperties();
    fetchMapAreas();
    });
  </script>
  
  <style scoped>
  /* Stili personalizzati per la pagina della mappa in stile videoludico */
  .container {
    max-width: 800px;
    margin: auto;
  }
  
  .card {
    background-color: #1a1a1a;
    color: white;
    border: 1px solid #6c63ff;
    border-radius: 10px;
  }
  
  .card-title {
    font-size: 1.5rem;
    border-bottom: 1px solid #6c63ff;
    padding-bottom: 0.5rem;
  }
  
  .card-text {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .list-group-item {
    background-color: #1a1a1a;
    border: none;
    color: white;
  }
  </style>
  