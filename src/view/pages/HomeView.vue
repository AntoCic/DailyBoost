<template>
  <div class="container my-auto">
    <div class="row">
      <!-- <div class="col-6">
        <a class="logo text-end" href="https://getbootstrap.com/docs/5.3/getting-started/introduction" target="_blank">
          <img src="../../assets/img/bootstrap.svg" alt="logo Bootstrap" />
        </a>
      </div>
      <div class="col-6">
        <a class="logo" href="https://vuejs.org/guide/quick-start.html" target="_blank">
          <img src="../../assets/img/vue.svg" alt="logo Vue" />
        </a>
      </div>
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">
          {{ $store.appName }} - {{ $store.appShortName }} - {{ $store.appVersion }}
        </h1>
        <p class="mb-1">{{ $store.appDescription }}</p>
      </div> -->

      <div v-if="dailyData" class="col-12 text-center my-5">
          <a :href="'https://digilander.libero.it/mmuzzi/48_leggi/'+dailyData.lowNuber+'_48.html'" target="_blank" rel="noopener noreferrer"><h2 class="mb-0">{{ dailyData?.title }}</h2></a>
          <p v-if="dailyData.descrizione">{{ dailyData.descrizione }}</p>
          <p v-if="dailyData.motivazionale" class="mt-3 text-success">{{ dailyData.motivazionale }}</p>
      </div>

      <div class="col-12 text-center">
        <button v-if="!isSubscribed" class="btn btn-primary" @click="subscribeUser">
          Iscriviti
        </button>
        <button v-else class="btn btn-secondary" @click="unsubscribeUser">
          Disiscriviti
        </button>
        <button class="btn btn-outline-info" @click="testNotification">
          Send Notifica
        </button>
      </div>

      <!-- <div v-if="resCal" class="col-12 text-center mt-4 text-secondary">
        <h3>Test Call</h3>
        <div v-for="(value, key) in resCal" :key="key">
          <p><strong>{{ key }} : </strong>"{{ value }}"</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { subscribeToTopic, unsubscribeFromTopic, testNotification } from "../../firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
export default {
  data() {
    return {
      isSubscribed: false,
      resCal: null,
      dailyData: null
    }
  },
  methods: {
    async subscribeUser() {
      try {
        const response = await subscribeToTopic();
        console.log("Risposta dalla sottoscrizione:", response);
        this.isSubscribed = true;
        localStorage.setItem("isSubscribed", "true"); // Salva lo stato di iscrizione
        alert("Iscrizione alla newsletter avvenuta con successo!");
      } catch (error) {
        console.error("Errore durante l'iscrizione alla newsletter:", error);
        alert("Errore durante l'iscrizione alla newsletter.");
      }
    },

    async unsubscribeUser() {
      try {
        const response = await unsubscribeFromTopic();
        console.log("Risposta dalla disiscrizione:", response);
        this.isSubscribed = false;
        localStorage.setItem("isSubscribed", "false"); // Salva lo stato di disiscrizione
        alert("Disiscrizione dalla newsletter avvenuta con successo!");
      } catch (error) {
        console.error("Errore durante la disiscrizione dalla newsletter:", error);
        alert("Errore durante la disiscrizione dalla newsletter.");
      }
    },

    async testNotification() {
      try {
        const response = await testNotification();
        console.log("Risposta dal test della notifica:", response);
        alert("Notifica di test inviata con successo!");
      } catch (error) {
        console.error("Errore durante il test della notifica:", error);
        alert("Errore durante il test della notifica.");
      }
    },
  },
  async mounted() {
    this.isSubscribed = localStorage.getItem("isSubscribed") === "true";

    // const app = getApp(); // Assicurati di avere già inizializzato Firebase altrove
    // const functions = getFunctions(app);

    // // Richiama la funzione getResCal
    // const getResCal = httpsCallable(functions, "getResCal");
    // try {
    //   const response = await getResCal();
    //   this.resCal = response.data;
    // } catch (e) {
    //   console.error("Errore nel recupero dei dati:", e);
    // }

    // Ottieni l'istanza del database
    const db = getDatabase();
    // Riferimento per dailyData
    const dbRefDailyInfo = ref(db, "dailyInfo");
    onValue(dbRefDailyInfo, (snapshot) => {
      const data = snapshot.val();
      this.dailyData = data;
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
