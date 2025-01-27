import { defineStore } from 'pinia';
/*import { fetchTeams, fetchTeamById } from '../mockBackend';

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        teams: [],
        favoriteTeam: null,
    }),
    actions: {
        async loadTeams() {
            this.teams = await fetchTeams();
        },
        async loadTeamById(id) {
            return await fetchTeamById(id);
        },
        setFavoriteTeam(team) {
            this.favoriteTeam = team;
        }
    }
});*/

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        teams: [
            { id: 1,
              name: 'Manchester United', 
              stadium: 'Old Trafford', 
              points: 26, 
              logo: '/images/manutd.png',
              history: 'Manchester United was founded in 1878.'},
            { id: 2, 
              name: 'Liverpool', 
              stadium: 'Anfield', 
              points: 53, 
              logo: '/images/liverpool.jpg',
              history: 'Liverpool FC fas founded in 1892.' },
            { id: 3, 
              name: 'Manchester City', 
              stadium: 'Etihad Stadium', 
              points: 38, 
              logo: '/images/mancity.png',
              history: 'Manchester City was founded in 1880.' },
            { id: 4, 
              name: 'Arsenal', 
              stadium: 'Emirates Stadium', 
              points: 42, 
              logo: '/images/arsenal.png',
              history: 'Arsenal FC was founded in 1886.' },
            { id: 5, 
              name: 'Tottenham Spurs', 
              stadium: 'Tottenham Hotspur Stadium', 
              points: 24, 
              logo: '/images/spurs.png',
              history: 'Tottengam Hotspur was founded in 1882.'  },
            { id: 6,
              name: 'Chelsea', 
              stadium: 'Stamford Bridge', 
              points: 37, 
              logo: '/images/chelsea.png',
              history: 'Chelsea FC was founded in 1905.' }
        ],
        favoriteTeam: null
    }),
    getters: {
        filteredTeams: (state) => (query) => state.teams.filter((team) => team.name.toLowerCase().includes(query.toLowerCase())),
        totalTeams: (state) => state.teams.length
    },
    actions: {
        setFavoriteTeam(team) {
            this.favoriteTeam = team;
        },
        sortAlphabetically() {
            this.teams.sort((a, b) => a.name.localeCompare(b.name));
        },
        sortPoints() {
            this.teams.sort((a, b) => b.points - a.points); 
        }
    }
});
