<template>

  <b-card tag="article" style="max-width: 35rem; max-height: 35em;" class="container mt-2 shadow ">

    <b-form method="POST" @submit.prevent = "createPost" enctype = " multipart / form-data ">

      <section class="mt-3">
          <b-form-input
            type="text"
            id="feedback-title"
            style="max-width: 300px; margin: auto;"
            v-model="publication.title"
            placeholder="Titre"
          >
          </b-form-input>
      </section>

      <section>
          <textarea
            class="form-control"
            id="text-password"
            rows="6"
            placeholder="Écrivez votre premier message !"
            v-model="publication.content">
          </textarea>
      </section>

      <div>
        <b-form-file v-model="publication.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain ></b-form-file>
        <!-- <div id="preview" class="mt-3">
          <img v-if="publication.imageUrl" :src="publication.imageUrl" style="max-width:30%" class="rounded mx-auto img-fluid " />
        </div> -->
      </div>

      <hr>
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
        title: "",
        content: "",
        imageUrl: null,
        // blobImage: "",
        likes: 0
      }
    }
  },
  methods: {
    createPost: function() {

      const newPost = new FormData();

      newPost.append("title", this.publication.title);
      newPost.append("content", this.publication.content);
      newPost.append("likes", this.publication.likes);
      newPost.append("image", this.publication.imageUrl, this.publication.imageUrl.filename);

      if( !this.publication.content ) {
        alert('Champ requis !')
      }

      axios.post("http://localhost:3000/api/new",  newPost,
        { headers: { Authorization: "Bearer " + localStorage.token }}
      )
      .then(() => { this.publication ; console.log("Publication envoyée avec succée !")})
      .catch((erreur) => { console.log("erreur" + erreur);
      })
      location.replace(location.origin);
    },
    uploadImage(e) {
      this.publication.imageUrl = e.target.files[0];
      if (this.publication.imageUrl.length === 0) {
        return ;
      }
    }
  }
}
</script>

<style>

</style>
