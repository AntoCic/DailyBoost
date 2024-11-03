<template>
  <div class="container my-auto">
    <div class="row">
      <div class="col-6">
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
          Template <br />
          {{ $store.appName }}
        </h1>
      </div>

      <div class="col-12 text-center">
        <button v-if="!isSubscribed" class="btn btn-primary" @click="subscribeUser">
          Iscriviti
        </button>
        <button v-else class="btn btn-secondary" @click="unsubscribeUser">
          Disiscriviti
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { subscribeToTopic, unsubscribeFromTopic } from "../../firebaseConfig";

export default {
  data() {
    return {
      isSubscribed: false,
    }
  },
  methods: {
    async subscribeUser() {
      try {
        await subscribeToTopic();
        this.isSubscribed = true;
        localStorage.setItem("isSubscribed", "true"); // Salva lo stato di iscrizione
        alert("Iscrizione alla newsletter avvenuta con successo!");
      } catch (error) {
        alert("Errore durante l'iscrizione alla newsletter.");
      }
    },

    async unsubscribeUser() {
      try {
        await unsubscribeFromTopic();
        this.isSubscribed = false;
        localStorage.setItem("isSubscribed", "false"); // Salva lo stato di disiscrizione
        alert("Disiscrizione dalla newsletter avvenuta con successo!");
      } catch (error) {
        alert("Errore durante la disiscrizione dalla newsletter.");
      }
    },
  },
  async mounted() {
    this.isSubscribed = localStorage.getItem("isSubscribed") === "true";
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
