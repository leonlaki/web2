import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import TeamList from './components/TeamList.vue';
import TeamDetails from './components/TeamDetails.vue';
import NotFound from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', component: TeamList},
        {path: '/team/:id', component: TeamDetails, props: true}, //routing that is bookmarkable (7.1)
        {path: "/:pathMatch(.*)*", component: NotFound} //(catch all) routing (7.2)        
    ]
})

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app')