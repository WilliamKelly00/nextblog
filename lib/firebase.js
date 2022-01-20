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


//  Helper functions

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export async function getUserWithUsername(username){
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];

    return userDoc;
}

export function postToJSON(doc){
    const data = doc.data();
    return{
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}