import { createRouter, createWebHistory } from 'vue-router'; // Importa createRouter e createWebHistory da Vue Router
import QueryComponent from '../views/QueryComponent.vue'
import MapsView from '../views/MapsView.vue'
import ChampionsView from '../views/ChampionsView.vue'
import CompetitionView from '../views/CompetitionView.vue'
import TestView from '../views/TestView.vue'

const routes = [
    {
        path: '/query',
        name: 'Query',
        component: QueryComponent,
    },
    {
      path: '/maps/:mapName', // Utilizziamo un parametro dinamico per il nome della mappa
      name: 'MapPage',
      component: MapsView
    },
    {
      path: '/champions', // Utilizziamo un parametro dinamico per il nome della mappa
      name: 'ChampionsPage',
      component: ChampionsView
    },
    {
      path: '/officialCompetition', // Utilizziamo un parametro dinamico per il nome della mappa
      name: 'OfficialCompetitionPage',
      component: CompetitionView
    },
    {
      path: '/test',
      name: 'Test',
      component: TestView
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;