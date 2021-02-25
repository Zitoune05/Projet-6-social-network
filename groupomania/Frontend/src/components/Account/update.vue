<template>

  <!-- card modification des informations d'utilisateur -->
  <b-card tag="article" class="container shadow col-md-5 mx-auto mt-5 ">

    <div>
        <h1>Modifier les informations</h1>
    </div>

    <hr>

    <!-- formulaire pour modfifier le compte -->
    <form method="POST" @submit.prevent = "updateUser">

      <!-- email à modifier -->
      <section>
        <b-form class="w-75 mx-auto">

          <label for="email">Email</label>

          <b-form-input 
            id="email"
            v-model="email" 
            type="email" 
            aria-describedby="password-help-block"
          >
          </b-form-input>
        </b-form>
      </section>

      <!-- Pseudo -->
      <section class="mt-3">
        <b-form class="w-75 mx-auto">
          <label for="username">Pseudo</label>
          <b-form-input 
            id="username"
            v-model="username"  
            type="text">
          </b-form-input>
        </b-form>
      </section>
      
      <!-- mot de passe -->
      <section>
        <b-form class="w-75 mx-auto">
          <label for="password">Mot de passe</label>
          <b-form-input 
            id="password"
            v-model="password"
            type="password" 
            class="text-password" 
            aria-describedby="password-help-block" 
            >
          </b-form-input>
        </b-form>
      </section>

      <!-- mot de passe confirmer -->
      <section>
        <b-form class="w-75 mx-auto">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <b-form-input 
            id="confirmPassword"
            v-model="confirmPassword"  
            type="password" 
            class="text-password" 
            aria-describedby="password-help-block" 
          ></b-form-input>
        </b-form>
      </section><hr>
      
      <!-- bouton pour confirmer la modification -->
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
  name: "updateUser",
  data(){
    return{
        email:"",
        username:"",
        password:"",
        confirmPassword:""  
      }
  },

  methods:{

    
    
    //Fonction qui permet à l'utilisateur de modifier ses informationss
    updateUser: function () {
      
      if (this.email == "" || this.username == "" || this.password == "" || this.confirmPassword == ""  ){
      alert('Champs manquants')}

      // Si les deux mots de passe de correspondent pas
      else if (this.password != this.confirmPassword){
      alert('Les mots de passe saisis ne sont pas identiques !')
      }
      else{
        // requête pour modifier les informations du compte
      axios.put("http://localhost:3000/api/users" , {"email":this.email,"username":this.username,"password":this.password},
        { headers: { Authorization: "Bearer " + localStorage.token }}
      )
      .then((user) => {
        this.username = user.data.username
        this.email = user.data.email
        this.password = user.data.password
        location.replace("http://localhost:8080/#/profil")
        })
        
        
      .catch((err) => console.log(err))
      }
      
    } 
  },  
}
</script>

<style>
  section{
    margin-bottom: 2rem;
  }
</style>