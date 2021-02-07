<template>

    <div class="mt-4 col-md-7 col-lg-6 mx-auto"><!-- marges bootstrap -->

            <!-- information sur le compte de l'utilisateur -->
        <section>
            
            <!-- Card User -->
            <b-card tag="article" class="shadow">

                <div class="Userinformation ">
                    <h1>{{ user.username }}</h1>
                    <hr>
                    <p> email: {{ user.email }}</p>
                    <p> username: {{ user.username }}</p>
                </div>

                    <hr>
  
                <div id="buttonUserProfil">

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

            </b-card>

        </section>


        <!-- Liste des publication de l'utilisateur connecté-->
        <section v-if="publicationCompte()" >
            <!-- H2 publication -->
            <h2 class="sectionTitle">Vos publications</h2>

            <!-- Card publication -->
            <b-card tag="article" class="shadow mt-2" v-for="publication in publications" :key="publication.id" >

                <!-- Partie header avec le nom et la date de création -->      
                <template #header>

                    <div class="headerPost">
                        
                        <h2>{{publication.User.username}}</h2>
                        <p> Publié le {{publication.createdAt.slice(5,10).split('-').reverse().join('/') + ' à ' + publication.createdAt.slice(11,16)}}</p>
                        

                    </div>
                </template>

                <!-- Title publication -->
                <b-card-text>
                    <p>{{publication.title}}</p>
                </b-card-text>

                <!-- Image a charger -->
                <b-card id="CardImagePosted" >
                    <img :src="publication.imageUrl" class="rounded mx-auto img-fluid mw-25"  alt="Image responsive" accept="image/*">
                </b-card>

                <!-- Contenu de la publication -->
                <b-card-text>
                    <p>{{publication.content}}</p>
                </b-card-text>

                <hr>

                <!-- Footer -- Liens pour modifier/supprimer , commenter ou voir les commentaires de la publciation -->
                <template #footer >

                    <div class="d-flex justify-content-around">
                        
                        <!-- lien pour commenter -->
                        <a :href="'#/commentaires/'+publication.id" class="h6 small">Commenter</a>

                        <!-- lien pour voir les commentaires de la publication -->
                        <a :href="'#/commentaires/post/'+publication.id" class="h6 small">Voir les commentaires</a>

                    </div>

                    <div>

                        <!-- lien pour modifier/supprimer la publication -->
                        <a :href="'#/commentaire/post/'+publication.id" class="h6 small">Modifier</a>


                    </div>

                </template>

            </b-card>   
        </section>

        
        <!-- Liste des commentaires de l'utilisateur connecté-->
        <section v-if="commentCompte()">

            <!-- H2 commentaires -->
            <h2 class="sectionTitle">Vous avez publié {{ commentaires.length }} commentaire </h2>

            <!-- Card Commentaire -->
            <b-card tag="article" class="shadow mt-5 mx-auto "  v-for="commentaire in commentaires" :key="commentaire.id" >

            <!-- Partie header avec le nom et la date de création -->   
            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p > Publié le {{commentaire.createdAt.slice(5,10).split('-').reverse().join('/') + ' à ' + commentaire.createdAt.slice(11,16)}}</p>
                </div>
            </template>

            <!-- commentaires de la publication -->
            <b-card-text>
                <p>{{commentaire.comments}}</p>
            </b-card-text>

            <hr>

            <template #footer >
                
                <div>
                    <!-- lien pour modifier/supprimer le commentaire -->
                    <a :href="'#/commentaire/update/'+commentaire.id" class="h6 small">Modifier / Supprimer</a>

                </div>
                
            </template>

            </b-card>
        </section>

        <!-- Liste des utilisateur , si l'uitilisateur est admin -->
        <section v-if="checkAdmin()">

            <!-- H2 ListUser -->
            <h2 class="sectionTitle" id="ListUser">Liste des utilisateur</h2>

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
}
.headerPost {            /** Titre h2 de chaque section  */
    font-size: 12px;
}
@media screen and (max-width: 640px) {
  #buttonUserProfil {
    display:block;
    clear:both;
  }
}

</style>