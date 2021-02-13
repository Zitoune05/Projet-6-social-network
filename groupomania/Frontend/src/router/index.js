import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import aide from '../views/Aide.vue'
import MyAccount from '../views/MyAccount.vue'
import updateUser from '../components/Account/update.vue'
import createPost from '../components/Posts/CreatePost.vue'
import commentaires from '../components/comments/listeCommentaires.vue'
import commentairesPost from '../components/comments/commentairesPost.vue'
import publicationUpdate from '../components/Posts/publicationUpdate.vue'
import commentaireUpdate from '../components/comments/commentaireUpdate.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NewUser',
    component: Signin
  },
  {
    path: '/accueil',
    name: 'Home',
    component: Home
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup

  },
  {
    path: '/login',
    name: 'login',
    component: Signin

  },
  {
    path: '/profil',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/aide',
    name: 'aide',
    component: aide
  },
  {
    path: '/users/update',
    name: 'updateUser',
    component: updateUser
  },
  {
    path: '/createpost',
    name: 'createPost',
    component: createPost
  },
  {
    path: '/commentaires/:id',
    name: 'commentairesPost',
    component: commentairesPost
  },
  {
    path: '/commentaire/update/:id',
    name: 'commentaireUpdate',
    component: commentaireUpdate
  },
  {
    path: '/publication/update/:id',
    name: 'commentairePost',
    component: publicationUpdate
  },
  {
    path: '/commentaires/post/:id',
    name: 'commentaires',
    component: commentaires
  }
  
]

const router = new VueRouter({
  routes
})

export default router