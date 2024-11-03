const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onCall } = require('firebase-functions/v2/https');
const { getMessaging } = require('firebase-admin/messaging');
const admin = require('firebase-admin');

admin.initializeApp();

const phrases = [
    "Frase 1", "Frase 2", "Frase 3", "Frase 4", "Frase 5",
    "Frase 6", "Frase 7", "Frase 8", "Frase 9", "Frase 10"
];

// Funzione pianificata per inviare una notifica ogni 10 minuti
exports.scheduledNotification = onSchedule("every 10 minutes", async (event) => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    const message = {
        data: {
            title: "Newsletter di DailyBoost",
            body: randomPhrase,
        },
        topic: "allUsers"
    };

    try {
        const response = await getMessaging().send(message);
        console.log("Notifica inviata con successo:", response);
    } catch (error) {
        console.error("Errore nell'invio della notifica:", error);
    }
});

// Funzione callable per sottoscrivere un token al topic "allUsers"
exports.subscribeToTopic = onCall(async (request) => {
    const { token } = request.data;
    const topic = "allUsers";

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

    try {
        const response = await getMessaging().unsubscribeFromTopic(token, topic);
        console.log("Disiscrizione avvenuta con successo:", response);
        return { message: "Disiscrizione avvenuta con successo dal topic allUsers" };
    } catch (error) {
        console.error("Errore durante la disiscrizione dal topic:", error);
        throw new functions.https.HttpsError('unknown', 'Errore durante la disiscrizione dal topic');
    }
});
