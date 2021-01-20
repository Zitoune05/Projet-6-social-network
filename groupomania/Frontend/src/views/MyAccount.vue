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
            <ul style="padding-left:0px;" >
                <li class="mx-auto">
                    <b-card tag="article" class="mx-auto shadow " style="max-width: 35rem;"  >

                        <template #header>
                            <!-- <div class="headerPost">
                                <b-avatar id='CardUserImage'></b-avatar>
                                <h2>{{message.username}}</h2>
                                <em>{{message.createdAt}}</em>

                            </div> -->
                        </template>

                        <b-card id="CardImagePosted" >
                            <!-- <img :src="'http://localhost:3000/images/' + message.imageUrl" alt="image"> -->
                        </b-card>

                        <b-card-text>
                            <p>message</p>
                        </b-card-text>

                        <b-card-text>
                            <p>content</p>
                        </b-card-text>

                        <hr>
                        <template #footer >
                            <!-- <div class="d-flex justify-content-around">
                            <b-icon icon="heart" style="color: red" class="mr-1"></b-icon>
                            <b-icon icon="card-text" style="color: rgb(97, 135, 170)" class="mr-1"></b-icon>
                            </div> -->
                        </template>

                    </b-card>
                </li>
            </ul>
            <!-- <b-card tag="article" style="max-width: 35rem;" class="mb-2 shadow mx-auto">  
            return publication
            </b-card> -->
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
        };
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
            axios.delete("http://localhost:3000/api/users/:id" + + localStorage.getItem("userId"), {headers: { Authorization: "Bearer " + localStorage.token }})
            .then(()=> {
                localStorage.clear()
            })
            .catch((error) => error)
        }
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