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
      <div class="col-12 text-white text-center">

        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">Template <br> {{ $store.appName }}</h1>

        <button type="button" class="btn btn-outline-success" @click="count++">
          $$$$$$$count: {{ count }}
        </button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
}
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