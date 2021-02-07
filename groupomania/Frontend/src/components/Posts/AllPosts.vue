
<template >


    <div class="col-md-6 mx-auto mt-5">

        

        <b-card tag="article" class="shadow mb-4" v-for="publication in publications" :key="publication.id" >

            

            <template #header >
                <div class="headerPost">
                    <h2>{{publication.User.username}}</h2>
                    <p > Publié le {{publication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + publication.createdAt.slice(11,16)}}</p>
                </div>
            </template>

            <div class="d-flex justify-content-end" v-if="admin()">

                <b-button  variant="outline-primary" :href="'#/commentaire/post/'+publication.id" >Modifier</b-button>

            </div>

            <b-card-text>
                <p>{{publication.title}}</p>
            </b-card-text>

            <img :src="publication.imageUrl" class="rounded img-fluid "  alt="Responsive image" accept="image/*">

            <b-card-text>
                <p>{{publication.content}}</p>
            </b-card-text>

            <hr>

            <template #footer >
                <div class="d-flex justify-content-around">

                    <b-button variant="outline-primary" :href="'#/commentaires/post/'+publication.id" >Les commentaires</b-button>

                </div>

                <div class="d-flex justify-content-around">
                    <b-button class="pl-1 pr-1" variant="outline-primary" :href="'#/commentaires/'+publication.id"><b-icon icon="chat-left-dots" class="pt-1"></b-icon>Commenter</b-button>
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
            publications: [],
        }
    },
    beforeCreated(){
        let accueil = document.getElementById('accueil');
        let accueilTitle = document.createElement("h2");
        accueilTitle.append(accueil);
        accueilTitle.innerHTML = 'Bienvenue'

    },
    created() {
    axios
      .get('http://localhost:3000/api/publications',
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.publications = response.data})
      .catch(error => (error))
    },
    methods: {
        admin(){
            if(localStorage.getItem('isAdmin') == "true") {
                return true
            }else {
                return false
            }
        }
    
    }

};
</script>

<style >
.headerPost {            /** Titre h2 de chaque section  */
    font-size: 12px;

}
    @media (max-width: 500px) {
    .headerPost {
    display: flex;
    flex-direction: column;
    }

}
</style>