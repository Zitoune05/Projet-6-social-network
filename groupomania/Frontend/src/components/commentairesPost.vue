<template>
    
        <div class="col-md-5 mx-auto mt-5">
            
            <!-- publication à commenter -->
            <b-card tag="article" class="shadow mt-5" >
                
                <!-- header de la publication -->
                <div class="headerPost">

                    <!-- non de l'user -->
                    <h2>{{onePublication.User.username}}</h2> 

                    <!-- publié le... -->
                    <p >{{onePublication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onePublication.createdAt.slice(11,16)}}</p>
                </div>
                
                <!-- image de la publication -->
                <b-card id="CardImagePosted" >
                    <img :src="onePublication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
                </b-card>

                <b-card-text>
                    <!-- contenu texte de la publication  -->
                    <p>{{onePublication.content}}</p>
                </b-card-text>

            </b-card>

            <!-- formulaire d'envoi du commentaire -->
            <b-card tag="article" class="shadow mt-1">
            
                <b-form  method="POST" @submit.prevent="addNewComment()" enctype="multipart/form-data"  >

                    <b-card-text>
                        <!-- contenu du commentaire -->
                        <textarea class="form-control" v-model="comments" id="comments" name="comments" rows="10" placeholder="Votre commentaire ici..." required ></textarea>
                    </b-card-text>


                    <!-- bouton d'envoi du commentaire -->
                    <b-button type="submit" class="btn btn-success">
                        Commenter
                    </b-button>

                </b-form>

            </b-card>

        </div>
        
</template>

<script>

import axios from "axios"


export default {
    name: "commentairePost",
    data() {
        return{
            // le commentaire
            comments:"",

            // le publication
            onePublication: []
        }
    },
    created () {

    // requête pour afficher la publication selectionnée
    axios
      .get('http://localhost:3000/api/publications/one/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onePublication = response.data})
      .catch(error => {console.log(error)})
    },
    methods: {

        // fonction pour ajouter un nouveau commentaire
        addNewComment() {

            if( !this.comments ) {
                alert('Champ requis !')
            }

            // requête pour poster le commentaire
            axios.post("http://localhost:3000/api/commentaire/" + this.$route.params.id, {"comments": this.comments} ,
                { headers: { Authorization: "Bearer " + localStorage.token }}
            )
            .then(() =>  this.comments, location.replace("http://localhost:8080/#/profil"))
            .catch((erreur) => { console.log("erreur" + erreur);
            })
        }
    },
}
</script>

<style>
.headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

}
</style>