import { twilioAdminClient } from '@/lib/twilioAdmin';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Create a room
      const { name } = req.body;

      const room = await twilioAdminClient.video.rooms.create({
        uniqueName: name,
      });

      res.status(200).json({ room });
    } else if (req.method === 'GET') {
      // Get a room by unique name
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
