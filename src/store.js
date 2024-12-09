// store.js
import { reactive } from 'vue'
import { loading } from './loading';
// import axios from 'axios'

export const store = reactive({
    appVersion: __APP_VERSION__,
    appName: __APP_NAME__,
    appShortName: __APP_SHORT_NAME__,
    appDescription: __APP_DESCRIPTION__,
    bkColor: __APP_BACKGROUND_COLOR__,
    logoPath: __APP_LOGO__,
    
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
        }, 500);

    },
})