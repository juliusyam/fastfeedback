import { auth } from '../../lib/firebase-admin';
import { getUserFeedbacks } from '@/lib/database-admin';

export default async function (req, res) {

  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedback } = await getUserFeedbacks(uid);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
}