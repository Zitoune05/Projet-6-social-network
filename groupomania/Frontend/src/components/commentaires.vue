<template>
    <div>
        <h1 class="mt-3" id="titleComment">Liste des commentaires</h1>
        <b-card tag="article" class="shadow mt-5" v-for="commentaire in commentaires" :key="commentaire.id" >

            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p>Publié le {{commentaire.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + commentaire.createdAt.slice(11,16)}}</p>
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
    @media screen and (max-width: 600px) {
        #titleComment{
            font-size: 20px;
    }
}
</style>