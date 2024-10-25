<!-- HomeView.vue -->
<template>
  <div class="container my-auto">
    <div class="row">
      <div class="col-6">
        <a class="logo text-end" href="https://getbootstrap.com/docs/5.3/getting-started/introduction" target="_blank">
          <img src="../../assets/img/bootstrap.svg" alt="logo Bootstrap">
        </a>
      </div>
      <div class="col-6">
        <a class="logo" href="https://vuejs.org/guide/quick-start.html" target="_blank">
          <img src="../../assets/img/vue.svg" alt="logo Vue">
        </a>
      </div>
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">Template <br> {{ $store.appName }}</h1>
      </div>

      <div class="col-12 text-center" v-if="!user">
        <!-- Mostra il pulsante di login se l'utente NON è loggato -->
        <button @click="loginWithGoogle" class="btn btn-primary">Accedi con Google</button>
      </div>

      <div class="col-12 text-center" v-if="user">
        <!-- Mostra questi pulsanti solo se l'utente è loggato -->
        <button @click="logout" class="btn btn-danger">Logout</button>
        <button @click="callProtectedFunction" class="btn btn-success">Chiama la Function Protetta</button>
      </div>
    </div>
  </div>
</template>


<script>
import app from "../../firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from "axios";

export default {
  data() {
    return {
      user: null, // Stato dell'utente autenticato
    };
  },
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user; // Imposta l'utente autenticato
      } catch (error) {
        console.error("Errore di autenticazione:", error);
      }
    },
    async logout() {
      const auth = getAuth(app);
      try {
        await signOut(auth);
        this.user = null; // Resetta lo stato utente al logout
      } catch (error) {
        console.error("Errore nel logout:", error);
      }
    },
    async callProtectedFunction() {
      const auth = getAuth(app);
      try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get("https://helloworld-g5c4oawzia-uc.a.run.app", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Risposta dalla funzione protetta:", response.data);
      } catch (error) {
        console.error("Errore nella chiamata alla funzione protetta:", error);
      }
    },
  },
  mounted() {
    const auth = getAuth(app);
    // Ascolta i cambiamenti nello stato dell'utente
    auth.onAuthStateChanged((user) => {
      this.user = user ? user : null;
    });
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  width: 100%;

  img {
    width: 100%;
    max-width: 100px;
  }
}
</style>