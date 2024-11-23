# Vue I18n
src/
├── locales/
│   ├── en/
│   │   ├── common.json
│   │   ├── header.json
│   │   └── footer.json
│   ├── it/
│   │   ├── common.json
│   │   ├── header.json
│   │   └── footer.json
│   └── index.js
├── main.js
└── ... altri file

# src/locales/index.js
import enCommon from './en/common.json';
import enHeader from './en/header.json';
import enFooter from './en/footer.json';

import itCommon from './it/common.json';
import itHeader from './it/header.json';
import itFooter from './it/footer.json';

export default {
  en: {
    ...enCommon,
    header: enHeader,
    footer: enFooter,
  },
  it: {
    ...itCommon,
    header: itHeader,
    footer: itFooter,
  },
};

# src/locales/it/common.json
{
  "welcome": "Benvenuto",
  "message": "Questo è un messaggio in italiano."
}

# src/locales/en/common.json
{
  "welcome": "Welcome",
  "message": "This is a message in English."
}


# src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

// Importa le traduzioni organizzate
import messages from './locales';

const i18n = createI18n({
  locale: 'it', // Lingua predefinita
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);

app.use(i18n);

app.mount('#app');




```html
<template>
  <div>
    <h1>{{ $t('header.title') }}</h1>
    <p>{{ $t('common.welcomeMessage') }}</p>

    <!-- Footer con la select per cambiare lingua -->
    <footer>
      <select v-model="selectedLocale" @change="changeLanguage">
        <option value="it">Italiano</option>
        <option value="en">English</option>
        <!-- Aggiungi altre lingue se necessario -->
      </select>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLocale: this.$i18n.locale,
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLocale;localStorage.setItem('selectedLocale', this.selectedLocale);
    },
  },
  mounted() {
    const savedLocale = localStorage.getItem('selectedLocale');
    if (savedLocale) {
      this.selectedLocale = savedLocale;
      this.$i18n.locale = savedLocale;
    }
  },
};
</script>
```
