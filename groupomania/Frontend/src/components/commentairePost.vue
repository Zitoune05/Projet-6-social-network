<template>
    
        <div>
            <b-card tag="article" class="shadow mt-5" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{onePublication.User.username}}</h2> 
                        <p style="font-size: 12px;"> publié le {{onePublication.createdAt}}</p>
                    </div>
                </template>

                <b-card-text>

                    <p>{{onePublication.title}}</p>

                    <b-form-input
                        v-model="publication.title"
                        type="text"
                        id="feedback-title"
                        style="max-width: 300px; margin: auto;"
                        placeholder="Titre"
                    >
                    </b-form-input>

                </b-card-text>

                <hr/>
                <b-card id="CardImagePosted" >
                    <img :src="onePublication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
                    
                    <div class="mt-3">
                        <b-form-file v-model="publication.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain ></b-form-file>
                    </div>
                </b-card>

               <hr/>

                <b-card-text>
                    <p>{{onePublication.content}}</p>

                    <textarea
                        class="form-control"
                        v-model="publication.content"
                        id="text-password"
                        rows="6"
                        placeholder="Écrivez votre premier message !"
                        >
                    </textarea>
                </b-card-text>
                
                <hr/>
            <!-- Bouton Suppression  -->
            <div id="updateDelete">
            
                <b-icon @click="updatePublication()" icon="pencil-fill" style="width:16px; color:green"></b-icon>
            
               <b-icon @click="deletePublication()" icon="trash"  style="width:16px; color:red"></b-icon>

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
            onePublication: [],
            publication:{
                title: "",
                content: "",
                imageUrl: null,
            }
        }
    },
    created () {
    axios
      .get('http://localhost:3000/api/publications/one/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onePublication = response.data})
      .catch(error => {console.log(error)})
    },
    methods: {
        addNewComment() {

            if( !this.comments ) {
                alert('Champ requis !')
            }

            axios.post("http://localhost:3000/api/commentaire/" + this.$route.params.id, {"comments": this.comments} ,
                { headers: { Authorization: "Bearer " + localStorage.token }}
            )
            .then(() => { this.comments ; console.log("okk1")})
            .catch((erreur) => { console.log("erreur" + erreur);
            })
        },
        deletePublication(){
            axios.delete("http://localhost:3000/api/publications/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                location.replace("http://localhost:8080/#/profil");
            })
            .catch((error) => error)
        },
        updatePublication(){
            const updatePost = new FormData();

            updatePost.append("title", this.publication.title);
            updatePost.append("content", this.publication.content);
            updatePost.append("image", this.publication.imageUrl, this.publication.imageUrl.filename);

            axios.put("http://localhost:3000/api/publications/" + this.$route.params.id, updatePost, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                location.replace("http://localhost:8080/#/profil");
            })
            .catch((error) => error)
        },
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
</style>