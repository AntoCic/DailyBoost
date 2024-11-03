import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/general.scss'
import * as bootstrap from 'bootstrap'
import router from './router'

import { store } from './store'
import { loading } from './loading.js'
import utility from './utility.js'

const app = createApp(App)
app.use(router)

app.config.globalProperties.$store = store;
app.config.globalProperties.$utility = utility;
app.config.globalProperties.$loading = loading;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registrato con successo:', registration);
      })
      .catch((error) => {
        console.error('Errore nella registrazione del Service Worker:', error);
      });
  }

app.mount('#app')