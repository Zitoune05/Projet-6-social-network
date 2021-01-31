<template>
    <div class="mt-2">
        <section>
            <b-card tag="article" class=" shadow mx-auto" style="max-width: 35rem;">
                     <!-- information sur le compte de l'utilisateur -->
                    <div class="Userinformation">
                        <h1>{{ user.username }}</h1>
                        <p> email: {{ user.email }}</p>
                        <p> username: {{ user.username }}</p>
                    </div>

                    <!-- Bouton modification  -->
                    <div class="d-flex justify-content-around">
                        <b-button id="update" class="blue" >
                            <b-icon icon="pencil-fill" class="mr-1" style="width:16px"></b-icon>
                            <router-link to="/users/update" style="color: white">
                                Modifier
                            </router-link>
                        </b-button>

                        <b-button @click="logout()" variant="outline-info" >
                            <b-icon icon="power" aria-hidden="true" style="width:17px"></b-icon>
                                Logout
                        </b-button>

                        <!-- Bouton Suppression  -->
                        <b-button @click="deleteUser()" variant="outline-danger">
                            <b-icon icon="trash" class="mr-1" style="width:16px"></b-icon>
                                Supprimer
                        </b-button>
                    </div>
            </b-card>
        </section>

        <!-- Liste des publication de l'utilisateur -->

        <section>
            <div>
            <h2 style=" text-decoration: underline;">Vos publications</h2>
            <b-card style="max-width: 40rem;" tag="article" class="shadow mt-5 mx-auto" v-for="publication in publications" :key="publication.id" >

                <template #header>
                    <div class="headerPost">
                        <h2>{{publication.User.username}}</h2>
                        <p> {{publication.createdAt}}</p>
                    </div>
                </template>

                <b-card-text>
                    <p>{{publication.title}}</p>
                </b-card-text>

                <b-card id="CardImagePosted" >
                    <img :src="publication.imageUrl" class="rounded mx-auto img-fluid "  alt="Responsive image" accept="image/*">
                </b-card>

                <b-card-text>
                    <p>{{publication.content}}</p>
                </b-card-text>

                <hr>
                <template #footer >
                    <div class="d-flex justify-content-around">
                    <a :href="'#/commentaires/'+publication.id" class="h6 small">Commenter</a>

                    <a :href="'#/commentaires/post/'+publication.id" class="h6 small">Voir les commentaires</a>
                    </div>

                    <div>
                        <a :href="'#/commentaire/post/'+publication.id" class="h6 small">Modifier / Supprimer</a>
                        
                    </div>
                </template>

            </b-card>
            </div>

        </section>

        <section>

            <h2 style=" text-decoration: underline;">Vos commentaires</h2>

            <b-card tag="article" class="shadow mt-5" v-for="commentaire in commentaires" :key="commentaire.id" >

            <template #header>
                <div class="headerPost">
                    <h3>{{commentaire.User.username}}</h3>
                    <p> {{commentaire.createdAt}}</p>
                </div>
            </template>

            <b-card-text>
                <p>{{commentaire.comments}}</p>
            </b-card-text>

            <hr>

            <template #footer >
                <div>
                    <a :href="'#/commentaire/update/'+commentaire.id" class="h6 small">Modifier / Supprimer</a>
                </div>
            </template>

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
            commentaires: []
        };
    },
    created () {
    axios
      .get("http://localhost:3000/api/publications/users/"+ localStorage.getItem('userId'),
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.publications = response.data}, )
      .catch(error => {console.log(error)})
    ,
    axios
      .get('http://localhost:3000/api/commentaires/user/'+ localStorage.getItem('userId'),
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.commentaires = response.data})
      .catch(error => {console.log(error)})
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/me", {
                headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((response) => (this.user = response.data.user))
            .catch((err) => console.log(err));
    },
    methods:{
        logout() {
            location.replace(location.origin);
            localStorage.clear();

        },
        deleteUser(){
            axios.delete("http://localhost:3000/api/users/" + localStorage.getItem("userId"), {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                localStorage.clear()
                location.replace(location.origin);
            })
            .catch((error) => error)
        },
        // deletePublication(){
        //     axios.delete("http://localhost:3000/api/publications/" + this.$route.params.id, {headers: { Authorization: "Bearer " + localStorage.token }})
        //     .then(()=> {
        //     })
        //     .catch((error) => error)
        // }
    }

}
</script>

<style >
.routerLink{
    color: wh;
}
.blue{
    background-color: rgb(97, 135, 170);
}
</style>