<template>
    
        <div>
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

            <b-card tag="article" class="shadow mt-1">
            
                <b-form  method="POST" @submit.prevent="addNewComment()" enctype="multipart/form-data"  >

                    <b-card-text>
                        <textarea class="form-control" v-model="comments" id="comments" name="comments" rows="10" placeholder="Votre commentaire ici..." required ></textarea>
                    </b-card-text>

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
            comments:"",
            onePublication: []
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
            .then(() =>  this.comments, location.replace("http://localhost:8080/#/profil"))
            .catch((erreur) => { console.log("erreur" + erreur);
            })
        }
    },
}
</script>