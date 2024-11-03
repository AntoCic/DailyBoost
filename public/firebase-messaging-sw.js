// Importa Firebase
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-_R9SfbAsbz9HC7yRsa8SEizR6motYrg",
  authDomain: "dailyboostantocic.firebaseapp.com",
  projectId: "dailyboostantocic",
  storageBucket: "dailyboostantocic.appspot.com",
  messagingSenderId: "190314985388",
  appId: "1:190314985388:web:56086d26d22f3f27026c09",
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Ottieni l'istanza di Firebase Messaging
const messaging = firebase.messaging();

// Gestisci i messaggi in background
messaging.onBackgroundMessage((payload) => {
  console.log('Messaggio ricevuto in background:', payload);

  // Dati della notifica
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/img/logo.png', // Imposta qui l'icona che preferisci
  };

  // Mostra la notifica
  self.registration.showNotification(notificationTitle, notificationOptions);
});
