<template>
    <div>
      <h2>Competizioni di League of Legends da Wikidata</h2>
      <div v-if="loading">Caricamento...</div>
      <div v-else>
        <ul>
          <li v-for="(competition, index) in competitions" :key="index">
            <h3>{{ competition.competitionLabel }}</h3>
            <p v-if="competition.cityLabel"><strong>Città:</strong> {{ competition.cityLabel }}</p>
            <p v-if="competition.countryLabel"><strong>Paese:</strong> {{ competition.countryLabel }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const competitions = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://query.wikidata.org/sparql', {
        params: {
          query: `
          SELECT ?sexLabel ?publicationDate WHERE {
                # Trova l'entità di Garen
                wd:Q100254994 wdt:P21 ?sex;  # Sesso
                        wdt:P577 ?publicationDate.  # Data di pubblicazione

                # Ottieni le label multilingue
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                }
          `,
          format: 'json'
        }
      });
  
      competitions.value = response.data.results.bindings.map(binding => ({
        competitionLabel: binding.competitionLabel.value,
        cityLabel: binding.cityLabel ? binding.cityLabel.value : null,
        countryLabel: binding.countryLabel ? binding.countryLabel.value : null
      }));
  
      loading.value = false;
    } catch (error) {
      console.error('Error fetching competitions information:', error);
      loading.value = false;
    }
  });
  </script>
  