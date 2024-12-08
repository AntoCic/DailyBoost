const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onCall } = require('firebase-functions/v2/https');
const { getMessaging } = require('firebase-admin/messaging');
const admin = require('firebase-admin');

admin.initializeApp();

const phrases = [
    "Non puoi cambiare il vento, ma puoi regolare le vele... o comprare un ventilatore più potente!",
    "Il successo è come il Wi-Fi: tutti ci credono, ma pochi capiscono davvero come funziona!",
    "L'unica cosa che separa il lavoro dai sogni è il 'caffè'.",
    "Se ti senti giù, pensa che anche una batteria scarica può essere ricaricata. Tu sei sicuramente più potente!",
    "Ogni giorno è una nuova opportunità… di evitare le cose che ci spaventano di più.",
    "Non fare oggi quello che puoi delegare a qualcun altro domani.",
    "Il coraggio non è l'assenza di paura. È la capacità di fingere benissimo di non averne.",
    "L'unica gara che dovresti cercare di vincere è quella contro la versione di te stesso che non fa colazione.",
    "Le idee sono come i gatti: quando ti serve una, di solito è nascosta sotto il divano.",
    "Non lasciare che i tuoi sogni rimangano solo sogni. E nemmeno che diventino incubi!",
    "La vita è come un puzzle… tranne quando manca sempre un pezzo e non sai dove sia finito!",
    "Ogni problema ha almeno una soluzione... di solito, però, richiede una buona dose di caffè!",
    "Cerca di diventare una versione migliore di te stesso… ma non esagerare: il mondo non è ancora pronto!",
    "Pensa fuori dagli schemi, a meno che tu non sia un gatto: in quel caso, sdraiati sulla scatola.",
    "La pazienza è la chiave del successo... e anche della sopravvivenza in fila al supermercato.",
    "Il segreto per fare tutto bene? Semplice: non farlo tutto in una volta!",
    "Ridi e il mondo riderà con te… o almeno penserà che tu stia guardando qualche meme divertente.",
    "La vita è troppo breve per lamentarsi. Tranne che del traffico, quello è lecito.",
    "Non è mai troppo tardi per fare grandi cose… tranne imparare il tedesco in una notte.",
    "Abbi sempre fiducia in te stesso… e nel GPS, perché le strade della vita sono complicate!"
];

// Funzione helper per inviare notifiche
async function sendNotification(topic, title, body) {
    const message = {
        data: {
            title: title,
            body: body,
        },
        topic: topic
    };

    try {
        const response = await getMessaging().send(message);
        console.log(`Notifica inviata con successo al topic "${topic}":`, response);
        return response;
    } catch (error) {
        console.error(`Errore nell'invio della notifica al topic "${topic}":`, error);
        throw new Error('Errore durante l\'invio della notifica');
    }
}


// Funzione pianificata per inviare una notifica ogni 10 minuti
exports.scheduledNotification = onSchedule({
    schedule: "30 7 * * *",  // 7:30 ogni giorno
    timeZone: "Europe/Rome"   // Imposta l’orario italiano
}, async (event) => {
    const body = phrases[Math.floor(Math.random() * phrases.length)];

    sendNotification("allUsers", "DailyBoost", body);
});

// Funzione callable per sottoscrivere un token al topic "allUsers"
exports.subscribeToTopic = onCall(async (request) => {
    const { token } = request.data;
    const topic = "allUsers";
    console.log("Token ricevuto per la sottoscrizione:", token); // Aggiungi questo log

    try {
        const response = await getMessaging().subscribeToTopic(token, topic);
        console.log("Sottoscrizione avvenuta con successo:", response);
        return { message: "Sottoscrizione avvenuta con successo al topic allUsers" };
    } catch (error) {
        console.error("Errore durante la sottoscrizione al topic:", error);
        throw new functions.https.HttpsError('unknown', 'Errore durante la sottoscrizione al topic');
    }
});

exports.unsubscribeFromTopic = onCall(async (request) => {
    const { token } = request.data;
    const topic = "allUsers";
    console.log("Token ricevuto per la sottoscrizione:", token); // Aggiungi questo log

    try {
        const response = await getMessaging().unsubscribeFromTopic(token, topic);
        console.log("Disiscrizione avvenuta con successo:", response);
        return { message: "Disiscrizione avvenuta con successo dal topic allUsers" };
    } catch (error) {
        console.error("Errore durante la disiscrizione dal topic:", error);
        throw new functions.https.HttpsError('unknown', 'Errore durante la disiscrizione dal topic');
    }
});

// Aggiungi questa funzione nel tuo file delle funzioni Firebase
exports.testNotification = onCall(async (request) => {

    const body = phrases[Math.floor(Math.random() * phrases.length)];

    sendNotification("allUsers", "DailyBoost", body);

});
