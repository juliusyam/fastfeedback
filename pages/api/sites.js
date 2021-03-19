import adminDatabase from '../../lib/firebase-admin';

export default async function (req, res) {

  const snapshot = await adminDatabase.collection('sites').get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({
      id: doc.id,
      ...doc.data()
    })
  })

  res.status(200).json({ sites });
}

