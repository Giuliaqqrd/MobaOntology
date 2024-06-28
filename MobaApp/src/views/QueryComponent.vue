<template>
  <div>
    <textarea v-model="sparqlQuery" rows="5" cols="50"></textarea>
    <button @click="executeQuery">Esegui Query</button>
    <div v-if="queryResult">
      <!-- Visualizza i risultati della query -->
      <pre>{{ queryResult }}</pre>
    </div>
    <div v-if="error">
      <!-- Gestione degli errori -->
      <p>Si è verificato un errore: {{ error.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { executeSparqlQuery } from '@/services/GraphDB';

const sparqlQuery = ref('');
const queryResult = ref(null);
const error = ref(null);

const executeQuery = async () => {
  try {
    queryResult.value = await executeSparqlQuery(sparqlQuery.value);
    error.value = null;
  } catch (err) {
    queryResult.value = null;
    error.value = err;
  }
};
</script>
