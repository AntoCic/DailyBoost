// index.js
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const admin = require("firebase-admin");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const phrases = [
  'Frase 1', 'Frase 2', 'Frase 3', 'Frase 4', 'Frase 5',
  'Frase 6', 'Frase 7', 'Frase 8', 'Frase 9', 'Frase 10'
];

exports.sendScheduledNotification = functions.pubsub.schedule('every 10 minutes').onRun(async (context) => {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  const message = {
    notification: {
      title: 'Ecco la tua frase!',
      body: randomPhrase
    },
    topic: 'all-users' // Assicurati che tutti gli utenti siano iscritti a questo topic
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notifica inviata con successo:', response);
  } catch (error) {
    console.error('Errore nell\'invio della notifica:', error);
  }
});