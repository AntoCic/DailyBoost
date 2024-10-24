import { store } from "./store";
// Notification.permission puo essere
// 'granted': permesso già concesso.
// 'denied': permesso negato.
// 'default': non è ancora stato chiesto o l'utente ha ignorato la richiesta.

// notification
export default {
    // method per inviare una notifica
    push(body) {
        if (Notification.permission === 'granted') {
            if (body) {
                new Notification(store.appName, {
                    body,
                    icon: '/img/logo.png',
                });
            } else {
                console.error('Errore notification.push(body).  body assente');
            }
        } else {
            console.error('Errore notification.push(body). permessi notifiche assenti o negati');
        }

    },

    async checkPermission() {
        if (Notification.permission === 'default') {
            return await this.askPermission();
        }

        return Notification.permission === 'granted'
    },

    async askPermission() {
        await Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                this.push('Notifiche attive')
            } else {
                alert(`Le notifiche sono state disabilitate. Se cambi idea e vuoi dare l'accesso, segui questi passaggi:

Google Chrome:
1. Clicca sui tre puntini in alto a destra e seleziona Impostazioni.
2. Scorri fino a trovare la sezione "Privacy e sicurezza", quindi clicca su "Impostazioni sito".
3. Vai alla sezione "Notifiche" e cerca il tuo sito web nell'elenco.
4. Rimuovi il permesso per il sito web o cambia il suo stato in "Consenti".

Mozilla Firefox:
1. Clicca sulle tre linee in alto a destra e seleziona Impostazioni.
2. Vai alla sezione "Privacy e Sicurezza" e scorri fino a "Autorizzazioni", quindi clicca su "Impostazioni..." accanto a "Notifiche".
3. Trova il tuo sito web e clicca su "Rimuovi sito web".
4. Aggiorna il sito.

Microsoft Edge:
1. Clicca sui tre puntini in alto a destra e seleziona Impostazioni.
2. Vai su "Cookie e permessi dei siti", quindi su "Notifiche".
3. Cerca il tuo sito nell'elenco e rimuovi il permesso.
4. Aggiorna il sito.`);
            }
        });

        return Notification.permission === 'granted'
    },

}
