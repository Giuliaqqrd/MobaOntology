<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/components/images/MOBAlogo2.png" alt="GameOn" height="30">
        MOBAOnt
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Play</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Explore</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="mapDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Maps
            </a>
            <ul class="dropdown-menu" aria-labelledby="mapDropdown">
              <li v-for="map in maps" :key="map.Map">
                <router-link :to="'/maps/' + map.Map" class="dropdown-item">{{ map.Map }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="characterDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Characters
            </a>
            <ul class="dropdown-menu" aria-labelledby="characterDropdown">
              <li v-for="character in characters" :key="character.Character">
                <router-link v-if="character.Character === 'PlayableCharacter'" :to="'/champions'" class="dropdown-item">{{ character.Character }}</router-link>
                <a v-else class="dropdown-item" href="#">{{ character.Character }}</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="itemDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Items
            </a>
            <ul class="dropdown-menu" aria-labelledby="itemDropdown">
              <li v-for="item in items" :key="item.Item">
                <a class="dropdown-item" href="#">{{ item.Item }}</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="eventDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Events
            </a>
            <ul class="dropdown-menu" aria-labelledby="eventDropdown">
              <li v-for="event in events" :key="event.Event">
                <router-link v-if="event.Event === 'OfficialCompetition'" :to="'/officialCompetition'" class="dropdown-item">{{ event.Event }}</router-link>
                <a v-else class="dropdown-item" href="#">{{ event.Event }}</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="btn btn-primary" href="#">Join Now</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { executeSparqlQuery } from '@/services/GraphDB';
import {
  FETCH_MENU_CHARACTERS_QUERY,
  FETCH_MENU_ITEMS_QUERY,
  FETCH_MENU_EVENTS_QUERY,
  FETCH_MENU_MAPS_QUERY
} from '@/constants/sparqlQueries'; 


const characters = ref([]);
const items = ref([]);
const events = ref([]);
const maps = ref([]);

const fetchCharacters = async () => {
  try {
    characters.value = await executeSparqlQuery(FETCH_MENU_CHARACTERS_QUERY);
  } catch (err) {
    console.error("Error fetching characters:", err);
  }
};

const fetchItems = async () => {
  try {
    items.value = await executeSparqlQuery(FETCH_MENU_ITEMS_QUERY);
  } catch (err) {
    console.error("Error fetching items:", err);
  }
};

const fetchEvents = async () => {
  try {
    events.value = await executeSparqlQuery(FETCH_MENU_EVENTS_QUERY);
  } catch (err) {
    console.error("Error fetching events:", err);
  }
};

const fetchMaps = async () => {
  try {
    maps.value = await executeSparqlQuery(FETCH_MENU_MAPS_QUERY);
  } catch (err) {
    console.error("Error fetching maps:", err);
  }
};

onMounted(async () => {
  await fetchCharacters(),
  await fetchItems(),
  await fetchEvents(),
  await fetchMaps()
});
</script>

<style scoped>
.navbar-brand img {
  margin-right: 5px;
}
.btn-primary {
  background-color: #6c63ff;
  border-color: #6c63ff;
}
</style>
