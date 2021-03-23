import { adminDatabase } from '@/lib/firebase-admin';
import { getAllFeedback } from '@/lib/database-admin';

export default async function (req, res) {
  const siteId = req.query.siteId;
  const { feedback, error } = await getAllFeedback(siteId);

  if (error) {
    res.status(500).json({ error });
  }
  
  res.status(200).json({ feedback });
}