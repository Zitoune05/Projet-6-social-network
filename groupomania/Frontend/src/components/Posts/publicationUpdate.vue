<template>
        <!-- formulaire de modification -->
        <b-form method="POST" @submit.prevent = "updatePublication" class="col-md-5 mx-auto mt-5" >
            
            <!-- la publication a commenter -->
            <b-card tag="article" class="shadow mt-5" >

                    <div class="headerPost">
                        <!-- publication username -->
                        <h2>{{onePublication.User.username}}</h2> 

                        <!-- publication créée le... -->
                        <p >{{onePublication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onePublication.createdAt.slice(11,16)}}</p>
                    </div>

                <b-card id="CardImagePosted" >
                    <!-- image de la publication -->
                    <img :src="onePublication.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive" alt="Responsive image" accept="image/*">
                    
                    <!-- image a modifier -->
                    <div class="mt-3">
                        <b-form-file v-model="publication.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain ></b-form-file>
                    </div>
                </b-card>

               <hr/>

                <b-card-text>

                    <!-- contenu de la publication -->
                    <p>{{onePublication.content}}</p>

                    <!-- contenu de la publication a modifier -->
                    <textarea
                        class="form-control"
                        v-model="publication.content"
                        id="text-password"
                        rows="6"
                        placeholder="Votre message..."
                        >
                    </textarea>
                </b-card-text>
                
                <hr/>
                <!-- Boutons  -->
                <div id="updateDelete">
                   
                        <!-- bouton update -->
                    <b-button type="submit" v-b-tooltip.hover title="Modifier" variant="outline-warning">
                        <b-icon icon="pencil-fill" ></b-icon>
                    </b-button>

                        <!-- bouton delete -->
                    <b-button @click="deletePublication()" variant="outline-danger" v-b-tooltip.hover title="Supprimer la publication">
                        <b-icon icon="trash"></b-icon>
                    </b-button>
                
                    <!-- <b-icon  icon="pencil-fill" style="width:16px; color:green"></b-icon> -->
                
                    <!-- <b-icon @click="deletePublication()" icon="trash"  style="width:16px; color:red"></b-icon> -->

                </div>

                

            </b-card>

        </b-form>
        
</template>

<script>

import axios from "axios"


export default {
    name: "commentairePost",
    data() {
        return{
            onePublication: [],
            publication:{
                content: "",
                imageUrl: null,
                imageFilename: ""
            }
        }
    },
    created () {

    // requete pour afficher la publication selectionnée
    axios
      .get('http://localhost:3000/api/publications/one/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onePublication = response.data})
      .catch(error => {console.log(error)})
    },
    methods: {

        // fonction de suppression de publication
        deletePublication(){
            axios.delete("http://localhost:3000/api/publications/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                location.replace("http://localhost:8080/#/profil");
            })
            .catch((error) => error)
        },

        // fonction de modification de publication
        updatePublication(){
            const updatePost = new FormData();

            updatePost.append("content", this.publication.content);

            if(this.imageUrl !== null){
            updatePost.append("image", this.publication.imageUrl, this.publication.imageUrl.filename);
            }

            // requete de modification de la publication
            axios.put("http://localhost:3000/api/publications/" + this.$route.params.id, updatePost, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then((publication)=> {
                this.content = publication.data.content
                this.imageUrl = publication.data.imageUrl
                location.replace("http://localhost:8080/#/profil")
            })
            .catch((error) => error)
        },

        // fonction pour modifier l'image
        uploadImage(e) {
        this.publication.imageUrl = e.target.files[0];
        if (this.publication.imageUrl.length === 0) {
            return ;
        }
    }
    },
}
</script>

<style>
    #updateDelete {
        display:flex;
        justify-content: space-around ;
    }
    .headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

    }
</style>