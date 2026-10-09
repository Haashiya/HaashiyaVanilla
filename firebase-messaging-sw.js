importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBJWMb7l6DT1PFRUoDbi59FSs1iOZPntWI",
  authDomain: "haashiya-web.firebaseapp.com",
  projectId: "haashiya-web",
  storageBucket: "haashiya-web.firebasestorage.app",
  messagingSenderId: "340726241497",
  appId: "1:340726241497:web:b5f62320301fc724fac6c8"
});

const messaging = firebase.messaging();

// Handles background push events when screen is locked or app is closed
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "حاشية";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/assets/images/web/haashiya_logo.png",
    badge: "/assets/images/web/haashiya_logo.png",
    sound: "default", // Plays native device notification sound
    vibrate: [200, 100, 200],
    data: {
      url: payload.data?.url || "/main.html"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opens the app when user taps the notification on lock screen
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});