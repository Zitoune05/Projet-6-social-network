<template>
    <header >

        <!-- header nav -->
        <b-navbar  toggleable="sm" type="dark" class='Navbar shadow'>

            <!-- si l'utilisateur est déconnecté ne s'affiche pas  -->
            <b-navbar-brand v-show="disconnected()">

                <!-- logo -- lien vers le mur de publications -->
                <router-link to="/accueil">
                    <img id="Logo" alt="logo de l'entreprise" src="../assets/icon-left-font-monochrome-white.svg"  class="img-fluid mw-200"/>
                </router-link>
                
            </b-navbar-brand>

            <!-- si l'utilisateur est déconnecté, s'affiche  -->
            <b-navbar-brand  v-if="connected()" class="mx-auto">

                <!-- logo -- lien vers la connexion -->
                <router-link to="/">
                    <img id="Logo" alt="logo de l'entreprise" src="../assets/icon-left-font-monochrome-white.svg" width="200px"/>
                </router-link>

            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav >
                
                <!-- si l'utilisateur est déconnecté ne s'affiche pas  -->
                <b-navbar-nav class="ml-auto" v-if="disconnected()"> 

                    <b-nav-item-dropdown right >

                        <!-- bouton publication avec icon -->
                        <template #button-content >
                            <b-icon icon="chat-left-dots-fill" scale="1.2" variant="light"></b-icon>
                        </template>

                        <!-- lien vers la création de publication -->
                        <b-dropdown-item :href="'#/createpost'">
                            Créer une publication
                        </b-dropdown-item>
                        <!-- lien vers la création de publication -->
                        <b-dropdown-item :href="'#/aide'">
                            Aide
                        </b-dropdown-item>
                        
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>

                        <!-- bouton profil avec icons -->
                        <template #button-content>
                            <em><b-icon icon="person-circle" scale="1.2" variant="light "></b-icon></em>
                        </template>

                        <!-- lien vers le profil utilisateur -->
                        <b-dropdown-item :href="'#/profil'">
                            Mon Profil
                        </b-dropdown-item>

                        <!-- déconnexion -->
                        <b-dropdown-item id="logout" @click="logout()">
                            Se déconnecter
                        </b-dropdown-item>

                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
export default {
    name: 'Navbar',

    methods:{

        // fonction de déconnexion
        logout() {
            location.replace(location.origin);
            localStorage.clear();          
        },

        // fonction pour afficher un contenu si l'utilisateur est déconnecté
        connected() {
            let connected = localStorage.getItem('userId');
            if( connected > 0 ) {

                return false;
            }
            else{
                return true;
            }
        },

        // fonction pour ne pas afficher un contenu si l'utilisateur est déconnecté
        disconnected() {
            let connected = localStorage.getItem('userId');
            if( connected > 0 ) {
                return true;
            }
            else{
                return false;
            }
        }
    }
}
</script>


<style >
    .Navbar {
        background-color: #7451eb;
        padding: 1%;
        color: white;
    }
    #logout{
        color: red;
    }
    #ok{
        background-color: red;
    }
    /* #Logo{
        width: 900px;
    } */
</style>