<template>
  <b-card tag="article" style="max-width: 35rem;" class="container mt-2 shadow ">

    <div>
        <h1>Modifier les informations</h1>
    </div>

    <hr>

    <form method="POST" @submit.prevent = "updateUser">

      <section>
        <b-form>
          <label for="email">Email</label>
          <b-form-input 
            id="email"
            v-model="email" 
            style="max-width: 300px; margin: auto;"  
            type="email" 
            aria-describedby="password-help-block"
          >
          </b-form-input>
        </b-form>
      </section>

      <section class="mt-3">
        <b-form >
          <label for="username">Pseudo</label>
          <b-form-input 
            id="username"
            v-model="username"  
            style="max-width: 300px; margin: auto;"
            type="text">
          </b-form-input>
        </b-form>
      </section>
      
      <section>
        <b-form >
          <label for="password">Password</label>
          <b-form-input 
            id="password"
            v-model="password"
            type="password" 
            class="text-password" 
            aria-describedby="password-help-block" 
            style="max-width: 300px; margin: auto;">
          </b-form-input>
        </b-form>
      </section>

      <section>
        <b-form>
          <label for="confirmPassword">Confirm Password</label>
          <b-form-input 
            id="confirmPassword"
            v-model="confirmPassword"  
            type="password" 
            class="text-password" 
            aria-describedby="password-help-block" 
            style="max-width: 300px; margin: auto;"
          ></b-form-input>
        </b-form>
      </section><hr>
      
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
      
      if (this.email == "" || this.username == "" || this.password == ""  ){
      alert('Champs manquants')}

      // Si les deux mots de passe de correspondent pas
      else if (this.password != this.confirmPassword){
      alert('Les mots de passe saisis ne sont pas identiques !')
      }
      else{
      axios.put("http://localhost:3000/api/users" ,{
        email: this.email,
        username: this.username,
        password: this.password,
      },
          { headers: { Authorization: "Bearer " + localStorage.token }}
      )
      .then((user) => {
        alert('informations modifiées avec succée !')
        this.username = user.data.username
        this.email = user.data.email
        this.password = user.data.password
        })
        
      .catch((err) => console.log(err))
      // window.location = "http://localhost:8080/#/profil";
      }
      
    } 
  },  
}
</script>

<style>
  section{
    margin-bottom: 2rem;
  }

  hr{
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  }

  hr::before {
    content: '';
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
 hr::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 .5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
  }
</style>