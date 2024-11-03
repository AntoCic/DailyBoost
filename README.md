# Template base Vue, Bootstrap, sass
CMD to start
```sh
npm i
npm run dev
```

> **NOTA:** Se non hai interesse nell'utilizzo di Netlify Functions, puoi cancellare il file `netlify.toml` e la cartella `functions`, e fermarti di leggere qui. Se vuoi comunque pubblicare il sito su Netlify, puoi farlo seguendo solo la "Guida per pubblicare un progetto su Netlify" qui sotto.

> **ATTENZIONE:** Se utilizzi Netlify Functions, assicurati di aver un account su Netlify e segui i passaggi elencati di seguito:

### Guida per pubblicare un progetto su Netlify

1. **Pubblica il progetto su GitHub**
   - Assicurati che il tuo progetto sia stato caricato su GitHub.

2. **Collega il tuo account GitHub con Netlify**
   - Vai su Netlify e collega il tuo account GitHub a Netlify.

3. **Aggiungi un nuovo sito**
   - Su Netlify, clicca su "Aggiungi un nuovo sito".

4. **Importa da un progetto esistente**
   - Seleziona "Importa da un progetto esistente".

5. **Seleziona GitHub**
   - Scegli GitHub come fonte del progetto.

6. **Seleziona il tuo progetto**
   - Dalla lista dei tuoi progetti su GitHub, seleziona quello che vuoi pubblicare.

7. **Aggiungi un nome disponibile per il sito**
   - Inserisci un nome disponibile per il sito su Netlify.

8. **Fai il deploy**
   - Clicca sul bottone apposito in basso per avviare il deploy.

9. **Il tuo sito è online**
   - Una volta completato il deploy, il tuo sito sarà online.

### Netlify CLI
Installa Netlify CLI a livello globale lanciando
```sh
npm install netlify-cli -g
```

Effettua il login con il comando di sotto. e segui la procedura di login a netlify
```sh
ntl login
```

Collega il progetto locale con il sito online. 
In questa maniera se hai dichiarato environment variables nel sito online verranno lette anche in locale
lancia
```sh
ntl link
```

testa il progetto su un serverver locale lanciando
```sh
ntl dev
```

npm install -g firebase-tools
firebase      
firebase login
firebase projects:create
firebase init functions 
firebase init         

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * 
 * logger.info()
 * logger.warn()
 * logger.error()
 * 
 * 
 * Eventi Firestore: onDocumentCreated, onDocumentUpdated, onDocumentDeleted, e onDocumentWritten sono trigger di Firestore che si attivano rispettivamente alla creazione, modifica, cancellazione, o quando viene scritto un documento in Firestore.
 *
 * Funzioni di Autenticazione: Firebase ti permette di usare trigger per l’autenticazione, come onUserCreated e onUserDeleted, che si attivano alla creazione o cancellazione di un utente.
 *
 * onCall: È un tipo di funzione HTTPS che si può chiamare direttamente dal frontend e che consente una maggiore sicurezza perché richiede autenticazione.
 *
 * onSchedule: Questo trigger attiva le funzioni su un programma temporale, simile a un cron job.
 * 
 */

Sto sviluppando una web app utilizzando Vite e Vue 3 (options), integrando Firebase per il servizio di hosting, storage, autenticazione, database in tempo reale e funzioni serverless. Le funzioni serverless mi permetteranno di inviare notifiche push periodicamente o su comando; alcune di queste funzionalità devono ancora essere implementate, ma sono previste in aggiornamenti successivi. Sto utilizzando anche Bootstrap per il design, Axios per le chiamate API, Vue Router per la gestione delle pagine e Sass per la personalizzazione dello stile.

 /root
  ├── dist/
  ├── functions/
  │     ├── node_modules/
  │     ├── .gitignore
  │     ├── index.js
  │     ├── package.json
  │     ├── package-lock.json
  ├── node_modules/
  ├── public/
  │     ├── fonts/
  │     ├── img/
  │     └── site.webmanifest
  ├── src/
  │     ├── assets/
  │     │     ├── img/
  │     │     └── scss/
  │     ├── views/
  │     │     ├── components/
  │     │     │     └── CmpLoading.vue
  │     │     ├── layout/
  │     │     │     ├── AppFooter.vue
  │     │     │     └── AppHeader.vue
  │     │     └── pages/
  │     │     │     ├── ContactView.vue
  │     │     │     └── HomeView.vue
  │     ├── App.vue
  │     ├── firebase-messaging-sw.js
  │     ├── firebaseConfig.js
  │     ├── loading.js
  │     ├── main.js
  │     ├── notification.js
  │     ├── router.js
  │     ├── store.js
  │     └── utility.js
  ├── .firebaserc
  ├── .gitignore
  ├── database.rules.json
  ├── firebase.json
  ├── index.html
  ├── package-lock.json
  ├── package.json
  ├── README.md
  ├── storage.rules
  └── vite.config.js



Nella funzione onSchedule("every 10 minutes", Firebase supporta varie espressioni di intervallo. Ecco alcune opzioni che puoi utilizzare:

Ogni tot minuti/ore/giorni:

every 5 minutes - ogni 5 minuti.
every 1 hours - ogni ora.
every 12 hours - ogni 12 ore.
every 24 hours - ogni giorno.
A un'ora specifica:

"15 of every hour" - al minuto 15 di ogni ora.
"every day 09:00" - alle 9:00 ogni giorno.
"every monday 08:30" - ogni lunedì alle 8:30.
Orari settimanali/mensili:

"every monday" - ogni lunedì.
"1st day of month 12:00" - primo giorno di ogni mese alle 12:00.
