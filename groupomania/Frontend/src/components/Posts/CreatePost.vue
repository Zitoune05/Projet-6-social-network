<template>

  <!-- card créer une publication -->
  <b-card tag="article" class="col-md-5 mx-auto mt-4 container shadow">

    <!-- formulaire pour créer la publication -->
    <b-form method="POST" @submit.prevent = "createPost" enctype = " multipart / form-data ">

      <!-- contenu texte de la publication  -->
      <section>
          <textarea
            class="form-control"
            id="text-password"
            rows="6"
            placeholder="Écrivez votre premier message !"
            v-model="publication.content">
          </textarea>
      </section>

      <!-- image à charger -->
      <div>
        <b-form-file v-model="publication.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain ></b-form-file>
     
      </div>

      <hr>

      <!-- bouton pour partager la publication -->
      <b-button type="submit" variant="outline-primary">Partager</b-button>

    </b-form>

  </b-card>

</template>

<script>
import axios from "axios";

export default {
  name: "createPost",
  data() {
    return {
      publication:{
        content: "",
        imageUrl: null,
      }
    }
  },
  methods: {
    createPost: function() {

      const newPost = new FormData();

      newPost.append("content", this.publication.content);
      newPost.append("image", this.publication.imageUrl, this.publication.imageUrl.filename);

      if( !this.publication.content || !this.publication.imageUrl ) {
        alert('Champ requis !')
      }

      // requête pour poster la publication
      axios.post("http://localhost:3000/api/new",  newPost,
        { headers: { Authorization: "Bearer " + localStorage.token }}
      )
      .then(() => { this.publication ; location.replace("http://localhost:8080/#/accueil");})
      .catch((erreur) => ("erreur" + erreur))
    },
    // fontion pour charger l'image 
    uploadImage(e) {
      this.publication.imageUrl = e.target.files[0];
      if (this.publication.imageUrl.length === 0) {
        return ;
      }
    }
  }
}
</script>


