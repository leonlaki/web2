<template>
  <div>
    <h1>{{ team.name }}</h1>
    <img :src="team.logo" :alt="team.name + ' logo'" class="team-logo" />
    <p><strong>Stadium:</strong> {{ team.stadium }}</p>
    <p><strong>Points:</strong> {{ team.points }}</p>
    <p><strong>History:</strong> {{ team.history }}</p>
    <router-link to="/">Back to Teams</router-link>
  </div>
</template>

<script>

import { useTeamStore } from '../store/teamStore';

export default {

  name: 'TeamDetails',
  props: {
    id: { type: String, required: true }
  },
  computed: {
    team() {
      const store = useTeamStore();
      return store.teams.find((team) => team.id === parseInt(this.id));
    }
  }
};
</script>

<style scoped>
.team-logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
</style>
