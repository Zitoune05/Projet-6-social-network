<template>
  <!-- card Inscription -->
  <b-card tag="article"  class="container shadow col-md-5 mx-auto mt-5 ">

    <!-- titre et paragraphe -->
    <section>
      <h1>S'inscire</h1>
      <p> C'est facile et rapide ! </p>
      <a href="#/aide">lien vers la page d'aide pour les nouveaux venu :)</a>
    </section>
    <hr>

    <!-- formulaire d'inscription -->
    <form method="POST" @submit.prevent = "checkForm">

      <!-- partie email -->
      <section class="text-center">
        <b-form >
          <label for="email">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            class="mx-auto mw-75"
            type="email"
            aria-describedby="password-help-block" >
          </b-form-input>
        </b-form>
      </section>

      <!-- partie pseudo  -->
      <section class="text-center">
        <b-form  >
          <label for="username">Pseudo</label>
          <b-form-input
            id="username"
            v-model="username"
            class="mx-auto mw-75"
            type="text">
          </b-form-input>
        </b-form>
      </section>

      <!-- partie password -->
      <section class="text-center">
        <b-form >
          <label for="password">Password</label>
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            class="mx-auto mw-75"
            aria-describedby="password-help-block"
            >
          </b-form-input>
        </b-form>
      </section>

      <!-- comfirmation de mot de passe pour la comparaison -->
      <section class="text-center">
        <b-form >
          <label for="confirmPassword">Confirm Password</label>
          <b-form-input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="mx-auto mw-75"
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form>
      </section><hr>

      <!-- bouton de confirmation -->
      <b-button
        type="submit"
        variant="outline-primary"
      >
        CONFIRMER
      </b-button>

    </form>

  </b-card>
</template>

<script>
import axios from 'axios'

export default {
  name: "Signup",
  data(){
    return{
      email:"",
      username:"",
      password:"",
      confirmPassword:""
    }
  },
  methods:{

    //checkForm envoi le formulaire d'inscription à l'API
    checkForm: function () {


      // Si l'un des champs est nul
      if (!this.email || !this.username || !this.password || !this.confirmPassword ){
        alert('Champ requis !')
      }

      // Si les deux mots de passe de correspondent pas
      else if (this.password != this.confirmPassword){
        alert('Les mots de passe saisis ne sont pas identiques !')
      }

      // Méthode POST envoi les infos à la DATABASE
      else {
        let username =this.username;
        let email = this.email;
        let password = this.password;

        // requête pour envoyer les informations dans la base de donnée
        axios.post('http://localhost:3000/api/signup',
        { username: username, email: email, password: password, isAdmin: 0 })

        .then(() => {
          // requête de connexion
          axios.post("http://localhost:3000/api/login",
            { email: this.email, password: this.password}
          )
          .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userId", response.data.userId)
            location.replace("http://localhost:8080/#/accueil")
          })
          .catch(
            (error) => console.log(error),
          )
        })
        .catch((error) => console.log(error));
      }
    }
  }
}
</script>

<style>
  section{
    margin-bottom: 2rem;
  }
</style>