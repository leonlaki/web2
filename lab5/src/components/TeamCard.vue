<template>
    <div class = "team-card">
        <img :src = "logo" :alt= "name + ' logo'" class = "team-logo"/>
        <router-link :to="`/team/${id}`" class = "team-name"> {{ name }} </router-link>
        <p><strong>Stadium:</strong> {{ stadium }}</p>
        <p><strong>Points:</strong> {{ points }} </p> 
        <button @click="markAsFavorite">Mark As Favorite</button>
    </div>
</template>

<script>
//stateless component (8.2) -> TeamCard.vue:
export default {
    name: 'TeamCard' ,
    props: {
        id: { type: Number, required: true},
        name: { type: String, required: true},
        stadium: { type: String, required: true},
        points: { type: [Number, String], required: true},
        logo: { type: String, required: true}
    },
    methods: {
        markAsFavorite() {
            this.$emit("favorite-selected", { id: this.id, name: this.name });
        }
    }
};
</script>

<style scoped>
.team-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
}

.team-logo {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 50%;
}

.team-name {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  margin: 5px 0;
  cursor: pointer;
}

.team-name:hover {
  text-decoration: underline;
}
</style>