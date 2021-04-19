import firebase from './firebase'
import 'firebase/auth';
import 'firebase/firestore';
import getStripe from '../lib/stripe';

const firestore = firebase.firestore();
const app = firebase.app();
 
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
  const site = firestore.collection('sites').doc();
  site.set(data);

  return site
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

export async function createCheckoutSession(uid) {

  const checkoutSessionRef = await firestore
                                    .collection('users')
                                    .doc(uid)
                                    .collection('checkout_sessions')
                                    .add({
                                      price: 'price_1Igui2JKfrP8m5DGNmtHovdC',
                                      success_url: window.location.origin,
                                      cancel_url: window.location.origin,
                                    });
  
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  })
}

export async function goToBillingPortal() {
  const functionRef = app
                        .functions('us-central1')
                        .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  
  const { data } = await functionRef({ returnUrl: `${window.location.origin}/account` });
  window.location.assign(data.url);
}

export function getSiteInfo(siteId) {
  
  const siteInfoRef = firestore.collection('sites').doc(siteId);

  const siteInfo = siteInfoRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      return doc.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }) 
  .catch((error) => {
    console.log("Error getting document:", error);
  });

  return siteInfo;
}

export function getAuthorInfo(authorId) {

  const authorInfoRef = firestore.collection('users').doc(authorId);

  const authorInfo = authorInfoRef.get().then((user) => {
    if (user.exists) {
      // console.log("user data:", user.data());
      return user.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such user!");
    }
  })
  .catch((error) => {
    console.log("Error getting user:", error);
  });

  return authorInfo;
}

// https://github.com/jaredpalmer/minimum-viable-saas