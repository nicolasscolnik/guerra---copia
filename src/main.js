import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import Guerra from './components/Guerra.vue'

const routes = [
    {
        path: '/Guerra',
        component: Guerra,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App); // Cambia el componente inicial si es necesario

app.use(router);
app.mount('#app');
