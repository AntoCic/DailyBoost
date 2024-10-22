import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    routeName: '',
    textHello: 'Ciao Mondo',

    async start() {

        // Ho riatardato la chiamata cosi si può vedere il loader.
        this.loading.on()
        setTimeout(async () => {

            await axios.get('/api')
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    location.reload();
                });

            await axios.post('/api/test', { msg: 'Hello World' })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    location.reload();
                });

            this.loading.off()
        }, 2000);

    },

    loading: {
        state: false,
        msg: "Il sito è timido, sta venendo fuori piano piano.",

        defaultMsg: [
            "Carichiamo i dati… o forse stiamo solo prendendo un caffè!",
            "Metà del tempo di caricamento è stato dedicato a guardare gattini su Internet.",
            "Sei sicuro di volere davvero vedere cosa c'è dopo?",
            "Sintonizzando i bytes… quasi pronti!",
            "Ancora un attimo, i robot stanno finendo il caffè.",
            "I dati si stanno allacciando le scarpe…",
            "Stiamo cercando il bottone 'carica più veloce'!",
            "Nel frattempo, danza della pioggia per far caricare più in fretta!",
            "Tenetevi forte… stiamo caricando meraviglie!",
            "Hai aspettato così tanto che potresti essere un ninja adesso."
        ],

        on(msg = null) {
            this.msg = msg ?? this.defaultMsg[Math.floor(Math.random() * this.defaultMsg.length)];
            this.state = true
        },
        off() { this.state = false },
    },
})