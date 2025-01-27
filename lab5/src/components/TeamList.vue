<template>
  <div class="container">
    <div class="header">
      <img src="/images/pl.jpg" alt="pl-logo" class="pl-logo" />
      <h1>"The Big 6" Premier League Teams</h1>
    </div>  

    <label for="search">Search Teams:</label>
    <input id="search" v-model="searchQuery" placeholder="Type to search..." />

    <div>
      <button v-on:click="sortAlphabetically">Sort by Name</button>
      <button v-on:click="sortPoints">Sort by Points</button>
    </div>

    <!-- One-way-binding (1) -->
    <p>Total teams: {{ totalTeams }}</p>

    <p v-if="favoriteTeam">You selected: {{ favoriteTeam.name }}</p>

    <p>Time since component loaded: {{ timer }} seconds</p>

    <div class="team-list">
      <TeamCard v-for="team in filteredTeams" :key="team.id" :id="team.id" :name="team.name" :stadium="team.stadium" 
      :points="team.points" :logo="team.logo" @favorite-selected="setFavoriteTeam" />
    </div>
  </div>
</template>
  
<script>
import TeamCard from './TeamCard.vue';
import { useTeamStore } from '../store/teamStore';

export default {
  name: 'TeamList',
  components: {
    TeamCard
  },
  data() {
    return {
      //Two-way-binding (2)
      searchQuery: '',
      timer: 0,
    };
  },
  //Computed properties (4)
  computed: {
    teamStore() {
      return useTeamStore();
    },
    totalTeams() {
      return this.filteredTeams.length;
    },
    filteredTeams() {
      return this.teamStore.filteredTeams(this.searchQuery);
    },
    favoriteTeam() {
      return this.teamStore.favoriteTeam;
    }
  },
  //Methods (3)
  methods: {
    sortAlphabetically() {
      this.teamStore.sortAlphabetically();
    },
    sortPoints() {
      this.teamStore.sortPoints();
    },
    setFavoriteTeam(team) {
      this.teamStore.setFavoriteTeam(team); // Fixed typo
    },
  },
  //Lifecycle hook (6)
  mounted() {
    //console.log('TeamList component mounted!');
    setInterval(() => {
      this.timer++;
    }, 1000);
  }
};
</script>

<style scoped>
/* Scoped style (5) */
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

label {
  font-weight: bold;
}

input {
  margin: 10px 0;
  padding: 5px;
  font-size: 1rem;
}

.container {
  text-align: center;
  width: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.pl-logo {
  width: 100px;
  height: 100px;
}

button {
  margin: 10px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  border-radius: 5px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e0e0e0;
}

.team-list {
  display: grid;
  gap: 20px;
  justify-content: center;
}
</style>