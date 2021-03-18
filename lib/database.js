import firebase from './firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firestore = firebase.firestore();

const currentTime = Date.now();
 
export function createUser(uid, data) {

  return firestore.collection('users').doc(uid).set({uid, ...data}, {merge: true})
    .then(() => {
        console.log(`user ${uid} successfully created`);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

  // return firestore
  //   .collection('users')
  //   .doc(uid)
  //   .set({uid, ...data}, {merge: true});
}

export function createSite(data) {

  return firestore.collection('sites').add(data)
    .then(() => {
      console.log(data);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}