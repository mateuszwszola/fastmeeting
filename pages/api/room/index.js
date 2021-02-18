import { retrieveInProgressRoom } from '@/lib/twilioAdmin';

export default async function handler(req, res) {
  try {
    const { roomName } = req.query;

    if (!roomName) {
      return res.status(400).json({ message: 'room name is required' });
    }

    const room = await retrieveInProgressRoom(roomName);

    return res.status(200).json({ room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
