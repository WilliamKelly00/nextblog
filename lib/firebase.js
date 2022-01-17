import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCmuUOCwyUrsyXnJtIxPTvCmKrMvWZcBbg",
    authDomain: "nextblog-799f3.firebaseapp.com",
    projectId: "nextblog-799f3",
    storageBucket: "nextblog-799f3.appspot.com",
    messagingSenderId: "699202669973",
    appId: "1:699202669973:web:281e59e4bc3f7d202afa9c"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();