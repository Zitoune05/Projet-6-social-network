<template>
    <header >
        <b-navbar  toggleable="sm" type="dark" class='Navbar shadow'>

            <b-navbar-brand v-show="disconnected()">

                <router-link to="/accueil">

                    <img id="Logo" alt="logo de l'entreprise" src="../assets/icon-left-font-monochrome-white.svg" width="200px"/>

                </router-link>
                
            </b-navbar-brand>
            
            <b-navbar-brand  v-if="connected()" class="mx-auto">

                <router-link to="/">

                    <img id="Logo" alt="logo de l'entreprise" src="../assets/icon-left-font-monochrome-white.svg" width="200px"/>

                </router-link>

            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav >
                
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto" v-if="disconnected()"> 

                    <b-nav-item-dropdown right >

                        <!-- Using 'button-content' slot -->
                        <template #button-content >
                            <b-icon icon="chat-left-dots-fill" scale="1.2" variant="light"></b-icon>
                        </template>
                        
                        <a :href="'#/createpost'" >Create publication</a>
                        
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>

                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em><b-icon icon="person-circle" scale="1.2" variant="light "></b-icon></em>
                        </template>

                        <b-dropdown-item>
                            <router-link to="/profil">
                                Mon Profil
                            </router-link>
                        </b-dropdown-item>

                        <b-dropdown-item v-if="connected()">
                            <router-link to="/login">
                                Se connecter
                            </router-link>
                        </b-dropdown-item>

                        <b-dropdown-item >
                            <a id="logout" @click="logout()"> Se déconnecter</a>
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
        logout() {
            location.replace(location.origin);
            localStorage.clear();
          
        },
        connected() {
            let connected = localStorage.getItem('userId');
            if( connected > 0 ) {

                return false;
            }
            else{
                return true;
            }
        },
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
        background-color: #38AFFF;
        padding: 1%;
        color: white;
    }
    #logout{
        color: red;
    }
</style>