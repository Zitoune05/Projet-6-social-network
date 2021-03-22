<template>

  <!-- card pour se connecter -->
  <b-card tag="article" class="container shadow col-md-5 mx-auto mt-5">

    <!-- formulaire pour se connecter -->
    <form method="POST" @submit.prevent="login">

      <!-- partie email -->
      <section class="mt-3">
        <b-form>
          <label for="feedback-user">Email</label>
          <b-form-input  
            type="email"
            class="width-marge"
            id="feedback-user" 
            v-model="email"
          >
          </b-form-input>
        </b-form>
      </section>
      
      <!-- partie passwords -->
      <section>
        <b-form>
          <label for="text-password">Password</label>
          <b-form-input 
            type="password" 
            class="text-password width-marge" 
            aria-describedby="password-help-block" 
            v-model="password"
          >
          </b-form-input>
        </b-form>
      </section>
      
      <!-- bouton de connexion -->
      <b-button type="submit" variant="outline-primary">CONNEXION</b-button>

    </form>

    
    <hr>

    <p>Pas encore inscrit ? 

      <!-- bouton pour s'inscrire -->
      <b-button variant="outline-success" >
          <router-link to="/signup" id="LinkSignup">
              Créer un compte
          </router-link>
      </b-button>

    </p>


  </b-card>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    // fonction pour se connecter
    login: function()  {
      if ( this.email === null || this.password === null) {
        alert('Votre email ou mot de passe est incorrect !')
      } 
      else {
        axios.post("http://localhost:3000/api/login",
          { email: this.email, password: this.password}
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("userId", response.data.userId)
          localStorage.setItem("role", response.data.role)
          
          location.reload(location.replace("http://localhost:8080/#/accueil"));
        })
        .catch(
          (error) => console.log(error),
        )
      }
    },
  }
};
</script>

<style>
  .width-marge{
    max-width: 300px; 
    margin: auto;
  }

  #LinkSignup{
    transition-duration: 0.3s;
      color: #34cf58;
    }
  #LinkSignup:hover{
    color: white;
  }
  section{
    margin-bottom: 2rem;
  }
</style>
