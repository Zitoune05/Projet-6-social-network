
<template>
   <ul >
        <li >
            <b-card tag="article" class="shadow mt-5" v-for="publication in publications" :key="publication.id" >

                <template #header>
                    <div class="headerPost">
                        <b-avatar id='CardUserImage'></b-avatar>
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
                        <button style="border: none"><b-icon icon="heart" style="color: red" class="mr-1"></b-icon></button>

                    <a :href="'#/commentaires/'+publication.id" class="h6 small">Voir les commentaires</a>
                    </div>
                </template>

            </b-card>
        </li>
    </ul>
</template>



<script>
import axios from "axios";


export default {
    name: "Wall",

    data() {
        return {
            publications: []
        }
    },
    created () {
    axios
      .get('http://localhost:3000/api/publications',
      { headers: { Authorization: "Bearer " + localStorage.token }})
      .then(response => { this.publications = response.data})
      .catch(error => {console.log(error)})
    },

};
</script>

<style >

</style>