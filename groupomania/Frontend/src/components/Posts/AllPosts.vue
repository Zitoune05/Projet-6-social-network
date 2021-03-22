
<template >

    
    <div class="col-md-5 mx-auto mt-5" >

        <div v-if="publications.length === 0">

            <b-card class="shadow mb-4" id="card">

                <h1> Aucune publications pour le moment</h1>
                
                <hr>

                <p>
                    Si vous vous connectez pour la première fois, cliquez <a :href="'#/aide'">ici</a>
                </p>
            </b-card>

        </div>

        <div>

            <!-- one-publication -->
            <b-card tag="article" class="shadow mb-4" v-for="publication in publications" :key="publication.id" id="card">

            

                <!-- header -->
                <div class="headerPost">

                    <!-- publication username -->
                    <h2>{{publication.User.username}}</h2>

                    <!-- publication créée le ... -->
                    <p > {{publication.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + publication.createdAt.slice(11,16)}}</p>
                </div>

                <hr>

                <!-- si l'utilisateur est admin alors afficher -->
                <div class="d-flex justify-content-end" v-if="admin()">

                    <!-- lien pour modifier la publication en tant qu'admin  -->
                    <a :href="'#/publication/update/'+publication.id"><b-icon  id="AdminUpdatePublication"   icon="pencil-fill" ></b-icon> </a>

                </div>

                <!-- contenu de la publication -->
                <p>{{publication.content}}</p>
                
                <!-- image de la publication -->
                <img :src="publication.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive" alt="Responsive image" accept="image/*">
                
                <!-- footer de la publication  -->
                <template #footer>

                    <div class="d-flex justify-content-around" >

                        <!-- lien pour commenter la publication -->
                        <a class="pl-1 pr-1"  :href="'#/commentaires/'+publication.id"><b-icon icon="chat-left-dots" class="mr-1"></b-icon>Commenter</a>
                        
                        <!-- lien pour voir les commentaires -->
                        <a variant="outline-primary" :href="'#/commentaires/post/'+publication.id" >Les commentaires ({{ publication.Commentaires.length }})</a>

                    </div>

                </template>

            </b-card>
        </div>

    </div>

</template>

<script>

import axios from "axios";

export default {
    name: "Wall",

    data() {
        return {

            publications: [
            ],

        }
    },
    // watch: {
    //     publications: {
    //         handler: function (newVal) {
    //             console.log(newVal, "ok")
    //         },
    //         deep: true,
    //     }
    // },
    created() {

    // requete pour afficher toute les publications et le nombre de commentaires correspondant 
    axios
    .get('http://localhost:3000/api/publications',
    { headers: { Authorization: "Bearer " + localStorage.token }})
    .then(response => { 
        this.publications = response.data;    
        }
    ) 
    .catch(error => (error))
    },
    
    
    methods: {

        // méthode pour verifier si l'utilisateur est admin
        admin(){
            if(localStorage.getItem('role') == "users") {
                return true
            }else if(localStorage.getItem('role') == "admin"){
                return true
            }
        },
    
    }

};
</script>

<style >
.headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

}

/* couleur de l'icon update */
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