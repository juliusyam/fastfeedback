import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAeNtJroPnpTbXVut2yTFtGvS2A3Yscd7w",
    authDomain: "fast-feedback-demo-f267b.firebaseapp.com",
    databaseURL: "https://fast-feedback-demo-f267b-default-rtdb.firebaseio.com",
    projectId: "fast-feedback-demo-f267b",
    storageBucket: "fast-feedback-demo-f267b.appspot.com",
    messagingSenderId: "969520046127",
    appId: "1:969520046127:web:ab988a673f81b35784a6da"
  });
}

export default firebase;