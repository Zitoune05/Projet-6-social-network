
<template >
    <div class="col-md-6 mx-auto mt-5">

        <b-card tag="article" class="shadow mb-4" v-for="publication in publications" :key="publication.id" id="card">

            <div class="headerPost">
                <h2>{{publication.User.username}}</h2>
                <p > {{publication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + publication.createdAt.slice(11,16)}}</p>
            </div>

            <hr>

            <div class="d-flex justify-content-end" v-if="admin()">

                <a :href="'#/commentaire/post/'+publication.id"><b-icon  id="AdminUpdatePublication"   icon="pencil-fill" ></b-icon> </a>

            </div>

            <p>{{publication.content}}</p>
            
            <img :src="publication.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive" alt="Responsive image" accept="image/*">
            
            <template #footer>
                <div class="d-flex justify-content-around" >
                   <a class="pl-1 pr-1"  :href="'#/commentaires/'+publication.id"><b-icon icon="chat-left-dots" class="mr-1"></b-icon>Commenter</a>
                       
                        <a variant="outline-primary" :href="'#/commentaires/post/'+publication.id" >Les commentaires</a>

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
      .then(response => { this.publications = response.data},console.log(this.comments.length))
      .catch(error => (error))
    },
    
    
    methods: {
        admin(){
            if(localStorage.getItem('isAdmin') == "true") {
                return true
            }else {
                return false
            }
        },
        comments(){
        }
    
    }

};
</script>

<style >
.headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

}
#AdminUpdatePublication{
    color: red;
}

@media (max-width: 500px) {
    .headerPost {
    display: flex;
    flex-direction: column;
    }
}
</style>