<template>

    <div class="col-md-6 mx-auto mt-5">
        

        
        
        <div v-if="commentaires.length > 0" >

            <b-card tag="article" class="shadow mt-5" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{onePublication.User.username}}</h2> 
                        <p style="font-size:12px;">Publié le {{onePublication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onePublication.createdAt.slice(11,16)}}</p>
                    </div>
                </template>

                <b-card id="CardImagePosted" >
                    <img :src="onePublication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
                </b-card>

                <b-card-text>
                    <p>{{onePublication.content}}</p>
                </b-card-text>

            </b-card>

            <h1 class="mt-3" id="titleComment" >Liste des commentaires</h1>

            <b-card tag="article" class="shadow mt-5" v-for="commentaire in commentaires" :key="commentaire.id" >

            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p>{{commentaire.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + commentaire.createdAt.slice(11,16)}}</p>
                </div>
            </template>

            <b-card-text>
                <p>{{commentaire.comments}}</p>
            </b-card-text>

            </b-card>

        </div>

        <div v-else-if="commentaires.length === 0" >
            <h1 class="mt-2" id="titleComment" >Aucun commentaire pour cette publication</h1>

            <b-button pill variant="info" :href="'#/accueil'">retour</b-button>
        </div>
        

    </div>
    

</template>

<script>
import axios from "axios"

export default {
    name: "Commentaire",

    data() {
        return {
            commentaires: [],
            onePublication: []
        }
    },
    created () {
         axios
      .get('http://localhost:3000/api/publications/one/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onePublication = response.data})
      .catch(error => {console.log(error)})
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