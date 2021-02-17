import { twilioAdminClient } from '@/lib/initTwilioAdmin';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { name } = req.query;

      const room = await twilioAdminClient.video.rooms(name).fetch();

      res.status(200).json({ room });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const message =
      error.status === 404 ? 'Room not found' : 'Something went wrong';
    res.status(error.status).json({ message });
  }
}
