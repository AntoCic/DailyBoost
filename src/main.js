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

app.mount('#app')