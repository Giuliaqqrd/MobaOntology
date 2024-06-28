import { createRouter, createWebHistory } from 'vue-router'; // Importa createRouter e createWebHistory da Vue Router
import QueryComponent from '../views/QueryComponent.vue'

const routes = [
    {
        path: '/query',
        name: 'Query',
        component: QueryComponent,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;