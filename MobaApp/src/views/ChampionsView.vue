<template>
    <div class="container mt-4">
      <!-- Filtri -->
      <div class="mb-3">
        <label for="roleFilter" class="form-label">Filter by Role:</label>
        <select id="roleFilter" class="form-select" v-model="selectedRole">
          <option value="">All Roles</option>
          <option v-for="role in roles" :key="role" :value="role.Role">{{ role.Role }}</option>
        </select>
      </div>
  
      <!-- Carte dei campioni -->
      <div class="row">
      <div class="col-md-4 mb-4" v-for="champion in filteredChampions" :key="champion.championName">
        <div class="card shadow">
          <img v-bind:src="getImage(champion.championName)" class="card-img-top" alt="Champion Image">
          <div class="card-body">
            <h5 class="card-title text-center">{{ champion.championName }}</h5>
            <hr>
            <div class="stats">
              <p class="stat" v-if="champion.championArmor"><strong>Armor:</strong> {{ champion.championArmor }}</p>
              <p class="stat" v-if="champion.championAttackDamage"><strong>Attack Damage:</strong> {{ champion.championAttackDamage }}</p>
              <p class="stat" v-if="champion.championHealth"><strong>Health:</strong> {{ champion.championHealth }}</p>
              <p class="stat" v-if="champion.championMagicResist"><strong>Magic Resist:</strong> {{ champion.championMagicResist }}</p>
              <p class="stat" v-if="champion.championMana"><strong>Mana:</strong> {{ champion.championMana }}</p>
              <p class="stat" v-if="champion.championMovementSpeed"><strong>Movement Speed:</strong> {{ champion.championMovementSpeed }}</p>
              <p class="stat" v-if="champion.championRange"><strong>Range:</strong> {{ champion.championRange }}</p>
              <p class="stat" v-if="champion.roles"><strong>Roles:</strong> {{ champion.roles }}</p>
              <p class="stat" v-if="champion.abilities"><strong>Abilities:</strong> {{ champion.abilities }}</p>
            </div>
          </div>
          <div v-if="champion.comment" class="card-footer text-muted text-center">
            <p>{{ champion.comment }}</p>
          </div>
        </div>
      </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { executeSparqlQuery } from '@/services/GraphDB';
  import {
    FETCH_CHAMPIONS_QUERY,
    FETCH_CHAMPIONS_ROLE_QUERY,
    FETCH_CHAMPIONS_DATA_QUERY
} from '@/constants/sparqlQueries';
  
  const champions = ref([]);
  const selectedRole = ref('');
  const roles = ref([]);
  
  const fetchRoles = async () => {
    try {
      roles.value = await executeSparqlQuery(FETCH_CHAMPIONS_ROLE_QUERY);
    } catch (err) {
      console.error("Error fetching champions:", err);
    }
  };

  const fetchChampions = async () => {
    try {
      return await executeSparqlQuery(FETCH_CHAMPIONS_QUERY);
    } catch (err) {
      console.error("Error fetching champions:", err);
    }
  };

  const fetchChampionData = async () => {
  try {
    return await executeSparqlQuery(FETCH_CHAMPIONS_DATA_QUERY);
  } catch (err) {
    console.error("Error fetching champion data properties:", err);
  }
};

  
  const filteredChampions = computed(() => {
    if (!selectedRole.value) {
      return champions.value;
    } else {
      return champions.value.filter(champion => champion.roles.includes(selectedRole.value));
    }
  });

  const mergeChampionData = async () => {
    const rolesAbilities = await fetchChampions();
    const properties = await fetchChampionData();
  const championsMap = {};

  // First, populate championsMap with properties
  properties.forEach(item => {
    const { championName, propertyName, value } = item;
    if (!championsMap[championName]) {
      championsMap[championName] = { championName, roles: '', abilities: '' };
    }
    championsMap[championName][propertyName] = value;
  });

  // Then, add roles and abilities
  rolesAbilities.forEach(item => {
    const { championName, roles, abilities } = item;
    if (championsMap[championName]) {
      championsMap[championName].roles = roles;
      championsMap[championName].abilities = abilities;
    }
  });

  // Convert the map to an array
  champions.value = Object.values(championsMap);
  console.log(champions.value)
};

const getImage = (championName) => {
  // Replace with logic to fetch or determine champion images
  return `https://example.com/images/${championName.toLowerCase()}.jpg`;
};
  onMounted(() => {
    fetchRoles();
    mergeChampionData();
  });
  </script>
  
  <style scoped>
.btn-secondary {
  background-color: #6c63ff;
  border-color: #6c63ff;
}

.card {
  transition: transform 0.2s ease-in-out;
  border-radius: 12px;
  overflow: hidden;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  object-fit: cover;
  height: 200px;
}

.stats {
  margin-top: 1rem;
}

.stat {
  margin-bottom: 0.5rem;
}
  </style>
  