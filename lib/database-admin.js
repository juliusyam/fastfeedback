import { adminDatabase } from './firebase-admin';
import dayjs from 'dayjs';

//use where to limit which object in an array to get
export async function getAllFeedback(siteId) {

  try {
    const snapshot = await adminDatabase.collection('feedback')
      .where("siteId", "==", siteId).get();
    const feedback = [];
    
    snapshot.forEach((doc) => {
      feedback.push({
        id: doc.id,
        ...doc.data()
      })
    })

    feedback.sort((a, b) => dayjs(a.createdAt).isBefore(b.createdAt));

    return { feedback };

  } catch (error) {
    return { error };
  }
}

export async function getUserFeedbacks(userId) {

  const snapshot = await adminDatabase
    .collection('feedback')
    .where('authorId', '==', userId)
    .where('status', 'in', ['pending', 'active'])
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return { feedback };
}

export async function getSite(siteId) {

  try {
    const doc = await adminDatabase.collection('sites').doc(siteId).get();
    const site = { id: doc.id, ...doc.data() };

    return { site };

  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {

  try {
    const snapshot = await adminDatabase.collection('sites').get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return { sites };

  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {

  const snapshot = await adminDatabase.collection('sites').where('authorId', '==', userId).get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return { sites };
}