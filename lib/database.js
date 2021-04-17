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
  
  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
}

// https://github.com/jaredpalmer/minimum-viable-saas