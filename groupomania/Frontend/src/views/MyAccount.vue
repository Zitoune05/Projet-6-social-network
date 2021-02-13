<template>

    <div class="col-md-5 mx-auto mt-5"><!-- marges bootstrap -->

            <!-- information sur le compte de l'utilisateur -->
        <section>
            
            <!-- carte Utilisateur -->
            <b-card tag="article" class="shadow">

                <!-- information sur l'utilisateur -->
                <div>
                    
                    <img src="../assets/undraw_Profile_data_re_v81r.svg" alt="email" class="img-fluid svgImagesPublic" >

                    <!-- h1 Mon profil -->
                    <h1 class="text-center m-1">Mon profil</h1>
                    <hr>

                    <!-- email  -->
                    <p> email : {{ user.email }}</p>

                    <!-- noms -->
                    <p> nom: {{ user.username }}</p>

                </div>

                <template #footer>

                    <div >

                        <!-- Bouton modification  -->
                        <div class="d-flex justify-content-around">
                            <b-button @click="updateUser()"  v-b-tooltip.hover title="Modifier" variant="outline-warning">
                                <b-icon icon="pencil-fill" ></b-icon>
                            </b-button>
                            
                        <!-- Bouton logout  -->
                            <b-button @click="logout()" variant="outline-info" v-b-tooltip.hover title="Se déconnecter" >
                                <b-icon icon="power" aria-hidden="true" ></b-icon>
                            </b-button>

                        <!-- Bouton Suppression  -->
                            <b-button @click="deleteUser()" variant="outline-danger" v-b-tooltip.hover title="Supprimer mon compte">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </div>

                    </div>
                </template>

            </b-card>

        </section>


        <!-- Liste des publication de l'utilisateur connecté-->
        <section v-if="publicationCompte()" >
            <!-- H2 publication -->
            
            <h2 class="sectionTitle "><img src="../assets/undraw_modern_design_v3wv.svg" alt="email" class="img-fluid svgImagesPublic" >Mes publications</h2>

            <!-- Card publication -->
            <b-card tag="article" class="shadow mt-2" v-for="publication in publications" :key="publication.id" >
                
                <!-- Partie header avec le nom et la date de création -->      
                <div class="headerPost">
                    
                    <h2>{{publication.User.username}}</h2>
                    <p>{{publication.createdAt.slice(5,10).split('-').reverse().join('/') + ' à ' + publication.createdAt.slice(11,16)}}</p>
                    

                </div>

                 <!-- Contenu de la publication -->
                <b-card-text>
                    <p>{{publication.content}}</p>
                </b-card-text>

                <!-- Image a charger -->
                <b-card id="CardImagePosted" >
                    <img :src="publication.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive" alt="Responsive image" accept="image/*">
                </b-card>

                <!-- Footer -- Liens pour modifier/supprimer , commenter ou voir les commentaires de la publciation -->
                <template #footer >

                    <div class="d-flex justify-content-around" >
                        <a class="pl-1 pr-1"  :href="'#/commentaires/'+publication.id"><b-icon icon="chat-left-dots" class="mr-1"></b-icon>Commenter</a>
                        
                        <a variant="outline-primary" :href="'#/commentaires/post/'+publication.id" >Les commentaires</a>
                    </div>

                    <hr>

                    <div class="d-flex justify-content-around">

                        <!-- lien pour modifier/supprimer la publication -->

                        <b-button type="submit" v-b-tooltip.hover title="Modifier" variant="outline-warning">
                            <b-icon icon="pencil-fill" ></b-icon>
                        </b-button>

                    </div>

                </template>

            </b-card>   
        </section>

        
        <!-- Liste des commentaires de l'utilisateur connecté-->
        <section v-if="commentCompte()">

            <!-- H2 commentaires -->
            <h2 class="sectionTitle "><img src="../assets/undraw_annotation_7das.svg" alt="email" class="img-fluid svgImagesPublic" >Vos commentaires ({{ commentaires.length }})  </h2>

            <!-- Card Commentaire -->
            <b-card tag="article" class="shadow mt-5 mx-auto "  v-for="commentaire in commentaires" :key="commentaire.id" >

            <!-- Partie header avec le nom et la date de création -->   
            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p >{{commentaire.createdAt.slice(5,10).split('-').reverse().join('/') + ' à ' + commentaire.createdAt.slice(11,16)}}</p>
                </div>
            </template>

            <!-- commentaires de la publication -->
            <b-card-text>
                <p>{{commentaire.comments}}</p>
            </b-card-text>

            <hr>

            <template #footer >
                
                <div class="d-flex justify-content-around">

                    <!-- lien pour modifier/supprimer le commentaire -->
                    <b-button  :href="'#/commentaire/update/'+commentaire.id"  type="submit" v-b-tooltip.hover title="Modifier" variant="outline-warning" >
                        <b-icon icon="pencil-fill" ></b-icon>
                    </b-button>

                </div>
                
            </template>

            </b-card>
        </section>

        <!-- Liste des utilisateur , si l'uitilisateur est admin -->
        <section v-if="checkAdmin()">

            <!-- H2 ListUser -->
            <h2 class="sectionTitle text-center " id="ListUser"><img src="../assets/undraw_female_avatar_w3jk.svg" alt="email" class="img-fluid svgImages" >Les utilisateurs<img src="../assets/undraw_male_avatar_323b.svg" alt="email" class="img-fluid svgImages" ></h2>

            <!-- Card publication -->
            <b-card tag="article" class="shadow mt-5 mx-auto"  v-for="user in users" :key="user.id" >
            
            <!-- Contenu des utilisateurs -->
            <b-card-text>
                <p>Pseudo : {{user.username}}</p>
            </b-card-text>
            <hr>
            <b-card-text>
                <p>Email : {{user.email}}</p>
            </b-card-text>
            <hr>
            <b-card-text>
                <p>id : {{user.id}}</p>
            </b-card-text>


            </b-card>
        </section>

    </div>

</template>

<script>
import axios from 'axios'

export default {
    name: "MyAccount",
    data() {
        return {
            user: {
                email : '',
                username :'',
            },
            publications: [],
            commentaires: [],
            users: [],
        };
    },
    created () {
    axios   // Requette axios pour récupérer les information sur les utilisateur 
        .get("http://localhost:3000/api/admin/users",
            { headers: { Authorization: "Bearer " + localStorage.token }})
        .then(response => { this.users = response.data})
        .catch(error => {console.log(error)}),

    axios           // Requette axios pour récupérer l'ensemble des publications de l'utilisateur 
      .get("http://localhost:3000/api/publications/users/"+ localStorage.getItem('userId'),
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.publications = response.data}, )
      .catch(error => {console.log(error)})
    ,
    axios           // Requette axios pour pour récupérer l'ensemble des commentaires de l'utilisateur
      .get('http://localhost:3000/api/commentaires/user/'+ localStorage.getItem('userId'),
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.commentaires = response.data})
      .catch(error => {console.log(error)})
    },
    mounted() {
        axios       // Requette axios pour récupérer les information de l'utilisateur
            .get("http://localhost:3000/api/me", {
                headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((response) => (this.user = response.data.user))
            .catch((err) => console.log(err));
    },
    methods:{
        updateUser() {      // Fonction pour envoyer vers la page de modification du profil
            location.replace("http://localhost:8080/#/users/update");
        },
        logout() {      // Fonction de déconnexion
            location.replace(location.origin);
            localStorage.clear();

        },
        deleteUser(){      // Fonction de suppresion de l'utilisateur
         
            axios       // Requette axios pour suprrimer l'user de la base de donnée 
            .delete("http://localhost:3000/api/users/" + localStorage.getItem("userId"), {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                localStorage.clear()
                location.replace(location.origin);
            })
            .catch((error) => error)
        },
        checkAdmin(){      // Fonction vérifiant si l'user est Administrateur
        if( localStorage.getItem("isAdmin") === "true" ) {
            

            return true;
        } 
        else{
            return false;
        }
        }, 
        commentCompte() {
             if( this.commentaires.length > 0 ) {
                    return true;
                } 
                else{
                    return false;
                }
      
        },
        publicationCompte(){
             if( this.publications.length > 0 ) {
                    return true;
                } 
                else{
                    return false;
                }
      
        }
    }

}
</script>

<style >

.sectionTitle {          /** Titre h2 de chaque section  */
    margin-top: 100px;  
    font-size: 30px;
}
.headerPost {            /** Titre h2 de chaque section  */
    font-size: 12px;
}
.headerPost p{            /** Titre h2 de chaque section  */
    font-size: 10px;

}
@media screen and (max-width: 640px) {
  #buttonUserProfil {
    display:block;
    clear:both;
  }
}
.svgImages{
    width: 60px;
}
.svgImagesPublic{
    width: 100px;
}


</style>