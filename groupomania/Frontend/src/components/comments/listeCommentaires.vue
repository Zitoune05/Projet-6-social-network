<template>

    <div class="col-md-5 mx-auto mt-5">
        
        <!-- afficher si au moins 1 commentaire -->
        <div v-if="commentaires.length > 0" >
            
            <!-- partie publciation -->
            <b-card tag="article" class="shadow mt-5" >

                <div class="headerPost">
                    
                        <!-- publication username -->
                    <h2>{{onePublication.User.username}}</h2> 

                        <!-- publication créée le... -->
                    <p>{{onePublication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onePublication.createdAt.slice(11,16)}}</p>
                </div>

                <b-card id="CardImagePosted" >
                    <!-- image de la publication -->
                    <img :src="onePublication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
                </b-card>

                <b-card-text>
                    <!-- contenu de la publication -->
                    <p>{{onePublication.content}}</p>
                </b-card-text>

            </b-card>


            <!-- partie  Liste de commentaires -->
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


        <!-- afficher si aucun commentaire pour la publication selectionnée -->
        <div v-else-if="commentaires.length === 0" >

            <!-- titre précisent qu'il n'y aucun commentaires -->
            <h1 class="mt-2" id="titleComment" >Aucun commentaire pour cette publication</h1>

            <!-- bouton de retour à l'accueil -->
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

            // liste des commentaires
            commentaires: [],

            // la publication 
            onePublication: []
        }
    },
    created () {
        // requête pour afficher la publication
         axios
      .get('http://localhost:3000/api/publications/one/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onePublication = response.data})
      .catch(error => {console.log(error)})

    // requête pour afficher les commentaires  
    axios
      .get('http://localhost:3000/api/commentaires/' + this.$route.params.id,
        { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.commentaires = response.data})
      .catch(error => {console.log(error)})
    },
    

};
</script>

<style>
   
    .headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

}
    @media screen and (max-width: 600px) {
        #titleComment{
            font-size: 20px;
    }
  
}
</style>