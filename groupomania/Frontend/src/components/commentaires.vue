<template>
    <div>
        <h1>Voici les commentaires de la publication</h1>
        <b-card tag="article" class="shadow mt-5" v-for="commentaire in commentaires" :key="commentaire.id" >

            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p> {{commentaire.createdAt}}</p>
                </div>
            </template>

            <b-card-text>
                <p>{{commentaire.comments}}</p>
            </b-card-text>

        </b-card>
    </div>

</template>

<script>
import axios from "axios"

export default {
    name: "Commentaire",

    data() {
        return {
            commentaires: []
        }
    },
    created () {
    axios
      .get('http://localhost:3000/api/commentaires/' + this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.commentaires = response.data})
      .catch(error => {console.log(error)})
    },

};
</script>

<style>
    body {
        background-color: #091F43
    }
</style>