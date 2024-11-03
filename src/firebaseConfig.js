// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFunctions, httpsCallable } from "firebase/functions";

// La tua configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-_R9SfbAsbz9HC7yRsa8SEizR6motYrg",
  authDomain: "dailyboostantocic.firebaseapp.com",
  databaseURL:
    "https://dailyboostantocic-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dailyboostantocic",
  storageBucket: "dailyboostantocic.appspot.com",
  messagingSenderId: "190314985388",
  appId: "1:190314985388:web:56086d26d22f3f27026c09",
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni l'istanza di Firebase Messaging
const messaging = getMessaging(app);

// Funzione per sottoscrivere un utente al topic
const subscribeToTopic = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BFKyf3KvT8cIxjEQWwZScFF-_urqkg2ia85CsQ7QG7XQBJzSWukyxaiAQWZMFyLsuJhtD64p3NYlydCBWHWlwgQ",
    });

    if (token) {
      const functions = getFunctions();
      const subscribeToTopicFn = httpsCallable(functions, "subscribeToTopic");
      await subscribeToTopicFn({ token });
      console.log("Sottoscritto con successo al topic allUsers");
    } else {
      console.error("Errore nell'ottenere il token per le notifiche");
    }
  } catch (error) {
    console.error("Errore durante la sottoscrizione al topic:", error);
  }
};

const unsubscribeFromTopic = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BFKyf3KvT8cIxjEQWwZScFF-_urqkg2ia85CsQ7QG7XQBJzSWukyxaiAQWZMFyLsuJhtD64p3NYlydCBWHWlwgQ",
    });

    if (token) {
      const functions = getFunctions();
      const unsubscribeFromTopicFn = httpsCallable(
        functions,
        "unsubscribeFromTopic"
      );
      await unsubscribeFromTopicFn({ token });
      console.log("Disiscritto con successo dal topic allUsers");
    } else {
      console.error("Errore nell'ottenere il token per le notifiche");
    }
  } catch (error) {
    console.error("Errore durante la disiscrizione dal topic:", error);
  }
};

// Esporta l'app e l'istanza di messaging
export { app, messaging, subscribeToTopic, unsubscribeFromTopic };
