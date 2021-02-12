<template>
    
        <b-form method="POST" @submit.prevent = "updatePublication" class="mt-4 col-md-7 col-lg-6 mx-auto" >
            

            <b-card tag="article" class="shadow mt-5" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{onePublication.User.username}}</h2> 
                        <p style="font-size: 12px;">Publié le {{onePublication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onePublication.createdAt.slice(11,16)}}</p>
                    </div>
                </template>

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
                        placeholder="Votre message..."
                        >
                    </textarea>
                </b-card-text>
                
                <hr/>
                <!-- Bouton Suppression  -->
                <div id="updateDelete">
                    <b-button 
                        type="submit"
                        variant="outline-primary"
                    >
                        modifier
                    </b-button>
                
                    <!-- <b-icon  icon="pencil-fill" style="width:16px; color:green"></b-icon> -->
                
                    <!-- <b-icon @click="deletePublication()" icon="trash"  style="width:16px; color:red"></b-icon> -->

                </div>

                <div class="d-flex justify-content-end" >
                    <b-icon @click="deletePublication()"  icon="trash"  style="width:13px; color:red"></b-icon>
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
            comments:"",
            onePublication: [],
            publication:{
                content: "",
                imageUrl: null,
                imageFilename: ""
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
        deletePublication(){
            axios.delete("http://localhost:3000/api/publications/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                location.replace("http://localhost:8080/#/profil");
            })
            .catch((error) => error)
        },
        updatePublication(){
            const updatePost = new FormData();

            updatePost.append("content", this.publication.content);

            if(this.imageUrl !== null){
            updatePost.append("image", this.publication.imageUrl, this.publication.imageUrl.filename);
            }
            axios.put("http://localhost:3000/api/publications/" + this.$route.params.id, updatePost, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then((publication)=> {
                this.content = publication.data.content
                this.imageUrl = publication.data.imageUrl
                location.replace("http://localhost:8080/#/profil")
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