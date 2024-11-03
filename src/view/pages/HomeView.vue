<template>
  <div class="container my-auto">
    <div class="row">
      <div class="col-6">
        <a
          class="logo text-end"
          href="https://getbootstrap.com/docs/5.3/getting-started/introduction"
          target="_blank"
        >
          <img src="../../assets/img/bootstrap.svg" alt="logo Bootstrap" />
        </a>
      </div>
      <div class="col-6">
        <a
          class="logo"
          href="https://vuejs.org/guide/quick-start.html"
          target="_blank"
        >
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
        <button class="btn btn-primary" @click="subscribeUser">
          Iscriviti
        </button>
        <button class="btn btn-secondary" @click="unsubscribeUser">
          Disiscriviti
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { subscribeToTopic, unsubscribeFromTopic } from "../../firebaseConfig";

export default {
  methods: {
    async subscribeUser() {
      try {
        await subscribeToTopic();
        alert("Iscrizione alla newsletter avvenuta con successo!");
      } catch (error) {
        alert("Errore durante l'iscrizione alla newsletter.");
      }
    },
    
    async unsubscribeUser() {
      try {
        await unsubscribeFromTopic();
        alert("Disiscrizione dalla newsletter avvenuta con successo!");
      } catch (error) {
        alert("Errore durante la disiscrizione dalla newsletter.");
      }
    },
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
