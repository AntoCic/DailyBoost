import { reactive } from 'vue'
import { loading } from './loading';
import axios from 'axios'

export const store = reactive({
    appName: 'Vue-Bootstrap-Netlify', // Cambiare anche in index.html e site.webmanifest
    routeName: '',

    async start() {
        // Ho riatardato la chiamata cosi si può vedere il loader.
        loading.on('Il sito è timido, sta venendo fuori piano piano.')
        setTimeout(async () => {

            // await axios.get('/api')
            //     .then((res) => {
            //         console.log(res.data);
            //     })
            //     .catch((err) => {
            //         location.reload();
            //     });

            // await axios.post('/api/test', { msg: 'Hello World' })
            //     .then((res) => {
            //         console.log(res.data);
            //     })
            //     .catch((err) => {
            //         location.reload();
            //     });

            loading.off()
        }, 2000);

    },
})