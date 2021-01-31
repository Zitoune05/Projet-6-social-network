
<template>
    <div>
        <div id="accueil">

        </div>

        <b-card tag="article" class="shadow mt-5" v-for="publication in publications" :key="publication.id" >

            <template #header>
                <div class="headerPost">
                    <h2>{{publication.User.username}}</h2> 
                    <p style="font-size: 12px;"> {{publication.createdAt}}</p>
                </div>
            </template>

            <b-card-text>
                <p>{{publication.title}}</p>
            </b-card-text>

            <b-card id="CardImagePosted" >
                <img :src="publication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
            </b-card>

            <b-card-text>
                <p>{{publication.content}}</p>
            </b-card-text>

            <hr>
            <template #footer >
                <div class="d-flex justify-content-around">
                <a :href="'#/commentaires/'+publication.id" class="h6 small">Commenter</a>

                <a :href="'#/commentaires/post/'+publication.id" class="h6 small">Voir les commentaires</a>
                </div>
            </template>

        </b-card>
    </div>
</template>



<script>
import axios from "axios";


export default {
    name: "Wall",

    data() {
        return {
            publications: []
        }
    },
    beforeCreated(){
        let accueil = document.getElementById('accueil');
        let accueilTitle = document.createElement("h2");
        accueilTitle.append(accueil);
        accueilTitle.innerHTML = 'Bienvenue'
    },
    created () {
    axios
      .get('http://localhost:3000/api/publications',
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.publications = response.data})
      .catch(error => {console.log(error)})
    },

};
</script>

<style >

</style>