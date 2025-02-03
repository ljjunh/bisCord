importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBwv6E2wBvjTOuwt1d3VZHo_4XFpOvaXpA",
    authDomain: "biscord-447502.firebaseapp.com",
    projectId: "biscord-447502",
    storageBucket: "biscord-447502.firebasestorage.app",
    messagingSenderId: "872747242473",
    appId: "1:872747242473:web:bdfbef133ad60ae22c7178",
    measurementId: "G-V7RYD0WW8J"
});

// Firebase Messaging 인스턴스 생성
const messaging = firebase.messaging()