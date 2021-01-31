<template>
        <div>
            <b-card tag="article" class="shadow mt-5" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{onComments.User.username}}</h2> 
                        <p style="font-size: 12px;"> publié le {{onComments.createdAt}}</p>
                    </div>
                </template>

                <b-card-text>
                    <p>{{onComments.comments}}</p>
                </b-card-text>
            
            <hr>

            <div>
                <b-icon @click="deleteComment()" icon="trash"  style="width:16px; color:red"></b-icon>
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
    },
}
</script>