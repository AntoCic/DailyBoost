<template>
  <CmpLoading v-if="store.loading.state" />
  <AppHeader />
  <main class="d-flex">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script>
import { store } from './store.js';
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import CmpLoading from './components/CmpLoading.vue'
export default {
  components: { AppHeader, AppFooter, CmpLoading },
  data() {
    return {
      store,
    }
  },
  watch: {
    '$route.name'(newRoute, oldRoute) {
      if (newRoute !== oldRoute) {
        this.store.routeName = newRoute
      }
    },
  },
  async mounted() {
    await this.store.start();
  }
}

</script>

<style lang="scss">
/*
@use '../assets/scss/partials/_variables.scss' as *;
*/
</style>