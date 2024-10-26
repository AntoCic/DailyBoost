<!-- App.vue -->
<template>
  <CmpLoading v-if="$loading.state" />
  <AppHeader />
  <main class="d-flex">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script>
import AppHeader from './view/layout/AppHeader.vue'
import AppFooter from './view/layout/AppFooter.vue'
import CmpLoading from './view/components/CmpLoading.vue'
export default {
  components: { AppHeader, AppFooter, CmpLoading },
  data() {
    return {
    }
  },
  watch: {
    '$route.name'(newRoute, oldRoute) {
      if (newRoute !== oldRoute) {
        this.$store.routeName = newRoute
      }
    },
  },
  async mounted() {
    await this.$store.start();
  }
}

</script>

<style lang="scss">
/*
@use './assets/scss/partials/_variables.scss' as *;
*/
</style>