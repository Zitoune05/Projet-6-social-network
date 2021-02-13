<template>
        <div>
            <!-- commentaire à modifier -->
            <b-card tag="article" class="mt-4 col-md-7 col-lg-6 mx-auto shadow mt-5" >

                <!-- header du commentaire -->
                <div class="headerPost">
                    <h2>{{onComments.User.username}}</h2> 
                    <p style="font-size: 12px;"> Publié le {{onComments.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onComments.createdAt.slice(11,16)}}</p>
                </div>

                <!-- commentaire à modifier -->
                <b-card-text>
                    <p>{{onComments.comments}}</p>
                </b-card-text>

                <!-- commentaire modifié -->
                <b-card-text>
                    <textarea class="form-control" v-model="comments" id="comments" name="comments" rows="10" placeholder="Votre commentaire ..." required ></textarea>
                </b-card-text>
            
            <hr>

            <!-- boutons -->
            <div class="d-flex justify-content-between w-50 m-auto" >

                <!-- bouton de modification -->
                <b-button @click="updateComment()"  v-b-tooltip.hover title="Modifier" variant="outline-warning">
                    <b-icon icon="pencil-fill" ></b-icon>
                </b-button>
                
                <!-- bouton supprimer -->
                <b-button @click="deleteComment()"  variant="outline-danger" v-b-tooltip.hover title="Supprimer mon compte">
                    <b-icon icon="trash"></b-icon>
                </b-button>

            </div>

            </b-card>

        </div>
        
</template>

<script>

import axios from "axios"


export default {
    name: "commentairePost",
    data() {
        return{
            comments:"",
            onComments: []
        }
    },
    created () {

    // requête pour afficher le commentaire à modifier
    axios
      .get('http://localhost:3000/api/commentaire/user/publication/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onComments = response.data})
      .catch(error => {console.log(error)})
    },
    
    methods: {
        // fonction de suppression de commentaire
        deleteComment(){
            axios.delete("http://localhost:3000/api/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(location.replace("http://localhost:8080/#/profil"))
            .catch((error) => error)
        },

        // fonction de modification de commentaire
        updateComment(){

            axios.put("http://localhost:3000/api/commentair/" + this.$route.params.id, {"comments": this.comments} ,
                { headers: { Authorization: "Bearer " + localStorage.token }}
            )
            .then((res) => 
                {this.comments = res.data.comments})
            .catch((erreur) => erreur
            )
        }
    },
}
</script>