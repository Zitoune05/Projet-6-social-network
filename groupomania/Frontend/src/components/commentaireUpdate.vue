<template>
        <div>
            <b-card tag="article" class="mt-4 col-md-7 col-lg-6 mx-auto shadow mt-5" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{onComments.User.username}}</h2> 
                        <p style="font-size: 12px;"> Publié le {{onComments.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + onComments.createdAt.slice(11,16)}}</p>
                    </div>
                </template>
                
                <b-card-text>
                    <p>{{onComments.comments}}</p>
                </b-card-text>

                <b-card-text>
                    <textarea class="form-control" v-model="NewComments" id="comments" name="comments" rows="10" placeholder="Votre commentaire ..." required ></textarea>
                </b-card-text>
            
            <hr>

            <div >
                <b-icon @click="updateComment()" icon="pencil-fill" class="mr-5" style="width:16px; color:yellow"></b-icon>
                
                <b-icon @click="deleteComment()" icon="trash"  class="ml-5" style="width:16px; color:red"></b-icon>

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
            NewComments: "",
            onComments: []
        }
    },
    created () {
    axios
      .get('http://localhost:3000/api/commentaire/user/publication/'+ this.$route.params.id,
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.onComments = response.data})
      .catch(error => {console.log(error)})
    },
    methods: {
        deleteComment(){
            axios.delete("http://localhost:3000/api/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                location.replace("http://localhost:8080/#/profil");
            })
            .catch((error) => error)
        },
        updateComment(){

            axios.put("http://localhost:3000/api/commentaire/" + this.$route.params.id, {"comments": this.NewComments} ,
                { headers: { Authorization: "Bearer " + localStorage.token }}
            )
            .then((res) => {this.NewComments = res.data.comments})
            .catch((erreur) => erreur
            )
        }
    },
}
</script>