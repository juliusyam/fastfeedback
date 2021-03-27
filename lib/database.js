import firebase from './firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firestore = firebase.firestore();
 
export function createUser(uid, data) {

  return firestore.collection('users').doc(uid).set({uid, ...data}, {merge: true})
    .then(() => {
        console.log(`user ${uid} successfully created`);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
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

export function createFeedback(data) {

  return firestore.collection('feedback').add(data)
    .then(() => {
      console.log(data);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

export function deleteFeedback(id) {

  return firestore.collection('feedback').doc(id).delete()
    .then(() => {
      console.log('deleted data with ' + id);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}